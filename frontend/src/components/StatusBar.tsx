import React from 'react'

interface StatusBarProps {
  status: string
  error?: boolean
}

export function StatusBar({ status, error }: StatusBarProps) {
  return (
    <div className="shrink-0 px-4 py-1.5 text-[11px] text-slate-600 border-t border-white/25 bg-white/45 backdrop-blur-xl">
      <span className={error ? 'text-red-600 font-medium' : ''}>{status}</span>
    </div>
  )
}
