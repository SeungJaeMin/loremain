import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { newsService } from '../services/newsService';
import './NewsListPage.css';

function NewsListPage() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await newsService.getNewsList(currentPage, 10, false);
        if (response.success) {
          setNewsList(response.data.content);
          setTotalPages(response.data.totalPages);
        } else {
          setError('뉴스를 불러올 수 없습니다.');
        }
      } catch (err) {
        console.error('News API Error:', err);
        setError('서버 연결에 실패했습니다.');
        // 폴백 데이터 사용
        setNewsList([
          {
            id: 1,
            title: "로어크래프트, TCG Estela 글로벌 런칭 발표",
            author: "관리자",
            published: true,
            createdAt: "2025-07-30T09:00:00"
          },
          {
            id: 2,
            title: "2025 AGF(아시아 게임 페스티벌) 참가 확정",
            author: "이벤트팀",
            published: true,
            createdAt: "2025-07-28T14:30:00"
          },
          {
            id: 3,
            title: "제1회 TCG Estela Masters 대회 개최",
            author: "대회운영팀",
            published: true,
            createdAt: "2025-07-25T16:00:00"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="news-list-page">
        <div className="page-container">
          <div className="loading">뉴스를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error && newsList.length === 0) {
    return (
      <div className="news-list-page">
        <div className="page-container">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-list-page">
      <div className="page-container">
        <header className="page-header">
          <h1>뉴스</h1>
          <p>로어크래프트의 최신 소식을 확인하세요!</p>
        </header>

        {/* 전체 뉴스 */}
        <section className="all-news">
          <h2>📰 전체 뉴스</h2>
          {error && <div className="error-banner">⚠️ {error}</div>}
          <div className="news-list">
            {newsList.map(news => (
              <Link 
                key={news.id} 
                to={`/news/${news.id}`} 
                className="news-item"
              >
                <div className="news-content">
                  <div className="news-meta">
                    <span className="news-author">작성자: {news.author}</span>
                    <span className="news-date">{formatDate(news.createdAt)}</span>
                    {news.published && <span className="published-badge">Published</span>}
                  </div>
                  <h4>{news.title}</h4>
                </div>
              </Link>
            ))}
          </div>
          
          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
              >
                이전
              </button>
              <span>
                {currentPage + 1} / {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage >= totalPages - 1}
              >
                다음
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default NewsListPage;

