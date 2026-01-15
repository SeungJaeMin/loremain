import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import { LanguageProvider } from './contexts/LanguageContext'

// 레이아웃 컴포넌트
import Layout from './components/Layout'

// 페이지 컴포넌트들
import HomePage from './pages/HomePage'
import CompanyInfoPage from './pages/CompanyInfoPage'
import CompanyVisionPage from './pages/CompanyVisionPage'
import NewsListPage from './pages/NewsListPage'
import NewsDetailPage from './pages/NewsDetailPage'
import EventListPage from './pages/EventListPage'
import EventDetailPage from './pages/EventDetailPage'
import IRBookListPage from './pages/IRBookListPage'
import RecruitPage from './pages/RecruitPage'
import LoginPage from './pages/LoginPage'

// 관리자 페이지들
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCompanyInfo from './pages/admin/AdminCompanyInfo'
import AdminCompanyVision from './pages/admin/AdminCompanyVision'
import AdminNewsList from './pages/admin/AdminNewsList'
import AdminNewsEdit from './pages/admin/AdminNewsEdit'
import AdminEventList from './pages/admin/AdminEventList'
import AdminEventEdit from './pages/admin/AdminEventEdit'

function App() {
  // 임시 인증 상태 (나중에 Firebase Auth로 교체)
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <LanguageProvider>
    <Router>
      <Routes>
        {/* 로그인 페이지 (레이아웃 없음) */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* 메인 레이아웃을 사용하는 페이지들 */}
        <Route path="/" element={<Layout />}>
          
          {/* 일반 사용자 페이지들 */}
          <Route index element={<HomePage />} />
          <Route path="company/info" element={<CompanyInfoPage />} />
          <Route path="company/vision" element={<CompanyVisionPage />} />
          <Route path="news" element={<NewsListPage />} />
          <Route path="news/:id" element={<NewsDetailPage />} />
          <Route path="events" element={<EventListPage />} />
          <Route path="events/:id" element={<EventDetailPage />} />
          <Route path="recruit" element={<RecruitPage />} />
          <Route path="irbook" element={<IRBookListPage />} />
          
          {/* 관리자 페이지들 */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/company/info" element={<AdminCompanyInfo />} />
          <Route path="admin/company/vision" element={<AdminCompanyVision />} />
          <Route path="admin/news" element={<AdminNewsList />} />
          <Route path="admin/news/new" element={<AdminNewsEdit />} />
          <Route path="admin/news/edit/:id" element={<AdminNewsEdit />} />
          <Route path="admin/events" element={<AdminEventList />} />
          <Route path="admin/events/new" element={<AdminEventEdit />} />
          <Route path="admin/events/edit/:id" element={<AdminEventEdit />} />
        </Route>
      </Routes>
    </Router>
    </LanguageProvider>
  )
}

export default App