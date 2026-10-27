import { preview } from 'vite'

async function run() {
  console.log('Starting Vite preview server on port 5199 (127.0.0.1)...')
  const previewServer = await preview({
    preview: { port: 5199, host: '127.0.0.1' },
  })

  const host = 'http://127.0.0.1:5199'
  const routes = [
    '/',
    '/about',
    '/education',
    '/experience',
    '/projects',
    '/projects/devpilot',
    '/projects/resume-analyzer',
    '/projects/lms',
    '/projects/currency-converter',
    '/skills',
    '/resume',
    '/contact',
    '/non-existent-route',
  ]

  let allSuccess = true
  for (const route of routes) {
    try {
      const res = await fetch(`${host}${route}`)
      const text = await res.text()
      const ok = res.status === 200 && text.includes('<!doctype html>')
      console.log(`Route [${route}]: status ${res.status} - ${ok ? 'OK' : 'FAIL'}`)
      if (!ok) allSuccess = false
    } catch (err) {
      console.error(`Route [${route}] error:`, err.message)
      allSuccess = false
    }
  }

  await previewServer.close()
  console.log(`\nPreview test complete: ${allSuccess ? 'ALL PASSED' : 'SOME FAILED'}`)
  process.exitCode = allSuccess ? 0 : 1
}

run()

