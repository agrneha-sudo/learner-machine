import React from 'react'

// Renders simple markdown-like syntax:
//   **text**   → bold
//   ==text==   → highlighted
//   Lines starting with "• " → bullet list items

function parseLine(line: string, key: number) {
  const parts: React.ReactNode[] = []
  // Tokenise **bold** and ==highlight==
  const regex = /(\*\*(.+?)\*\*|==(.+?)==)/g
  let last = 0
  let match
  let idx = 0
  while ((match = regex.exec(line)) !== null) {
    if (match.index > last) parts.push(line.slice(last, match.index))
    if (match[0].startsWith('**')) {
      parts.push(<strong key={idx++}>{match[2]}</strong>)
    } else {
      parts.push(
        <mark key={idx++} className="bg-yellow-200 text-yellow-900 rounded px-0.5">
          {match[3]}
        </mark>
      )
    }
    last = match.index + match[0].length
  }
  if (last < line.length) parts.push(line.slice(last))
  return parts
}

export default function RichText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const lines = text.split('\n')

  // Group consecutive bullet lines into <ul> blocks
  const blocks: React.ReactNode[] = []
  let bullets: string[] = []
  let bi = 0

  const flushBullets = () => {
    if (bullets.length === 0) return
    blocks.push(
      <ul key={`ul-${bi++}`} className="list-none space-y-1 my-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-brand mt-0.5">•</span>
            <span>{parseLine(b, i)}</span>
          </li>
        ))}
      </ul>
    )
    bullets = []
  }

  lines.forEach((line, i) => {
    if (line.startsWith('• ')) {
      bullets.push(line.slice(2))
    } else {
      flushBullets()
      if (line.trim() === '') {
        blocks.push(<br key={`br-${i}`} />)
      } else {
        blocks.push(<p key={`p-${i}`}>{parseLine(line, i)}</p>)
      }
    }
  })
  flushBullets()

  return <div className={className} style={style}>{blocks}</div>
}
