'use client'

import { Card, Badge, Button } from '@zamtory/ui'

export default function AdminPage() {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  }

  const sidebarStyles: React.CSSProperties = {
    width: '250px',
    backgroundColor: '#1f2937',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
  }

  const sidebarHeaderStyles: React.CSSProperties = {
    padding: '24px',
    borderBottom: '1px solid #374151',
  }

  const navStyles: React.CSSProperties = {
    padding: '16px',
  }

  const navItemStyles: React.CSSProperties = {
    padding: '12px 16px',
    marginBottom: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  }

  const mainStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }

  const headerStyles: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '16px 24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const contentStyles: React.CSSProperties = {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
  }

  const statsGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '24px',
  }

  // 샘플 데이터
  const stats = [
    { label: '전체 사용자', value: '1,234', change: '+12%' },
    { label: '활성 스토리', value: '567', change: '+5%' },
    { label: '오늘 방문자', value: '89', change: '+23%' },
    { label: '완료율', value: '78%', change: '+3%' },
  ]

  return (
    <div style={containerStyles}>
      {/* Sidebar */}
      <aside style={sidebarStyles}>
        <div style={sidebarHeaderStyles}>
          <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>
            Zamtory Admin
          </h1>
        </div>
        <nav style={navStyles}>
          <div
            style={{ ...navItemStyles, backgroundColor: '#374151' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4b5563'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#374151'
            }}
          >
            📊 대시보드
          </div>
          <div
            style={navItemStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#374151'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            👥 사용자 관리
          </div>
          <div
            style={navItemStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#374151'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            📚 스토리 관리
          </div>
          <div
            style={navItemStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#374151'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            ⚙️ 설정
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={mainStyles}>
        {/* Header */}
        <header style={headerStyles}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>
            대시보드
          </h2>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Badge variant="success">활성</Badge>
            <Button variant="outline" size="sm">
              새로고침
            </Button>
          </div>
        </header>

        {/* Content */}
        <div style={contentStyles}>
          {/* Stats Grid */}
          <div style={statsGridStyles}>
            {stats.map((stat, index) => (
              <Card key={index} variant="elevated">
                <div style={{ padding: '8px' }}>
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      marginBottom: '8px',
                    }}
                  >
                    {stat.label}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 700 }}>
                      {stat.value}
                    </div>
                    <Badge variant="success" size="sm">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card title="최근 활동" variant="elevated">
            <div style={{ padding: '16px 0' }}>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                최근 활동 내역이 여기에 표시됩니다.
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
