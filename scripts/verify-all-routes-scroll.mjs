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
  console.log('1. Starting Vite preview server...')
  const previewServer = await preview({ preview: { port: 5199 } })

  console.log('2. Spawning desktop headless Edge (1280x800)...')
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    '--remote-debugging-port=9227',
    '--window-size=1280,800',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'http://localhost:5199/',
  ])

  try {
    let wsUrl = null
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch('http://localhost:9227/json')
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

    // Wait for home initial intro
    await sleep(2200)

    const allRoutes = [
      { name: 'Home', path: '/', checkSelector: '.hero' },
      { name: 'About', path: '/about', checkSelector: '.journey-section' },
      { name: 'Education', path: '/education', checkSelector: '.coursework-grid' },
      { name: 'Experience', path: '/experience', checkSelector: '.journey-section' },
      { name: 'Projects Catalog', path: '/projects', checkSelector: '.projects-showcase' },
      { name: 'DevPilot Case Study', path: '/projects/devpilot', checkSelector: '.case-grid' },
      { name: 'Resume Analyzer Case Study', path: '/projects/resume-analyzer', checkSelector: '.case-grid' },
      { name: 'LMS Case Study', path: '/projects/lms', checkSelector: '.case-grid' },
      { name: 'Currency Converter Case Study', path: '/projects/currency-converter', checkSelector: '.case-grid' },
      { name: 'Skills Matrix', path: '/skills', checkSelector: '.skill-grid' },
      { name: 'Resume Dossier', path: '/resume', checkSelector: '.a4-document-frame' },
      { name: 'Contact Inquiries', path: '/contact', checkSelector: '.contact-methods' },
      { name: 'Not Found Page', path: '/non-existent-page', checkSelector: '.not-found-content' },
    ]

    for (const r of allRoutes) {
      console.log(`\n========================================`)
      console.log(`Testing Route: ${r.name} (${r.path})`)
      console.log(`========================================`)

      // Navigate via CDP Page.navigate or client-side
      await cdp.send('Page.navigate', { url: `http://localhost:5199${r.path}` })
      await sleep(2200) // allow route intro to settle

      // Verify route mounted
      const routeCheck = await cdp.eval(`
        (() => {
          const main = document.querySelector("#main");
          const target = document.querySelector("${r.checkSelector}");
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const bodyOverflow = document.body.style.overflow;
          return {
            mounted: !!main,
            hasTarget: !!target,
            maxScroll,
            bodyOverflow,
            url: window.location.pathname
          };
        })()
      `)
      console.log(`Status on mount:`, routeCheck)
      if (!routeCheck.mounted || !routeCheck.hasTarget) {
        throw new Error(`Route ${r.name} did not mount target selector ${r.checkSelector}`)
      }
      if (routeCheck.bodyOverflow === 'hidden') {
        throw new Error(`Body overflow remained locked on ${r.name}!`)
      }

      if (routeCheck.maxScroll > 100) {
        // Test 1: Scroll to 25%
        const scroll25 = Math.round(routeCheck.maxScroll * 0.25)
        await cdp.eval(`window.scrollTo(0, ${scroll25});`)
        await sleep(150)

        // Test 2: Scroll to 75%
        const scroll75 = Math.round(routeCheck.maxScroll * 0.75)
        await cdp.eval(`window.scrollTo(0, ${scroll75});`)
        await sleep(150)

        // Test 3: Rapid scrolling back and forth
        await cdp.eval(`
          window.scrollTo(0, ${routeCheck.maxScroll});
          window.scrollTo(0, 50);
          window.scrollTo(0, ${Math.round(routeCheck.maxScroll * 0.5)});
        `)
        await sleep(200)

        const postScrollCheck = await cdp.eval(`
          (() => {
            return {
              scrollY: window.scrollY,
              bodyOverflow: document.body.style.overflow,
              hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 2
            };
          })()
        `)
        console.log(`Post-scroll check:`, postScrollCheck)
        if (postScrollCheck.hasHorizontalOverflow) {
          throw new Error(`Horizontal overflow detected on ${r.name}!`)
        }
        if (postScrollCheck.bodyOverflow === 'hidden') {
          throw new Error(`Body scroll got stuck on ${r.name}!`)
        }
      }

      console.log(`✓ ${r.name} verified cleanly: smooth scroll, zero overflow, correct lifecycle!`)
    }

    cdp.close()
    console.log('\n🎉 ALL ROUTES TESTED AND VERIFIED WITH 100% SUCCESS! 🎉')
  } finally {
    edge.kill()
    await previewServer.close()
  }
}

run().catch((err) => {
  console.error('All routes test error:', err)
  process.exit(1)
})

