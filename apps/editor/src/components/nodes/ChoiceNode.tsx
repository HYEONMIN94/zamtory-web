/**
 * ChoiceNode Component
 * 선택지 스토리 노드
 */

import React, { useState } from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import { Modal, Input, Button } from '@zamtory/ui'
import type { ChoiceNodeData } from '../../types/nodes'

export function ChoiceNode({ data: rawData }: NodeProps) {
  const data = rawData as unknown as ChoiceNodeData
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editQuestion, setEditQuestion] = useState(data.question || '')
  const [editChoices, setEditChoices] = useState<string[]>(data.choices || ['선택지 1', '선택지 2'])

  const handleSave = () => {
    if (data.onUpdate) {
      const trimmedQuestion = editQuestion.trim()
      const trimmedChoices = editChoices.filter((c) => c.trim()).map((c) => c.trim())

      if (trimmedQuestion && trimmedChoices.length >= 2) {
        data.onUpdate({
          question: trimmedQuestion,
          choices: trimmedChoices,
        })
        setIsModalOpen(false)
      }
    }
  }

  const handleCancel = () => {
    setEditQuestion(data.question || '')
    setEditChoices(data.choices || ['선택지 1', '선택지 2'])
    setIsModalOpen(false)
  }

  const addChoice = () => {
    setEditChoices([...editChoices, `선택지 ${editChoices.length + 1}`])
  }

  const removeChoice = (index: number) => {
    if (editChoices.length > 2) {
      setEditChoices(editChoices.filter((_, i) => i !== index))
    }
  }

  const updateChoice = (index: number, value: string) => {
    const newChoices = [...editChoices]
    newChoices[index] = value
    setEditChoices(newChoices)
  }
  const nodeStyles: React.CSSProperties = {
    padding: '16px',
    backgroundColor: '#ffffff',
    border: '2px solid #d946ef',
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
    color: '#d946ef',
  }

  const questionStyles: React.CSSProperties = {
    fontSize: '14px',
    color: '#374151',
    marginBottom: '12px',
    fontWeight: 500,
  }

  const choiceListStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  }

  const choiceItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    backgroundColor: '#fdf4ff',
    borderRadius: '4px',
    fontSize: '13px',
    color: '#581c87',
  }

  const editButtonStyles: React.CSSProperties = {
    marginTop: '8px',
    width: '100%',
  }

  const modalFormStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }

  const choiceInputContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-end',
  }

  return (
    <>
      <div style={nodeStyles}>
        <Handle type="target" position={Position.Top} />

        <div style={headerStyles}>
          <span style={iconStyles}>🔀</span>
          <span style={titleStyles}>선택지 노드</span>
        </div>

        <div style={questionStyles}>
          {data.question || '질문을 입력하세요...'}
        </div>

        <div style={choiceListStyles}>
          {(data.choices || ['선택지 1', '선택지 2']).map((choice, index) => (
            <div key={index} style={choiceItemStyles}>
              <span>{index + 1}.</span>
              <span>{choice}</span>
              <Handle
                type="source"
                position={Position.Right}
                id={`choice-${index}`}
                style={{
                  top: 'auto',
                  right: '-8px',
                  background: '#d946ef',
                }}
              />
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            setIsModalOpen(true)
          }}
          onMouseDown={(e) => e.stopPropagation()}
          style={editButtonStyles}
        >
          ✏️ 편집
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title="선택지 노드 편집"
        footer={
          <>
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button variant="primary" onClick={handleSave}>
              저장
            </Button>
          </>
        }
      >
        <div style={modalFormStyles}>
          <Input
            label="질문"
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
            placeholder="질문을 입력하세요"
            fullWidth
          />

          <div>
            <label style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block' }}>
              선택지 (최소 2개)
            </label>
            {editChoices.map((choice, index) => (
              <div key={index} style={choiceInputContainerStyles}>
                <Input
                  value={choice}
                  onChange={(e) => updateChoice(index, e.target.value)}
                  placeholder={`선택지 ${index + 1}`}
                  fullWidth
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeChoice(index)}
                  disabled={editChoices.length <= 2}
                >
                  삭제
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addChoice}
              style={{ marginTop: '8px' }}
            >
              + 선택지 추가
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
