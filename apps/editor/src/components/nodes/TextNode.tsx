/**
 * TextNode Component
 * 텍스트 스토리 노드
 */

import React, { useState, useRef, useEffect } from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import type { TextNodeData } from '../../types/nodes'

export function TextNode({ data: rawData }: NodeProps) {
  const data = rawData as unknown as TextNodeData
  const [isEditingText, setIsEditingText] = useState(false)
  const [isEditingCharacter, setIsEditingCharacter] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)
  const characterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isEditingText && textRef.current) {
      textRef.current.focus()
      // Move cursor to end
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(textRef.current)
      range.collapse(false)
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
  }, [isEditingText])

  useEffect(() => {
    if (isEditingCharacter && characterRef.current) {
      characterRef.current.focus()
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(characterRef.current)
      range.collapse(false)
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
  }, [isEditingCharacter])

  const handleTextBlur = () => {
    if (textRef.current && data.onUpdate) {
      const newText = textRef.current.textContent || ''
      if (newText.trim() && newText !== data.text) {
        data.onUpdate({ text: newText })
      }
    }
    setIsEditingText(false)
  }

  const handleCharacterBlur = () => {
    if (characterRef.current && data.onUpdate) {
      const newCharacter = characterRef.current.textContent || ''
      if (newCharacter.trim() && newCharacter !== data.character) {
        data.onUpdate({ character: newCharacter })
      }
    }
    setIsEditingCharacter(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent, type: 'text' | 'character') => {
    if (e.key === 'Enter' && !e.shiftKey && type === 'character') {
      e.preventDefault()
      ;(e.target as HTMLDivElement).blur()
    }
    if (e.key === 'Escape') {
      ;(e.target as HTMLDivElement).blur()
    }
  }
  const nodeStyles: React.CSSProperties = {
    padding: '16px',
    backgroundColor: '#ffffff',
    border: '2px solid #0ea5e9',
    borderRadius: '8px',
    minWidth: '250px',
    maxWidth: '350px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '1px solid #e5e7eb',
  }

  const iconStyles: React.CSSProperties = {
    fontSize: '18px',
  }

  const titleStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: '#0ea5e9',
  }

  const textStyles: React.CSSProperties = {
    fontSize: '14px',
    color: '#374151',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap',
  }

  const characterStyles: React.CSSProperties = {
    fontSize: '12px',
    color: isEditingCharacter ? '#374151' : '#6b7280',
    marginBottom: '8px',
    fontStyle: 'italic',
    cursor: 'text',
    padding: '4px',
    borderRadius: '4px',
    backgroundColor: isEditingCharacter ? '#f3f4f6' : 'transparent',
    outline: isEditingCharacter ? '2px solid #0ea5e9' : 'none',
  }

  const editableTextStyles: React.CSSProperties = {
    ...textStyles,
    cursor: 'text',
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: isEditingText ? '#f3f4f6' : 'transparent',
    outline: isEditingText ? '2px solid #0ea5e9' : 'none',
    minHeight: '40px',
  }

  return (
    <div style={nodeStyles}>
      <Handle type="target" position={Position.Top} />

      <div style={headerStyles}>
        <span style={iconStyles}>💬</span>
        <span style={titleStyles}>텍스트 노드</span>
      </div>

      {data.character && (
        <div
          ref={characterRef}
          contentEditable={isEditingCharacter}
          suppressContentEditableWarning
          style={characterStyles}
          onMouseDown={(e) => {
            e.stopPropagation()
          }}
          onClick={(e) => {
            e.stopPropagation()
            if (!isEditingCharacter) setIsEditingCharacter(true)
          }}
          onBlur={handleCharacterBlur}
          onKeyDown={(e) => handleKeyDown(e, 'character')}
        >
          {data.character}
        </div>
      )}

      <div
        ref={textRef}
        contentEditable={isEditingText}
        suppressContentEditableWarning
        style={editableTextStyles}
        onMouseDown={(e) => {
          e.stopPropagation()
        }}
        onClick={(e) => {
          e.stopPropagation()
          if (!isEditingText) setIsEditingText(true)
        }}
        onBlur={handleTextBlur}
        onKeyDown={(e) => handleKeyDown(e, 'text')}
      >
        {data.text || '텍스트를 입력하세요...'}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
