import apiClient from '../api/axios';

export const companyService = {
  getCompanyInfo: async () => {
    try {
      const response = await apiClient.get('/company/info');
      return response.data;
    } catch (error) {
      console.error('회사 정보 조회 실패:', error);
      throw error;
    }
  },

  updateCompanyInfo: async (companyData) => {
    try {
      const response = await apiClient.put('/company/info', companyData);
      return response.data;
    } catch (error) {
      console.error('회사 정보 업데이트 실패:', error);
      throw error;
    }
  }
};