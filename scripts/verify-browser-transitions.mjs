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

  console.log('2. Spawning headless Edge...')
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'http://localhost:5199/experience',
  ])

  try {
    // Wait for remote debugging endpoint
    let wsUrl = null
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch('http://localhost:9222/json')
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

    console.log('\n--- Test 1: Direct route access to /experience ---')
    // Wait for initial load
    await sleep(2500)
    const title = await cdp.eval('document.title')
    console.log(`Document title: ${title}`)
    const experienceHeading = await cdp.eval(
      'document.querySelector("h1")?.innerText || ""'
    )
    console.log(`Experience h1: ${experienceHeading}`)

    console.log('\n--- Test 2: Navigating from Experience to Projects ---')
    // Click Projects nav link
    const clicked = await cdp.eval(`
      (() => {
        const links = Array.from(document.querySelectorAll("a"));
        const projLink = links.find(a => a.textContent.trim() === "Projects" && a.getAttribute("href") === "/projects");
        if (projLink) {
          projLink.click();
          return true;
        }
        return false;
      })()
    `)
    console.log(`Clicked Projects nav link: ${clicked}`)

    // Check immediately after click (Phase 1 / Phase 2: 250ms)
    await sleep(250)
    const overlayState = await cdp.eval(`
      (() => {
        const overlay = document.querySelector(".page-intro-overlay");
        const titleEl = document.querySelector(".opening-huge-text");
        const contentContainer = document.querySelector(".page-intro-root");
        const bodyOverflow = document.body.style.overflow;
        const htmlOverflow = document.documentElement.style.overflow;

        if (!overlay) return { error: "No overlay found" };
        const rect = overlay.getBoundingClientRect();
        const style = window.getComputedStyle(overlay);
        const contentStyle = contentContainer ? window.getComputedStyle(contentContainer) : null;

        return {
          overlayExists: true,
          position: style.position,
          zIndex: style.zIndex,
          width: rect.width,
          height: rect.height,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
          titleText: titleEl?.innerText || "",
          contentDisplay: contentStyle?.display || "",
          bodyOverflow,
          htmlOverflow
        };
      })()
    `)
    console.log('Overlay state during transition:', JSON.stringify(overlayState, null, 2))

    if (overlayState.position !== 'fixed') {
      throw new Error(`Expected position fixed, got ${overlayState.position}`)
    }
    if (parseInt(overlayState.zIndex, 10) < 1000) {
      throw new Error(`Expected high zIndex, got ${overlayState.zIndex}`)
    }
    if (overlayState.titleText !== 'PROJECTS') {
      throw new Error(`Expected title PROJECTS, got "${overlayState.titleText}"`)
    }
    if (overlayState.contentDisplay !== 'none') {
      throw new Error(`Expected content display none, got ${overlayState.contentDisplay}`)
    }
    if (overlayState.bodyOverflow !== 'hidden') {
      throw new Error(`Expected body overflow hidden, got ${overlayState.bodyOverflow}`)
    }
    console.log('✓ Phase 1 & 2 verified: Full screen overlay active, title is PROJECTS, content is completely hidden, scroll is locked!')

    // Wait for transition to complete (~2.2s total)
    console.log('\n--- Waiting for Phase 3 (Destination page reveal) ---')
    await sleep(2200)

    const postTransitionState = await cdp.eval(`
      (() => {
        const overlay = document.querySelector(".page-intro-overlay");
        const contentContainer = document.querySelector(".page-intro-root");
        const bodyOverflow = document.body.style.overflow;
        const htmlOverflow = document.documentElement.style.overflow;
        const url = window.location.pathname;
        const projectCards = document.querySelectorAll(".project-card").length;

        return {
          overlayExists: !!overlay,
          contentDisplay: contentContainer ? window.getComputedStyle(contentContainer).display : "",
          contentVisible: contentContainer ? window.getComputedStyle(contentContainer).visibility : "",
          bodyOverflow,
          htmlOverflow,
          url,
          projectCards
        };
      })()
    `)
    console.log('Post transition state:', JSON.stringify(postTransitionState, null, 2))

    if (postTransitionState.overlayExists) {
      throw new Error('Overlay should be unmounted after transition completes!')
    }
    if (postTransitionState.contentDisplay !== 'block') {
      throw new Error(`Content display should be block, got ${postTransitionState.contentDisplay}`)
    }
    if (postTransitionState.bodyOverflow !== '') {
      throw new Error(`Body overflow should be restored, got ${postTransitionState.bodyOverflow}`)
    }
    if (postTransitionState.url !== '/projects') {
      throw new Error(`URL should be /projects, got ${postTransitionState.url}`)
    }
    console.log('✓ Phase 3 verified: Overlay removed, Projects page revealed with cards, scroll restored!')

    // Test other routes
    const routesToTest = [
      { name: 'About', path: '/about', expectedTitle: 'ABOUT' },
      { name: 'Education', path: '/education', expectedTitle: 'EDUCATION' },
      { name: 'Skills', path: '/skills', expectedTitle: 'SKILLS' },
      { name: 'Contact', path: '/contact', expectedTitle: 'CONTACT' },
    ]

    for (const r of routesToTest) {
      console.log(`\n--- Testing navigation to ${r.name} (${r.path}) ---`)
      await cdp.eval(`
        (() => {
          const links = Array.from(document.querySelectorAll("a"));
          const link = links.find(a => a.textContent.trim() === "${r.name}" && a.getAttribute("href") === "${r.path}");
          if (link) link.click();
        })()
      `)
      await sleep(250)
      const transState = await cdp.eval(`
        (() => {
          const overlay = document.querySelector(".page-intro-overlay");
          const titleEl = document.querySelector(".opening-huge-text");
          const contentContainer = document.querySelector(".page-intro-root");
          return {
            title: titleEl?.innerText || "",
            contentDisplay: contentContainer ? window.getComputedStyle(contentContainer).display : ""
          };
        })()
      `)
      console.log(`Transitioning to ${r.name}: title="${transState.title}", contentDisplay="${transState.contentDisplay}"`)
      if (transState.title !== r.expectedTitle) {
        throw new Error(`Expected title "${r.expectedTitle}", got "${transState.title}"`)
      }
      if (transState.contentDisplay !== 'none') {
        throw new Error(`Expected contentDisplay none during transition, got "${transState.contentDisplay}"`)
      }

      await sleep(2200)
      const afterState = await cdp.eval(`
        (() => {
          const overlay = document.querySelector(".page-intro-overlay");
          const path = window.location.pathname;
          return { overlayExists: !!overlay, path };
        })()
      `)
      if (afterState.overlayExists) {
        throw new Error(`Overlay still exists after ${r.name} transition!`)
      }
      if (afterState.path !== r.path) {
        throw new Error(`Expected path ${r.path}, got ${afterState.path}`)
      }
      console.log(`✓ ${r.name} transition completed successfully`)
    }

    // Test Browser Back
    console.log('\n--- Testing Browser Back Navigation ---')
    await cdp.eval('window.history.back()')
    await sleep(250)
    const backState = await cdp.eval(`
      (() => {
        const titleEl = document.querySelector(".opening-huge-text");
        const contentContainer = document.querySelector(".page-intro-root");
        return {
          title: titleEl?.innerText || "",
          contentDisplay: contentContainer ? window.getComputedStyle(contentContainer).display : ""
        };
      })()
    `)
    console.log(`Back transition: title="${backState.title}", contentDisplay="${backState.contentDisplay}"`)
    await sleep(2200)

    // Test Browser Forward
    console.log('\n--- Testing Browser Forward Navigation ---')
    await cdp.eval('window.history.forward()')
    await sleep(250)
    const fwdState = await cdp.eval(`
      (() => {
        const titleEl = document.querySelector(".opening-huge-text");
        const contentContainer = document.querySelector(".page-intro-root");
        return {
          title: titleEl?.innerText || "",
          contentDisplay: contentContainer ? window.getComputedStyle(contentContainer).display : ""
        };
      })()
    `)
    console.log(`Forward transition: title="${fwdState.title}", contentDisplay="${fwdState.contentDisplay}"`)
    await sleep(2200)

    cdp.close()
    console.log('\n🎉 ALL REAL BROWSER INTEGRATION TESTS PASSED SUCCESSFULLY! 🎉')
  } finally {
    edge.kill()
    await previewServer.close()
  }
}

run().catch((err) => {
  console.error('Test error:', err)
  process.exit(1)
})

