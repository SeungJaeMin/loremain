import apiClient from '../api/axios';

export const newsService = {
  getNewsList: async (page = 0, size = 10, includeUnpublished = false) => {
    try {
      const response = await apiClient.get('/news', {
        params: {
          page,
          size,
          includeUnpublished
        }
      });
      return response.data;
    } catch (error) {
      console.error('뉴스 목록 조회 실패:', error);
      throw error;
    }
  },

  getNewsDetail: async (id) => {
    try {
      const response = await apiClient.get(`/news/${id}`);
      return response.data;
    } catch (error) {
      console.error('뉴스 상세 조회 실패:', error);
      throw error;
    }
  },

  searchNews: async (keyword, page = 0, size = 10, publishedOnly = true) => {
    try {
      const response = await apiClient.get('/news/search', {
        params: {
          keyword,
          page,
          size,
          publishedOnly
        }
      });
      return response.data;
    } catch (error) {
      console.error('뉴스 검색 실패:', error);
      throw error;
    }
  },

  createNews: async (newsData) => {
    try {
      const response = await apiClient.post('/news', newsData);
      return response.data;
    } catch (error) {
      console.error('뉴스 생성 실패:', error);
      throw error;
    }
  },

  updateNews: async (id, newsData) => {
    try {
      const response = await apiClient.put(`/news/${id}`, newsData);
      return response.data;
    } catch (error) {
      console.error('뉴스 업데이트 실패:', error);
      throw error;
    }
  },

  deleteNews: async (id) => {
    try {
      const response = await apiClient.delete(`/news/${id}`);
      return response.data;
    } catch (error) {
      console.error('뉴스 삭제 실패:', error);
      throw error;
    }
  },

  publishNews: async (id) => {
    try {
      const response = await apiClient.post(`/news/${id}/publish`);
      return response.data;
    } catch (error) {
      console.error('뉴스 게시 실패:', error);
      throw error;
    }
  }
};