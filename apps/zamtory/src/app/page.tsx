'use client'

import { Button, Card } from '@zamtory/ui'

export default function PlayerPage() {
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
    textAlign: 'center',
  }

  const contentStyles: React.CSSProperties = {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }

  const storyListStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
  }

  const tabBarStyles: React.CSSProperties = {
    display: 'flex',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
  }

  const tabStyles: React.CSSProperties = {
    flex: 1,
    padding: '12px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '14px',
    cursor: 'pointer',
  }

  // 샘플 스토리 데이터
  const sampleStories = [
    {
      id: 1,
      title: '마법의 숲 모험',
      description: '신비로운 마법의 숲에서 펼쳐지는 이야기',
      image: '/placeholder-story.jpg',
    },
    {
      id: 2,
      title: '우주 탐험가',
      description: '미지의 우주를 탐험하는 흥미진진한 여정',
      image: '/placeholder-story.jpg',
    },
    {
      id: 3,
      title: '타임머신 여행',
      description: '과거와 미래를 오가는 시간 여행 이야기',
      image: '/placeholder-story.jpg',
    },
  ]

  return (
    <div style={containerStyles}>
      {/* Header */}
      <header style={headerStyles}>
        <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>
          Zamtory
        </h1>
        <p style={{ fontSize: '14px', margin: '4px 0 0 0', opacity: 0.9 }}>
          나만의 인터랙티브 스토리
        </p>
      </header>

      {/* Content */}
      <main style={contentStyles}>
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
            추천 스토리
          </h2>
          <div style={storyListStyles}>
            {sampleStories.map((story) => (
              <Card
                key={story.id}
                title={story.title}
                description={story.description}
                variant="outlined"
                onClick={() => console.log(`스토리 ${story.id} 선택됨`)}
              >
                <div style={{ marginTop: '12px' }}>
                  <Button variant="primary" size="sm" fullWidth>
                    시작하기
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '24px' }}>
          <Button variant="outline" size="md" fullWidth>
            + 새 스토리 만들기
          </Button>
        </section>
      </main>

      {/* Tab Bar */}
      <nav style={tabBarStyles}>
        <button style={tabStyles}>
          <div>🏠</div>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>홈</div>
        </button>
        <button style={tabStyles}>
          <div>📚</div>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>내 스토리</div>
        </button>
        <button style={tabStyles}>
          <div>⭐</div>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>즐겨찾기</div>
        </button>
        <button style={tabStyles}>
          <div>⚙️</div>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>설정</div>
        </button>
      </nav>
    </div>
  )
}
