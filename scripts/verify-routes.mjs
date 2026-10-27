import { projects } from '../src/data/projects.js'
import { navigationItems } from '../src/data/navigation.js'
import http from 'node:http'

console.log('--- 1. Validating Project Data ---')
for (const p of projects) {
  if (!p.slug || !p.name || !p.status || !p.stack || !p.problem || !p.solution) {
    throw new Error(`Project ${p.slug || 'unknown'} has missing required fields!`)
  }
  console.log(`✓ Project: ${p.name} (${p.slug}) - Status: ${p.status}`)
}

console.log('\n--- 2. Validating Navigation Items ---')
for (const item of navigationItems) {
  if (!item.label || !item.to) {
    throw new Error(`Navigation item ${item.label} invalid`)
  }
  console.log(`✓ Nav link: ${item.label} -> ${item.to}`)
}

console.log('\n--- 3. Testing Production Build Output ---')
import { existsSync, readFileSync } from 'node:fs'
const indexHtmlPath = 'dist/index.html'
if (!existsSync(indexHtmlPath)) {
  throw new Error('dist/index.html does not exist! Run npm run build first.')
}
const html = readFileSync(indexHtmlPath, 'utf8')
if (!html.includes('id="app"')) {
  throw new Error('dist/index.html is missing root container!')
}
console.log('✓ dist/index.html exists and contains #app mount point')

console.log('\n--- All local data and structure validations PASSED! ---')

