import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { newsService } from '../services/newsService';

function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const response = await newsService.getNewsDetail(id);
        if (response.success) {
          setNews(response.data);
        } else {
          setError('뉴스를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        console.error('뉴스 상세 조회 오류:', err);
        setError('뉴스를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="news-detail-page">
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-detail-page">
        <Link to="/news" className="back-button">
          ← 뉴스 목록으로 돌아가기
        </Link>
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="news-detail-page">
        <Link to="/news" className="back-button">
          ← 뉴스 목록으로 돌아가기
        </Link>
        <div className="error">뉴스를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="news-detail-page">
      <Link to="/news" className="back-button">
        ← 뉴스 목록으로 돌아가기
      </Link>
      <div className="detail-header">
        <h1 className="detail-title">{news.title}</h1>
        <div className="detail-meta">
          {new Date(news.createdAt).toLocaleDateString('ko-KR')} | {news.author || '로어크래프트'}
        </div>
      </div>
      {news.imageUrl && (
        <img src={news.imageUrl} alt={news.title} className="detail-image" />
      )}
      <div
        className="detail-content"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
    </div>
  );
}

export default NewsDetailPage;