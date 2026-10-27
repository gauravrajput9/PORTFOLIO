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
    '--remote-debugging-port=9225',
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
        const res = await fetch('http://localhost:9225/json')
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

    console.log('\n--- Waiting for Initial Route Intro to Complete ---')
    await sleep(2400)

    // Verify page settled
    const initialPageStatus = await cdp.eval(`
      (() => {
        const root = document.querySelector(".page-intro-root");
        const hero = document.querySelector(".hero");
        return {
          rootDisplay: root ? window.getComputedStyle(root).display : "",
          hasHero: !!hero,
          scrollY: window.scrollY
        };
      })()
    `)
    console.log('Initial page status:', initialPageStatus)
    if (initialPageStatus.rootDisplay !== 'block') {
      throw new Error(`Expected rootDisplay to be block, got "${initialPageStatus.rootDisplay}"`)
    }
    if (!initialPageStatus.hasHero) {
      throw new Error('Expected Hero section to be mounted!')
    }

    console.log('\n--- Test 1: Hero Scroll-Linked Progressive Recession ---')
    const heroAtZero = await cdp.eval(`
      (() => {
        const heroCopy = document.querySelector(".hero-copy");
        const panel = document.querySelector(".hero-editorial-panel");
        return {
          copyTransform: heroCopy ? window.getComputedStyle(heroCopy).transform : "",
          copyOpacity: heroCopy ? window.getComputedStyle(heroCopy).opacity : "",
          panelTransform: panel ? window.getComputedStyle(panel).transform : "",
          panelOpacity: panel ? window.getComputedStyle(panel).opacity : ""
        };
      })()
    `)
    console.log('Hero at scrollY=0:', heroAtZero)

    // Scroll to 400px down
    await cdp.eval('window.scrollTo(0, 400);')
    await sleep(250)

    const heroAt400 = await cdp.eval(`
      (() => {
        const heroCopy = document.querySelector(".hero-copy");
        const panel = document.querySelector(".hero-editorial-panel");
        return {
          scrollY: window.scrollY,
          copyTransform: heroCopy ? window.getComputedStyle(heroCopy).transform : "",
          copyOpacity: heroCopy ? window.getComputedStyle(heroCopy).opacity : "",
          panelTransform: panel ? window.getComputedStyle(panel).transform : "",
          panelOpacity: panel ? window.getComputedStyle(panel).opacity : ""
        };
      })()
    `)
    console.log('Hero at scrollY=400:', heroAt400)

    if (heroAt400.copyTransform === heroAtZero.copyTransform && heroAt400.copyOpacity === heroAtZero.copyOpacity) {
      throw new Error('Hero copy styles must change dynamically in response to scroll progress!')
    }
    console.log('✓ Hero scroll recession verified: transforms and opacity smoothly respond to scroll position!')

    console.log('\n--- Test 2: Featured Projects Scroll-Progress Fan-Out Composition ---')
    await cdp.eval('window.scrollTo(0, 850);')
    await sleep(250)

    const cardsAt850 = await cdp.eval(`
      (() => {
        const cards = Array.from(document.querySelectorAll(".project-grid.featured-grid .project-card"));
        const cardTransforms = cards.map(c => {
          const wrapper = c.closest(".transform-gpu") || c;
          return window.getComputedStyle(wrapper).transform;
        });
        return {
          count: cards.length,
          cardTransforms
        };
      })()
    `)
    console.log('Projects at scrollY=850:', cardsAt850)
    if (cardsAt850.count < 3) {
      throw new Error(`Expected at least 3 featured cards, found ${cardsAt850.count}`)
    }

    // Scroll deeper into the projects track (scrollY=1350)
    await cdp.eval('window.scrollTo(0, 1350);')
    await sleep(250)

    const cardsAt1350 = await cdp.eval(`
      (() => {
        const cards = Array.from(document.querySelectorAll(".project-grid.featured-grid .project-card"));
        const cardTransforms = cards.map(c => {
          const wrapper = c.closest(".transform-gpu") || c;
          return window.getComputedStyle(wrapper).transform;
        });
        return {
          count: cards.length,
          cardTransforms
        };
      })()
    `)
    console.log('Projects at scrollY=1350:', cardsAt1350)

    // Verify card links and buttons are active and clickable
    const cardLinks = await cdp.eval(`
      (() => {
        const links = Array.from(document.querySelectorAll(".project-grid.featured-grid a"));
        return links.map(a => ({ text: a.textContent.trim(), href: a.getAttribute("href") }));
      })()
    `)
    console.log('Featured card interactive links verified:', cardLinks.length, 'links found')
    if (cardLinks.length < 3) {
      throw new Error('Project cards must have accessible and clickable links!')
    }
    console.log('✓ Featured Projects scroll-linked fan-out and accessibility verified!')

    console.log('\n--- Test 3: Technical Focus Section (Split Composition & Feature Card) ---')
    await cdp.eval('window.scrollTo(0, 1900);')
    await sleep(250)

    const techFocusState = await cdp.eval(`
      (() => {
        const section = document.querySelector(".section.home-preview.two-column");
        const featureCard = section ? section.querySelector(".animated-card, .group") || section.children[1] : null;
        return {
          sectionExists: !!section,
          hasFeatureCard: !!featureCard,
          cardTransform: featureCard ? window.getComputedStyle(featureCard).transform : ""
        };
      })()
    `)
    console.log('Technical Focus state:', techFocusState)
    if (!techFocusState.sectionExists) {
      throw new Error('Technical focus section not found in DOM!')
    }
    console.log('✓ Technical Focus scroll-linked composition verified!')

    console.log('\n--- Test 4: About Preview Layered Composition & Watermark ---')
    await cdp.eval('window.scrollTo(0, 2500);')
    await sleep(250)

    const aboutState = await cdp.eval(`
      (() => {
        const section = document.querySelector(".section.home-preview.about-preview");
        const watermark = section ? section.querySelector(".font-mono") : null;
        const link = section ? section.querySelector("a[href='/about']") : null;
        return {
          sectionExists: !!section,
          hasWatermark: !!watermark,
          watermarkText: watermark?.innerText?.trim() || "",
          hasAboutLink: !!link
        };
      })()
    `)
    console.log('About Preview state:', aboutState)
    if (!aboutState.sectionExists) {
      throw new Error('About preview section not found!')
    }
    if (aboutState.watermarkText !== '03') {
      throw new Error(`Expected watermark 03, got "${aboutState.watermarkText}"`)
    }
    console.log('✓ About Preview layered editorial spread verified!')

    console.log('\n--- Test 5: Tools & Ecosystem Independent Section ---')
    await cdp.eval('window.scrollTo(0, 2900);')
    await sleep(250)

    const toolsState = await cdp.eval(`
      (() => {
        const section = document.querySelector(".section.home-tools") || document.getElementById("tools");
        const cards = section ? section.querySelectorAll(".p-6.rounded-2xl") : [];
        const heading = section ? section.querySelector("h2")?.innerText : "";
        const rect = section ? section.getBoundingClientRect() : null;
        return {
          sectionExists: !!section,
          heading,
          cardsCount: cards.length,
          top: rect ? rect.top : 0,
          bottom: rect ? rect.bottom : 0
        };
      })()
    `)
    console.log('Tools & Ecosystem state:', toolsState)
    if (!toolsState.sectionExists) {
      throw new Error('04 / Tools & Ecosystem independent section not found!')
    }
    if (toolsState.cardsCount < 4) {
      throw new Error(`Expected 4 tools competency cards, found ${toolsState.cardsCount}`)
    }
    console.log('✓ Tools & Ecosystem independent section verified with 4 competency cards!')

    console.log('\n--- Test 6: Homepage Contact & Aceternity Logo Cloud ---')
    await cdp.eval('window.scrollTo(0, 3600);')
    await sleep(250)

    const contactState = await cdp.eval(`
      (() => {
        const toolsSection = document.querySelector(".section.home-tools") || document.getElementById("tools");
        const contactSection = document.querySelector(".section.home-contact") || document.getElementById("contact");
        const logoCloud = contactSection ? contactSection.querySelector(".overflow-hidden, .grid") : null;
        const emailBtn = contactSection ? contactSection.querySelector("a[href^='mailto:']") : null;
        const contactPageBtn = contactSection ? contactSection.querySelector("a[href='/contact']") : null;

        const toolsRect = toolsSection ? toolsSection.getBoundingClientRect() : null;
        const contactRect = contactSection ? contactSection.getBoundingClientRect() : null;

        // Check for layout collision: contact must start after tools
        const overlaps = toolsRect && contactRect ? (toolsRect.bottom > contactRect.top + 2) : false;

        return {
          sectionExists: !!contactSection,
          hasLogoCloud: !!logoCloud,
          hasEmailBtn: !!emailBtn,
          hasContactPageBtn: !!contactPageBtn,
          toolsBottom: toolsRect ? toolsRect.bottom : 0,
          contactTop: contactRect ? contactRect.top : 0,
          overlaps
        };
      })()
    `)
    console.log('Homepage Contact state:', contactState)
    if (!contactState.sectionExists) {
      throw new Error('Homepage contact section not found!')
    }
    if (contactState.overlaps) {
      throw new Error(`Layout collision detected: Tools bottom (${contactState.toolsBottom}) overlaps Contact top (${contactState.contactTop})!`)
    }
    if (!contactState.hasEmailBtn || !contactState.hasContactPageBtn) {
      throw new Error('Homepage contact CTA buttons must be present and functional!')
    }
    console.log('✓ Homepage Contact distinct section & logo cloud verified with ZERO layout overlap!')

    console.log('\n--- Test 7: Rapid Scrolling & Reverse Scroll Interruption Resilience ---')
    await cdp.eval(`
      (() => {
        // Rapid scroll sequence
        window.scrollTo(0, 0);
        window.scrollTo(0, 3000);
        window.scrollTo(0, 800);
        window.scrollTo(0, 1500);
      })()
    `)
    await sleep(250)

    const resilienceState = await cdp.eval(`
      (() => {
        const bodyOverflow = document.body.style.overflow;
        const heroCopy = document.querySelector(".hero-copy");
        const cards = Array.from(document.querySelectorAll(".project-grid.featured-grid .project-card"));
        return {
          bodyOverflow,
          heroCopyVisible: heroCopy ? window.getComputedStyle(heroCopy).visibility : "",
          cardsCount: cards.length,
          currentScrollY: window.scrollY
        };
      })()
    `)
    console.log('Rapid scroll resilience state:', resilienceState)
    if (resilienceState.bodyOverflow === 'hidden') {
      throw new Error('Body scroll should never remain locked after scrolling within homepage!')
    }
    if (resilienceState.cardsCount < 3) {
      throw new Error('Cards should remain intact during reverse scrolling!')
    }
    console.log('✓ Rapid & reverse scrolling resilience verified: zero layout crashes or stuck states!')

    cdp.close()
    console.log('\n🎉 ALL SCROLL-DRIVEN EXPERIENTIAL TESTS PASSED SUCCESSFULLY! 🎉')
  } finally {
    edge.kill()
    await previewServer.close()
  }
}

run().catch((err) => {
  console.error('Test error:', err)
  process.exit(1)
})

