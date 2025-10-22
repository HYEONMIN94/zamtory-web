'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { StatsGrid } from '@/components/dashboard/StatsGrid'
import { RecentActivity } from '@/components/dashboard/RecentActivity'

export default function AdminPage() {
  const stats = [
    { label: '전체 사용자', value: '1,234', change: '+12%' },
    { label: '활성 스토리', value: '567', change: '+5%' },
    { label: '오늘 방문자', value: '89', change: '+23%' },
    { label: '완료율', value: '78%', change: '+3%' },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Header title="대시보드" />

        <div className="flex-1 p-6 overflow-y-auto">
          <StatsGrid stats={stats} />
          <RecentActivity />
        </div>
      </main>
    </div>
  )
}
