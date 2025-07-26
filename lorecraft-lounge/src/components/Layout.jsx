import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'


function Layout({ user, isAdmin }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {/* 헤더 */}
      <Header 
        user={user} 
        isAdmin={isAdmin}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="layout-container">
        {/* 사이드바 */}
        <Sidebar 
          isAdmin={isAdmin}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        {/* 메인 콘텐츠 영역 */}
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Outlet /> {/* 여기에 각 페이지 컴포넌트가 렌더링됨 */}
        </main>
      </div>
    </div>
  )
}

export default Layout