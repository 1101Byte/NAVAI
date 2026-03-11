import React, { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  onComplete?: () => void
}

export function TypewriterText({ text, speed = 18, onComplete }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    const cleaned = String(text ?? '').replace(/\bundefined\b/gi, '').trim()
    if (!cleaned) {
      setDisplayed('')
      onComplete?.()
      return
    }
    setDisplayed('')
    let i = 0
    const words = cleaned.split(/\s+/)
    const id = setInterval(() => {
      if (i >= words.length) {
        clearInterval(id)
        onComplete?.()
        return
      }
      const idx = i
      setDisplayed((prev) => (prev ? `${prev} ${words[idx]}` : words[idx]))
      i++
    }, speed)
    return () => clearInterval(id)
  }, [text, speed, onComplete])

  return <span>{displayed}</span>
}
