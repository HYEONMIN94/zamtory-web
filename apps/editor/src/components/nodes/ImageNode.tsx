/**
 * ImageNode Component
 * 이미지 스토리 노드
 */

import React, { useState, useRef } from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import { Modal, Input, Button } from '@zamtory/ui'
import type { ImageNodeData } from '../../types/nodes'

export function ImageNode({ data: rawData }: NodeProps) {
  const data = rawData as unknown as ImageNodeData
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(data.imageUrl || '')
  const [editCaption, setEditCaption] = useState(data.caption || '')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('JPG, PNG, GIF, WEBP 파일만 업로드 가능합니다.')
      return
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setError('파일 크기는 5MB를 초과할 수 없습니다.')
      return
    }

    setError('')

    // Convert to Base64
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (data.onUpdate && previewUrl) {
      data.onUpdate({
        imageUrl: previewUrl,
        caption: editCaption.trim(),
      })
      setIsModalOpen(false)
    }
  }

  const handleCancel = () => {
    setPreviewUrl(data.imageUrl || '')
    setEditCaption(data.caption || '')
    setError('')
    setIsModalOpen(false)
  }

  const handleClearImage = () => {
    setPreviewUrl('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  const nodeStyles: React.CSSProperties = {
    padding: '16px',
    backgroundColor: '#ffffff',
    border: '2px solid #10b981',
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
    color: '#10b981',
  }

  const imageContainerStyles: React.CSSProperties = {
    width: '100%',
    height: '150px',
    backgroundColor: '#f3f4f6',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: data.caption ? '8px' : 0,
    overflow: 'hidden',
  }

  const placeholderStyles: React.CSSProperties = {
    fontSize: '48px',
    opacity: 0.3,
  }

  const captionStyles: React.CSSProperties = {
    fontSize: '13px',
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
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

  const fileInputStyles: React.CSSProperties = {
    display: 'none',
  }

  const uploadButtonContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
  }

  const previewContainerStyles: React.CSSProperties = {
    width: '100%',
    height: '200px',
    backgroundColor: '#f3f4f6',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    border: '2px dashed #d1d5db',
  }

  return (
    <>
      <div style={nodeStyles}>
        <Handle type="target" position={Position.Top} />

        <div style={headerStyles}>
          <span style={iconStyles}>🖼️</span>
          <span style={titleStyles}>이미지 노드</span>
        </div>

        <div style={imageContainerStyles}>
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt={data.caption || '이미지'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <span style={placeholderStyles}>🖼️</span>
          )}
        </div>

        {data.caption && (
          <div style={captionStyles}>{data.caption}</div>
        )}

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
          {data.imageUrl ? '✏️ 편집' : '📷 이미지 등록'}
        </Button>

        <Handle type="source" position={Position.Bottom} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title="이미지 노드 편집"
        footer={
          <>
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={!previewUrl}>
              저장
            </Button>
          </>
        }
      >
        <div style={modalFormStyles}>
          <div>
            <label style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block' }}>
              이미지 업로드
            </label>
            <div style={uploadButtonContainerStyles}>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                파일 선택
              </Button>
              {previewUrl && (
                <Button variant="outline" onClick={handleClearImage}>
                  이미지 제거
                </Button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
              style={fileInputStyles}
            />
            {error && (
              <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                {error}
              </div>
            )}
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
              JPG, PNG, GIF, WEBP (최대 5MB)
            </div>
          </div>

          <div style={previewContainerStyles}>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="미리보기"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <span style={{ fontSize: '48px', opacity: 0.3 }}>🖼️</span>
            )}
          </div>

          <Input
            label="캡션"
            value={editCaption}
            onChange={(e) => setEditCaption(e.target.value)}
            placeholder="이미지 설명을 입력하세요"
            fullWidth
          />
        </div>
      </Modal>
    </>
  )
}
