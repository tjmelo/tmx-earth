import React from 'react'
import { ILoading } from '../../interfaces'

const toneByType: Record<string, { background: string; color: string }> = {
  info: { background: '#e8f0ff', color: '#1d4ed8' },
  success: { background: '#eafaf1', color: '#166534' },
  warning: { background: '#fff7e6', color: '#b45309' },
  danger: { background: '#fbe9e7', color: '#b42318' },
}

export const Loading: React.FC<ILoading> = ({ type, children }: ILoading) => {
  const tone = toneByType[type] ?? toneByType.info

  return (
    <div
      role={type === 'danger' ? 'alert' : 'status'}
      aria-live={type === 'danger' ? 'assertive' : 'polite'}
      style={{
        margin: '1rem 0',
        borderRadius: 8,
        padding: '0.75rem 1rem',
        background: tone.background,
        color: tone.color,
        fontWeight: 600,
        border: '1px solid transparent',
      }}
    >
      {children}
    </div>
  )
}
