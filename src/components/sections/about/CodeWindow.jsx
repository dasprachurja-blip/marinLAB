import { useState, useEffect, useRef, useMemo } from 'react'

/* ─────────────────────────────────────────────
   CODE SNIPPETS — real code that loops
   ───────────────────────────────────────────── */
const codeBlocks = [
  {
    filename: 'Hero.jsx',
    lang: 'jsx',
    lines: [
      { text: 'import { motion } from "framer-motion";', delay: 0 },
      { text: '', delay: 0 },
      { text: 'export default function Hero() {', delay: 0 },
      { text: '  const variants = {', delay: 0 },
      { text: '    hidden: { opacity: 0, y: 40 },', delay: 0 },
      { text: '    visible: { opacity: 1, y: 0 },', delay: 0 },
      { text: '  };', delay: 0 },
      { text: '', delay: 0 },
      { text: '  return (', delay: 0 },
      { text: '    <motion.section', delay: 0 },
      { text: '      initial="hidden"', delay: 0 },
      { text: '      animate="visible"', delay: 0 },
      { text: '      transition={{ duration: 0.9 }}', delay: 0 },
      { text: '      className="hero-cinematic"', delay: 0 },
      { text: '    >', delay: 0 },
      { text: '      <h1>We make the web</h1>', delay: 0 },
      { text: '      <span className="accent">', delay: 0 },
      { text: '        feel alive.', delay: 0 },
      { text: '      </span>', delay: 0 },
      { text: '    </motion.section>', delay: 0 },
      { text: '  );', delay: 0 },
      { text: '}', delay: 0 },
    ],
  },
  {
    filename: 'useScrollReveal.js',
    lang: 'js',
    lines: [
      { text: '// Scroll-driven reveal hook', delay: 0 },
      { text: 'import { useEffect, useRef } from "react";', delay: 0 },
      { text: '', delay: 0 },
      { text: 'export function useScrollReveal(opts) {', delay: 0 },
      { text: '  const ref = useRef(null);', delay: 0 },
      { text: '', delay: 0 },
      { text: '  useEffect(() => {', delay: 0 },
      { text: '    const observer = new', delay: 0 },
      { text: '      IntersectionObserver(([e]) => {', delay: 0 },
      { text: '        if (e.isIntersecting) {', delay: 0 },
      { text: '          e.target.classList.add(', delay: 0 },
      { text: '            "is-revealed"', delay: 0 },
      { text: '          );', delay: 0 },
      { text: '          observer.unobserve(e.target);', delay: 0 },
      { text: '        }', delay: 0 },
      { text: '      }, { threshold: 0.15 });', delay: 0 },
      { text: '', delay: 0 },
      { text: '    if (ref.current)', delay: 0 },
      { text: '      observer.observe(ref.current);', delay: 0 },
      { text: '', delay: 0 },
      { text: '    return () => observer.disconnect();', delay: 0 },
      { text: '  }, []);', delay: 0 },
      { text: '', delay: 0 },
      { text: '  return ref;', delay: 0 },
      { text: '}', delay: 0 },
    ],
  },
  {
    filename: 'performance.config.js',
    lang: 'js',
    lines: [
      { text: '// ArctiqFlow performance config', delay: 0 },
      { text: 'export const config = {', delay: 0 },
      { text: '  target: {', delay: 0 },
      { text: '    lcp: "< 1.2s",', delay: 0 },
      { text: '    fid: "< 50ms",', delay: 0 },
      { text: '    cls: "< 0.05",', delay: 0 },
      { text: '    fps: 60,', delay: 0 },
      { text: '  },', delay: 0 },
      { text: '', delay: 0 },
      { text: '  optimization: {', delay: 0 },
      { text: '    lazyLoad: true,', delay: 0 },
      { text: '    prefetch: "viewport",', delay: 0 },
      { text: '    compression: "brotli",', delay: 0 },
      { text: '    imageFormat: "avif",', delay: 0 },
      { text: '    bundleSplit: "route",', delay: 0 },
      { text: '  },', delay: 0 },
      { text: '', delay: 0 },
      { text: '  motion: {', delay: 0 },
      { text: '    reduceOnBattery: true,', delay: 0 },
      { text: '    respectPrefers: true,', delay: 0 },
      { text: '    maxConcurrent: 4,', delay: 0 },
      { text: '  },', delay: 0 },
      { text: '};', delay: 0 },
    ],
  },
]

/* ─────────────────────────────────────────────
   SYNTAX HIGHLIGHTER — lightweight, inline
   ───────────────────────────────────────────── */
function highlightLine(text) {
  if (!text) return <span>&nbsp;</span>

  const tokens = []
  let remaining = text

  // Order matters — keywords before identifiers
  const rules = [
    // Comments
    { regex: /^(\/\/.*)/, className: 'cw-comment' },
    // Strings (double + single + template)
    { regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/, className: 'cw-string' },
    // JSX tags
    { regex: /(<\/?[\w.]+)/, className: 'cw-tag' },
    // JSX close >
    { regex: /(\/?>)/, className: 'cw-tag' },
    // Keywords
    { regex: /\b(import|from|export|default|function|const|let|var|return|if|else|new|true|false)\b/, className: 'cw-keyword' },
    // Numbers
    { regex: /\b(\d+\.?\d*)\b/, className: 'cw-number' },
    // Properties/keys before colon
    { regex: /\b(\w+)(?=\s*[:])/, className: 'cw-prop' },
    // Function calls
    { regex: /\b(\w+)(?=\s*\()/, className: 'cw-func' },
    // Punctuation
    { regex: /([{}()[\];,=:.<>])/, className: 'cw-punct' },
  ]

  let safety = 0
  while (remaining.length > 0 && safety < 500) {
    safety++
    // Leading whitespace
    const wsMatch = remaining.match(/^(\s+)/)
    if (wsMatch) {
      tokens.push(<span key={`ws-${safety}`}>{wsMatch[1]}</span>)
      remaining = remaining.slice(wsMatch[1].length)
      continue
    }

    let matched = false
    for (const rule of rules) {
      const m = remaining.match(rule.regex)
      if (m && m.index === 0) {
        tokens.push(
          <span key={`t-${safety}`} className={rule.className}>
            {m[1] || m[0]}
          </span>
        )
        remaining = remaining.slice((m[1] || m[0]).length)
        matched = true
        break
      }
    }

    if (!matched) {
      // Take one char
      tokens.push(<span key={`c-${safety}`}>{remaining[0]}</span>)
      remaining = remaining.slice(1)
    }
  }

  return tokens
}

/* ─────────────────────────────────────────────
   CODE WINDOW COMPONENT
   ───────────────────────────────────────────── */
export default function CodeWindow() {
  const [blockIdx, setBlockIdx] = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)
  const [typedChars, setTypedChars] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const scrollRef = useRef(null)

  const block = codeBlocks[blockIdx]
  const currentLine = block.lines[visibleLines] || { text: '' }
  const totalLines = block.lines.length

  // Type out characters on the current line
  useEffect(() => {
    if (!isTyping) return
    if (visibleLines >= totalLines) {
      // All lines typed — pause then switch block
      const timer = setTimeout(() => {
        setBlockIdx((prev) => (prev + 1) % codeBlocks.length)
        setVisibleLines(0)
        setTypedChars(0)
      }, 3000)
      return () => clearTimeout(timer)
    }

    const lineText = block.lines[visibleLines].text
    if (typedChars >= lineText.length) {
      // Line complete — advance to next line
      const timer = setTimeout(() => {
        setVisibleLines((v) => v + 1)
        setTypedChars(0)
      }, lineText === '' ? 60 : 30)
      return () => clearTimeout(timer)
    }

    // Type next character
    const speed = 22 + Math.random() * 25
    const timer = setTimeout(() => setTypedChars((c) => c + 1), speed)
    return () => clearTimeout(timer)
  }, [visibleLines, typedChars, isTyping, blockIdx])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleLines, typedChars])

  // Build rendered lines
  const renderedLines = useMemo(() => {
    const result = []
    for (let i = 0; i < visibleLines && i < totalLines; i++) {
      result.push({ text: block.lines[i].text, complete: true })
    }
    if (visibleLines < totalLines) {
      result.push({
        text: currentLine.text.slice(0, typedChars),
        complete: false,
      })
    }
    return result
  }, [visibleLines, typedChars, blockIdx])

  return (
    <div className="cw-window">
      {/* Title bar */}
      <div className="cw-titlebar">
        <div className="cw-dots">
          <span className="cw-dot cw-dot--red" />
          <span className="cw-dot cw-dot--yellow" />
          <span className="cw-dot cw-dot--green" />
        </div>
        <span className="cw-filename">{block.filename}</span>
        <div className="cw-titlebar-space" />
      </div>

      {/* Code area */}
      <div className="cw-code" ref={scrollRef}>
        <div className="cw-lines">
          {renderedLines.map((line, i) => (
            <div key={`${blockIdx}-${i}`} className="cw-line">
              <span className="cw-line-num">{i + 1}</span>
              <span className="cw-line-content">
                {line.complete ? highlightLine(line.text) : (
                  <>
                    {highlightLine(line.text)}
                    <span className="cw-cursor" />
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="cw-statusbar">
        <span className="cw-status-lang">{block.lang === 'jsx' ? 'React JSX' : 'JavaScript'}</span>
        <span className="cw-status-info">Ln {visibleLines + 1}, Col {typedChars + 1}</span>
        <span className="cw-status-encoding">UTF-8</span>
      </div>
    </div>
  )
}
