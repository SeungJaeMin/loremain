import { Outlet } from 'react-router-dom'
import Header from './Header'

function Layout() {
  return (
    <div className="layout">
      {/* 고정 헤더 */}
      <Header />
      
      {/* 메인 콘텐츠 영역 */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout