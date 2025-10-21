'use client'

import { useParams } from 'next/navigation'
import { Button, Card } from '@zamtory/ui'

export default function StoryPage() {
  const params = useParams()
  const storyId = params.id

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    maxWidth: '480px',
    margin: '0 auto',
  }

  const headerStyles: React.CSSProperties = {
    padding: '16px',
    backgroundColor: '#0ea5e9',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }

  const contentStyles: React.CSSProperties = {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }

  const storyTextStyles: React.CSSProperties = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#374151',
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    marginBottom: '16px',
  }

  const choicesContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }

  const progressBarStyles: React.CSSProperties = {
    width: '100%',
    height: '4px',
    backgroundColor: '#e5e7eb',
    borderRadius: '2px',
    overflow: 'hidden',
  }

  const progressFillStyles: React.CSSProperties = {
    height: '100%',
    backgroundColor: '#0ea5e9',
    width: '30%',
    transition: 'width 0.3s',
  }

  // 샘플 스토리 데이터
  const storyData = {
    title: '마법의 숲 모험',
    currentText:
      '당신은 신비로운 마법의 숲 입구에 서 있습니다. 나무들이 속삭이는 소리가 들리고, 저 멀리 빛나는 무언가가 보입니다.',
    choices: [
      { id: 1, text: '빛나는 곳으로 다가간다' },
      { id: 2, text: '나무들의 속삭임을 들어본다' },
      { id: 3, text: '조심스럽게 주변을 살펴본다' },
    ],
    progress: 30,
  }

  return (
    <div style={containerStyles}>
      {/* Header */}
      <header style={headerStyles}>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            fontSize: '20px',
            cursor: 'pointer',
          }}
          onClick={() => window.history.back()}
        >
          ←
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 600, flex: 1 }}>
          {storyData.title}
        </h1>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            fontSize: '20px',
            cursor: 'pointer',
          }}
        >
          ⋮
        </button>
      </header>

      {/* Progress Bar */}
      <div style={progressBarStyles}>
        <div style={{ ...progressFillStyles, width: `${storyData.progress}%` }} />
      </div>

      {/* Content */}
      <main style={contentStyles}>
        {/* Story Text */}
        <div style={storyTextStyles}>{storyData.currentText}</div>

        {/* Choices */}
        <div style={choicesContainerStyles}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>
            선택하세요:
          </h3>
          {storyData.choices.map((choice) => (
            <Card
              key={choice.id}
              variant="outlined"
              onClick={() => console.log(`선택: ${choice.text}`)}
            >
              <div style={{ padding: '12px' }}>
                <span style={{ fontSize: '15px', color: '#374151' }}>
                  {choice.text}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
          <Button variant="outline" size="md" fullWidth>
            저장
          </Button>
          <Button variant="ghost" size="md" fullWidth>
            처음부터
          </Button>
        </div>
      </main>
    </div>
  )
}
