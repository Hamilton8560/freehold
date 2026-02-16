import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')

const files = ['index.js', 'index.mjs', 'charts.js', 'charts.mjs', 'kanban.js', 'kanban.mjs']

for (const file of files) {
  const filePath = join(distDir, file)
  const content = readFileSync(filePath, 'utf-8')

  // Only add if not already present
  if (!content.startsWith('"use client"')) {
    writeFileSync(filePath, `"use client";\n${content}`)
    console.log(`Added "use client" to ${file}`)
  }
}
