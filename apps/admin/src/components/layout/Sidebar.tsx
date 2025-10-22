'use client'

interface NavItem {
  icon: string
  label: string
  active?: boolean
}

const navItems: NavItem[] = [
  { icon: '📊', label: '대시보드', active: true },
  { icon: '👥', label: '사용자 관리' },
  { icon: '📚', label: '스토리 관리' },
  { icon: '⚙️', label: '설정' },
]

export function Sidebar() {
  return (
    <aside className="w-[250px] bg-gray-800 text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Zamtory Admin</h1>
      </div>

      <nav className="p-4">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`
              p-3 px-4 mb-2 rounded-md cursor-pointer transition-colors
              ${item.active ? 'bg-gray-700' : 'hover:bg-gray-700'}
            `}
          >
            {item.icon} {item.label}
          </div>
        ))}
      </nav>
    </aside>
  )
}
