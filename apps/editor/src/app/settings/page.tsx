'use client'

import Link from 'next/link'
import { Button, Card, Input, Select, SelectOption } from '@zamtory/ui'

export default function SettingsPage() {
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
    maxWidth: '800px',
    margin: '0 auto',
    width: '100%',
  }

  const sectionStyles: React.CSSProperties = {
    marginBottom: '24px',
  }

  const languageOptions: SelectOption[] = [
    { value: 'ko', label: '한국어' },
    { value: 'en', label: 'English' },
    { value: 'ja', label: '日本語' },
  ]

  const themeOptions: SelectOption[] = [
    { value: 'light', label: '라이트 모드' },
    { value: 'dark', label: '다크 모드' },
    { value: 'auto', label: '시스템 설정' },
  ]

  return (
    <div style={containerStyles}>
      {/* Header */}
      <header style={headerStyles}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700 }}>설정</h1>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="md">
              ← 에디터로 돌아가기
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main style={contentStyles}>
        {/* Profile Settings */}
        <div style={sectionStyles}>
          <Card title="프로필 설정" variant="elevated">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 0' }}>
              <Input
                label="이름"
                placeholder="이름을 입력하세요"
                fullWidth
              />
              <Input
                label="이메일"
                type="email"
                placeholder="email@example.com"
                fullWidth
              />
              <Input
                label="프로필 소개"
                placeholder="자기소개를 입력하세요"
                fullWidth
              />
            </div>
          </Card>
        </div>

        {/* Editor Settings */}
        <div style={sectionStyles}>
          <Card title="에디터 설정" variant="elevated">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 0' }}>
              <Select
                label="언어"
                options={languageOptions}
                value="ko"
                placeholder="언어를 선택하세요"
                fullWidth
              />
              <Select
                label="테마"
                options={themeOptions}
                value="light"
                placeholder="테마를 선택하세요"
                fullWidth
              />
              <div>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '8px' }}>
                  자동 저장
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" defaultChecked />
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    5분마다 자동으로 저장
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Notification Settings */}
        <div style={sectionStyles}>
          <Card title="알림 설정" variant="elevated">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" defaultChecked />
                <span style={{ fontSize: '14px', color: '#374151' }}>
                  이메일 알림 받기
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" defaultChecked />
                <span style={{ fontSize: '14px', color: '#374151' }}>
                  브라우저 알림 받기
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" />
                <span style={{ fontSize: '14px', color: '#374151' }}>
                  마케팅 정보 수신
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button variant="outline" size="md">
            취소
          </Button>
          <Button variant="primary" size="md">
            저장
          </Button>
        </div>
      </main>
    </div>
  )
}
