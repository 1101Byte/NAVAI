import React, { useState, useCallback } from 'react'

export interface FieldMapping {
  excel_column: string
  system_field_key: string
  system_field_description: string
}

interface FieldSelectionPanelProps {
  mappedFields: FieldMapping[]
  scalePrompt?: string
  onValidate: (selectedFields: FieldMapping[]) => void
  onRerun: () => void
}

export function FieldSelectionPanel({
  mappedFields,
  scalePrompt,
  onValidate,
  onRerun,
}: FieldSelectionPanelProps) {
  const [selectedFields, setSelectedFields] = useState<Set<string>>(
    new Set(mappedFields.map(f => f.system_field_key))
  )

  const handleToggle = useCallback((systemFieldKey: string) => {
    setSelectedFields(prev => {
      const newSet = new Set(prev)
      if (newSet.has(systemFieldKey)) {
        newSet.delete(systemFieldKey)
      } else {
        newSet.add(systemFieldKey)
      }
      return newSet
    })
  }, [])

  const handleValidate = useCallback(() => {
    const selected = mappedFields.filter(f => selectedFields.has(f.system_field_key))
    onValidate(selected)
  }, [mappedFields, selectedFields, onValidate])

  return (
    <div className="w-full bg-white/75 backdrop-blur-md rounded-xl border border-white/30 p-4 my-3 shadow-sm">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-800 mb-1">
          {scalePrompt || 'Please select the desired columns from the mapped fields:'}
        </p>
        <p className="text-xs text-slate-500">
          De-select any columns you don't want to include
        </p>
      </div>

      <div className="space-y-2 mb-4 max-h-[250px] overflow-y-auto">
        {mappedFields.map(field => (
          <label
            key={field.system_field_key}
            className="flex items-start cursor-pointer hover:bg-white/60 p-2 rounded-lg transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedFields.has(field.system_field_key)}
              onChange={() => handleToggle(field.system_field_key)}
              className="mt-1 w-4 h-4 rounded border-slate-300 accent-[#202068]"
            />
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium text-slate-800">
                {field.excel_column}
              </div>
              <div className="text-xs text-slate-500">
                {field.system_field_key} • {field.system_field_description}
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleValidate}
          disabled={selectedFields.size === 0}
          className="flex-1 px-4 py-2.5 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-opacity shadow-md hover:opacity-95"
          style={{ background: 'linear-gradient(135deg, #202068 0%, #e058a0 100%)' }}
        >
          Validate Selection
        </button>
        <button
          onClick={onRerun}
          className="flex-1 px-4 py-2.5 bg-white/60 hover:bg-white/75 text-slate-800 font-semibold rounded-lg transition-colors border border-white/30 shadow-sm"
        >
          Re-run Field Selection
        </button>
      </div>
    </div>
  )
}
