import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import { LanguageProvider } from './contexts/LanguageContext'

// 레이아웃 컴포넌트
import Layout from './components/Layout'

// 페이지 컴포넌트들
import HomePage from './pages/HomePage'
import NewsListPage from './pages/NewsListPage'
import NewsDetailPage from './pages/NewsDetailPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'

// 관리자 페이지들
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminNewsList from './pages/admin/AdminNewsList'
import AdminNewsEdit from './pages/admin/AdminNewsEdit'

function App() {
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
          <Route path="about" element={<AboutPage />} />
          <Route path="news" element={<NewsListPage />} />
          <Route path="news/:id" element={<NewsDetailPage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* 관리자 페이지들 */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/news" element={<AdminNewsList />} />
          <Route path="admin/news/new" element={<AdminNewsEdit />} />
          <Route path="admin/news/edit/:id" element={<AdminNewsEdit />} />
        </Route>
      </Routes>
    </Router>
    </LanguageProvider>
  )
}

export default App
