import React from 'react'

interface ChatHeaderProps {
  sessionId: string
  onSessionIdChange: (id: string) => void
}

export function ChatHeader({ sessionId, onSessionIdChange }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 px-4 py-3 text-white shrink-0" style={{ background: 'linear-gradient(135deg, #202068 0%, #e058a0 100%)' }}>
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 bg-white/15 overflow-hidden">
          <img
            src="/pluto-logo-mark.png"
            alt="Pluto Agreement"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h1 className="text-base font-semibold truncate">Pluto Agreement</h1>
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
