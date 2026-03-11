import React from 'react'

interface ChatHeaderProps {
  sessionId: string
  onSessionIdChange: (id: string) => void
}

export function ChatHeader({ sessionId, onSessionIdChange }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 px-4 py-3 text-white shrink-0" style={{ background: 'linear-gradient(135deg, #3E84C5 0%, #16BAE7 100%)' }}>
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white/20">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <h1 className="text-base font-semibold truncate">NAVIT Logistics</h1>
          <p className="text-xs opacity-90">Agreement & rate card assistant</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs opacity-90 hidden sm:inline">Session</span>
        <input
          type="text"
          value={sessionId}
          onChange={(e) => onSessionIdChange(e.target.value)}
          className="rounded-lg bg-white/20 px-2.5 py-1.5 text-xs text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-1 focus:ring-white/50 w-24"
          placeholder="test1234"
        />
      </div>
    </header>
  )
}
