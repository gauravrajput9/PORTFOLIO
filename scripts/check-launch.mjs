import { existsSync } from 'node:fs'
const checks=[['Resume PDF',existsSync('public/resume/gaurav-rajput-resume.pdf')],['VITE_CONTACT_EMAIL',Boolean(process.env.VITE_CONTACT_EMAIL)],['VITE_SITE_URL',Boolean(process.env.VITE_SITE_URL)]]
for(const [label,ready] of checks) console.log(`${ready?'✓':'—'} ${label} ${ready?'configured':'missing'}`)
