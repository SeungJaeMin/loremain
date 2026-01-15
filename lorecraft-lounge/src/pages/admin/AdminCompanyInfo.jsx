import { useState, useEffect } from 'react';
import { CONTACT } from '../../constants/textResources'
import { companyService } from '../../services/companyService';

function AdminCompanyInfo() {
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    description: '',
    vision: '',
    mission: '',
    establishedYear: '',
    ceo: '',
    address: '',
    phone: '',
    email: '',
    businessNumber: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      setLoading(true);
      const response = await companyService.getCompanyInfo();
      if (response.success) {
        setCompanyInfo(response.data);
      }
    } catch (error) {
      console.error('회사정보 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const response = await companyService.updateCompanyInfo(companyInfo);
      if (response.success) {
        alert('회사정보가 성공적으로 저장되었습니다.');
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('회사정보 저장 실패:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="page">
        <h1>📝 회사정보 관리</h1>
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>📝 회사정보 관리</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="name">회사명</label>
          <input
            type="text"
            id="name"
            value={companyInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">회사 소개</label>
          <textarea
            id="description"
            value={companyInfo.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows="5"
            placeholder="회사에 대한 간단한 소개를 입력하세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="vision">비전</label>
          <textarea
            id="vision"
            value={companyInfo.vision}
            onChange={(e) => handleInputChange('vision', e.target.value)}
            rows="3"
            placeholder="회사의 비전을 입력하세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mission">미션</label>
          <textarea
            id="mission"
            value={companyInfo.mission}
            onChange={(e) => handleInputChange('mission', e.target.value)}
            rows="3"
            placeholder="회사의 미션을 입력하세요"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="establishedYear">설립연도</label>
            <input
              type="number"
              id="establishedYear"
              value={companyInfo.establishedYear}
              onChange={(e) => handleInputChange('establishedYear', e.target.value)}
              min="1900"
              max="2030"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ceo">대표이사</label>
            <input
              type="text"
              id="ceo"
              value={companyInfo.ceo}
              onChange={(e) => handleInputChange('ceo', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">주소</label>
          <input
            type="text"
            id="address"
            value={companyInfo.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="회사 주소를 입력하세요"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">전화번호</label>
            <input
              type="tel"
              id="phone"
              value={companyInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="02-1234-5678"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={companyInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="${CONTACT.email}"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="businessNumber">사업자등록번호</label>
          <input
            type="text"
            id="businessNumber"
            value={companyInfo.businessNumber}
            onChange={(e) => handleInputChange('businessNumber', e.target.value)}
            placeholder="123-45-67890"
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? '저장 중...' : '저장하기'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .admin-form {
          max-width: 800px;
          margin: 20px 0;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-actions {
          margin-top: 30px;
          text-align: right;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .btn-primary {
          background-color: #007bff;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #0056b3;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading {
          text-align: center;
          padding: 20px;
          color: #666;
        }
      `}</style>
    </div>
  );
}

export default AdminCompanyInfo;