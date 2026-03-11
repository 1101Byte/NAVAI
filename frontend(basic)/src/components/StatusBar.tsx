import React from 'react'

interface StatusBarProps {
  status: string
  error?: boolean
}

export function StatusBar({ status, error }: StatusBarProps) {
  return (
    <div className="shrink-0 px-4 py-1.5 text-[11px] text-slate-500 border-t border-slate-200 bg-slate-50">
      <span className={error ? 'text-red-600 font-medium' : ''}>{status}</span>
    </div>
  )
}
