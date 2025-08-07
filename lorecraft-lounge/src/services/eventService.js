import apiClient from '../api/axios';

export const eventService = {
  getEventsList: async (page = 0, size = 10, includeUnpublished = false, upcomingOnly = false) => {
    try {
      const response = await apiClient.get('/events', {
        params: {
          page,
          size,
          includeUnpublished,
          upcomingOnly
        }
      });
      return response.data;
    } catch (error) {
      console.error('이벤트 목록 조회 실패:', error);
      throw error;
    }
  },

  getEventDetail: async (id) => {
    try {
      const response = await apiClient.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error('이벤트 상세 조회 실패:', error);
      throw error;
    }
  },

  searchEvents: async (keyword, page = 0, size = 10, publishedOnly = true) => {
    try {
      const response = await apiClient.get('/events/search', {
        params: {
          keyword,
          page,
          size,
          publishedOnly
        }
      });
      return response.data;
    } catch (error) {
      console.error('이벤트 검색 실패:', error);
      throw error;
    }
  },

  createEvent: async (eventData) => {
    try {
      const response = await apiClient.post('/events', eventData);
      return response.data;
    } catch (error) {
      console.error('이벤트 생성 실패:', error);
      throw error;
    }
  },

  updateEvent: async (id, eventData) => {
    try {
      const response = await apiClient.put(`/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      console.error('이벤트 업데이트 실패:', error);
      throw error;
    }
  },

  deleteEvent: async (id) => {
    try {
      const response = await apiClient.delete(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error('이벤트 삭제 실패:', error);
      throw error;
    }
  },

  registerForEvent: async (id) => {
    try {
      const response = await apiClient.post(`/events/${id}/register`);
      return response.data;
    } catch (error) {
      console.error('이벤트 등록 실패:', error);
      throw error;
    }
  },

  cancelRegistration: async (id) => {
    try {
      const response = await apiClient.post(`/events/${id}/cancel`);
      return response.data;
    } catch (error) {
      console.error('이벤트 등록 취소 실패:', error);
      throw error;
    }
  }
};