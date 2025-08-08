package com.lorecraft.api.dao;

import com.lorecraft.api.entity.News;

import java.util.List;
import java.util.Optional;

public interface NewsDao {
    
    List<News> findAllNews();
    
    List<News> findPublishedNews();
    
    Optional<News> findNewsById(Long id);
    
    List<News> searchNewsByTitle(String title);
    
    List<News> searchPublishedNewsByTitle(String title);
    
    News saveNews(News news);
    
    void deleteNews(Long id);
    
    boolean existsById(Long id);
}