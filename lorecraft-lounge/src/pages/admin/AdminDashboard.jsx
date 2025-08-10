import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>🎛️ 관리자 대시보드</h1>
      <p>로어크래프트 웹사이트 관리 도구입니다.</p>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">🏢</div>
          <h3>회사 정보 관리</h3>
          <p>회사 소개, 비전, 연락처 등을 관리합니다.</p>
          <div className="card-actions">
            <Link to="/admin/company/info" className="btn btn-primary">
              회사 정보 수정
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📰</div>
          <h3>뉴스 관리</h3>
          <p>뉴스 작성, 수정, 삭제 및 게시 상태를 관리합니다.</p>
          <div className="card-actions">
            <Link to="/admin/news" className="btn btn-primary">
              뉴스 관리
            </Link>
            <Link to="/admin/news/new" className="btn btn-outline">
              새 뉴스 작성
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🎯</div>
          <h3>이벤트 관리</h3>
          <p>이벤트 작성, 수정, 삭제 및 게시 상태를 관리합니다.</p>
          <div className="card-actions">
            <Link to="/admin/events" className="btn btn-primary">
              이벤트 관리
            </Link>
            <Link to="/admin/events/new" className="btn btn-outline">
              새 이벤트 작성
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">👥</div>
          <h3>사용자 관리</h3>
          <p>사용자 계정 및 권한을 관리합니다.</p>
          <div className="card-actions">
            <button className="btn btn-secondary" disabled>
              준비 중
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📊</div>
          <h3>통계 및 분석</h3>
          <p>웹사이트 방문 통계와 사용자 행동을 분석합니다.</p>
          <div className="card-actions">
            <button className="btn btn-secondary" disabled>
              준비 중
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">⚙️</div>
          <h3>시스템 설정</h3>
          <p>사이트 설정 및 시스템 관리를 수행합니다.</p>
          <div className="card-actions">
            <button className="btn btn-secondary" disabled>
              준비 중
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .admin-dashboard h1 {
          margin-bottom: 10px;
          color: #343a40;
        }

        .admin-dashboard > p {
          color: #6c757d;
          margin-bottom: 40px;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .dashboard-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 1px solid #e9ecef;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .dashboard-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .card-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: block;
        }

        .dashboard-card h3 {
          margin: 0 0 12px 0;
          color: #343a40;
          font-size: 20px;
        }

        .dashboard-card p {
          color: #6c757d;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .card-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 8px 16px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid transparent;
          display: inline-block;
          transition: all 0.2s;
        }

        .btn-primary {
          background-color: #007bff;
          color: white;
          border-color: #007bff;
        }

        .btn-primary:hover {
          background-color: #0056b3;
          border-color: #0056b3;
        }

        .btn-outline {
          background-color: transparent;
          color: #007bff;
          border-color: #007bff;
        }

        .btn-outline:hover {
          background-color: #007bff;
          color: white;
        }

        .btn-secondary {
          background-color: #6c757d;
          color: white;
          border-color: #6c757d;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn:disabled:hover {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
export default AdminDashboard;