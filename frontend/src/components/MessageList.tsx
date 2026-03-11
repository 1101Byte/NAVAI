import React, { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'
import type { Message, FieldMapping } from '../types'

interface MessageListProps {
  messages: Message[]
  sending: boolean
  onFieldValidation?: (messageId: string, selectedFields: FieldMapping[]) => void
  onFieldRerun?: (messageId: string) => void
}

export function MessageList({ messages, sending, onFieldValidation, onFieldRerun }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight
      })
    }
  }, [messages, sending])

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto min-h-0 px-4 py-4 bg-white/15 backdrop-blur-sm"
      style={{
        background:
          'radial-gradient(800px circle at 20% 15%, rgba(95,98,208,0.18) 0%, rgba(95,98,208,0) 55%),' +
          'radial-gradient(700px circle at 85% 20%, rgba(193,91,174,0.16) 0%, rgba(193,91,174,0) 55%),' +
          'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
      }}
    >
      {messages.length === 0 && !sending ? (
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
          <img
            src="/pluto-logo-mark.png"
            alt="Pluto Agreement"
            className="w-32 sm:w-40 mb-4 drop-shadow-xl"
          />
          <p className="font-medium mb-1" style={{ color: '#202068' }}>Start a conversation with Pluto Agreement</p>
          <p className="text-sm text-slate-500 max-w-[260px]">
            Upload an agreement PDF or rate card Excel to get started. Ask anything about freight agreements.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m, index) => (
            <MessageBubble
              key={`${m.id}-${index}`}
              message={m}
              onFieldValidation={onFieldValidation}
              onFieldRerun={onFieldRerun}
            />
          ))}
          {sending && <TypingIndicator />}
        </div>
      )}
    </div>
  )
}


