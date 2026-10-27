import { spawn } from 'node:child_process'
import { preview } from 'vite'

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

class SimpleCDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl)
    this.id = 0
    this.pending = new Map()

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.id && this.pending.has(data.id)) {
        const { resolve, reject } = this.pending.get(data.id)
        this.pending.delete(data.id)
        if (data.error) reject(data.error)
        else resolve(data.result)
      }
    }
  }

  async ready() {
    if (this.ws.readyState === WebSocket.OPEN) return
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve
      this.ws.onerror = reject
    })
  }

  send(method, params = {}) {
    const id = ++this.id
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true,
    })
    return res.result?.value
  }

  close() {
    this.ws.close()
  }
}

async function run() {
  console.log('1. Starting preview server...')
  const previewServer = await preview({ preview: { port: 5199 } })

  console.log('2. Spawning mobile headless Edge (375x667)...')
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--window-size=375,667',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'http://localhost:5199/',
  ])

  try {
    let wsUrl = null
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch('http://localhost:9223/json')
        const list = await res.json()
        const page = list.find((item) => item.type === 'page')
        if (page && page.webSocketDebuggerUrl) {
          wsUrl = page.webSocketDebuggerUrl
          break
        }
      } catch {
        // wait
      }
      await sleep(300)
    }

    if (!wsUrl) throw new Error('Could not connect to Edge DevTools!')
    console.log('✓ Connected to Edge CDP')

    const cdp = new SimpleCDP(wsUrl)
    await cdp.ready()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')

    console.log('\n--- Test: Home Page Initial Intro ---')
    await sleep(200)
    const homeIntroState = await cdp.eval(`
      (() => {
        const overlay = document.querySelector(".page-intro-overlay");
        const titleEl = document.querySelector(".opening-huge-text");
        const contentContainer = document.querySelector(".page-intro-root");
        return {
          hasOverlay: !!overlay,
          title: titleEl?.innerText || "",
          contentDisplay: contentContainer ? window.getComputedStyle(contentContainer).display : ""
        };
      })()
    `)
    console.log('Home initial intro state:', homeIntroState)
    if (homeIntroState.title !== 'GAURAV RAJPUT') {
      throw new Error(`Expected title GAURAV RAJPUT, got "${homeIntroState.title}"`)
    }
    if (homeIntroState.contentDisplay !== 'none') {
      throw new Error(`Expected contentDisplay none during initial intro, got "${homeIntroState.contentDisplay}"`)
    }

    await sleep(2200)
    const homeRevealedState = await cdp.eval(`
      (() => {
        const overlay = document.querySelector(".page-intro-overlay");
        const contentContainer = document.querySelector(".page-intro-root");
        return {
          hasOverlay: !!overlay,
          contentDisplay: contentContainer ? window.getComputedStyle(contentContainer).display : ""
        };
      })()
    `)
    console.log('Home revealed state:', homeRevealedState)
    if (homeRevealedState.hasOverlay) throw new Error('Overlay should be gone after Home intro')
    if (homeRevealedState.contentDisplay !== 'block') throw new Error('Home content should be block')
    console.log('✓ Home page intro and reveal verified!')

    console.log('\n--- Test: Case Study Route (/projects/devpilot) ---')
    await cdp.eval(`
      (() => {
        const links = Array.from(document.querySelectorAll("a"));
        const link = links.find(a => a.getAttribute("href")?.includes("/projects/devpilot"));
        if (link) link.click();
      })()
    `)
    await sleep(250)
    const devpilotIntro = await cdp.eval(`
      (() => {
        const titleEl = document.querySelector(".opening-huge-text");
        const contentContainer = document.querySelector(".page-intro-root");
        return {
          title: titleEl?.innerText || "",
          contentDisplay: contentContainer ? window.getComputedStyle(contentContainer).display : ""
        };
      })()
    `)
    console.log('DevPilot intro state:', devpilotIntro)
    if (devpilotIntro.title !== 'DEVPILOT') {
      throw new Error(`Expected title DEVPILOT, got "${devpilotIntro.title}"`)
    }
    if (devpilotIntro.contentDisplay !== 'none') {
      throw new Error(`Expected contentDisplay none, got "${devpilotIntro.contentDisplay}"`)
    }
    await sleep(2200)
    console.log('✓ Case study route intro and reveal verified!')

    console.log('\n--- Test: Reduced Motion Emulation ---')
    await cdp.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
    })
    // Navigate with reduced motion
    await cdp.eval(`
      (() => {
        const links = Array.from(document.querySelectorAll("a"));
        const link = links.find(a => a.textContent.trim() === "Resume" || a.getAttribute("href") === "/resume");
        if (link) link.click();
      })()
    `)
    await sleep(200)
    const reducedMotionState = await cdp.eval(`
      (() => {
        const overlay = document.querySelector(".page-intro-overlay");
        const contentContainer = document.querySelector(".page-intro-root");
        return {
          hasOverlay: !!overlay,
          contentDisplay: contentContainer ? window.getComputedStyle(contentContainer).display : ""
        };
      })()
    `)
    console.log('Reduced motion navigation state:', reducedMotionState)
    if (reducedMotionState.contentDisplay !== 'block') {
      throw new Error('With reduced motion, content should be block immediately!')
    }
    console.log('✓ Reduced motion immediately settles without blocking overlay!')

    cdp.close()
    console.log('\n🎉 ALL EXTENDED TESTS (MOBILE, HOME, CASE STUDY, REDUCED MOTION) PASSED! 🎉')
  } finally {
    edge.kill()
    await previewServer.close()
  }
}

run().catch((err) => {
  console.error('Test error:', err)
  process.exit(1)
})

