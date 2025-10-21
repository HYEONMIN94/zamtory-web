'use client'

import Link from 'next/link'
import { Button, Card, Badge } from '@zamtory/ui'

export default function StoriesPage() {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  }

  const headerStyles: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '20px 24px',
    borderBottom: '1px solid #e5e7eb',
  }

  const contentStyles: React.CSSProperties = {
    flex: 1,
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  }

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  }

  // 샘플 스토리 데이터
  const stories = [
    {
      id: 1,
      title: '마법의 숲 모험',
      description: '신비로운 마법의 숲에서 펼쳐지는 이야기',
      status: 'published',
      nodes: 15,
      lastModified: '2024-01-15',
    },
    {
      id: 2,
      title: '우주 탐험가',
      description: '미지의 우주를 탐험하는 흥미진진한 여정',
      status: 'draft',
      nodes: 8,
      lastModified: '2024-01-14',
    },
    {
      id: 3,
      title: '타임머신 여행',
      description: '과거와 미래를 오가는 시간 여행 이야기',
      status: 'published',
      nodes: 22,
      lastModified: '2024-01-13',
    },
  ]

  const getStatusBadge = (status: string) => {
    if (status === 'published') {
      return <Badge variant="success">게시됨</Badge>
    }
    return <Badge variant="warning">작성중</Badge>
  }

  return (
    <div style={containerStyles}>
      {/* Header */}
      <header style={headerStyles}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
              내 스토리
            </h1>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              총 {stories.length}개의 스토리
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="md">
                ← 에디터로 돌아가기
              </Button>
            </Link>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="md">
                + 새 스토리
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={contentStyles}>
        <div style={gridStyles}>
          {stories.map((story) => (
            <Card
              key={story.id}
              title={story.title}
              description={story.description}
              variant="elevated"
              onClick={() => console.log(`스토리 ${story.id} 클릭`)}
            >
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  {getStatusBadge(story.status)}
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>
                    노드 {story.nodes}개
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                  최근 수정: {story.lastModified}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <Button variant="primary" size="sm" fullWidth>
                    편집
                  </Button>
                  <Button variant="outline" size="sm" fullWidth>
                    미리보기
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
