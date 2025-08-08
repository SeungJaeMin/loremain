package com.lorecraft.api.dao.impl;

import com.lorecraft.api.common.mockdata.MockDataProvider;
import com.lorecraft.api.dao.NewsDao;
import com.lorecraft.api.entity.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class NewsDaoImpl implements NewsDao {
    
    private final MockDataProvider mockDataProvider;
    
    @Autowired
    public NewsDaoImpl(MockDataProvider mockDataProvider) {
        this.mockDataProvider = mockDataProvider;
    }
    
    @Override
    public List<News> findAllNews() {
        Map<Long, News> newsData = mockDataProvider.getNewsData();
        return newsData.values().stream()
                .sorted((n1, n2) -> n2.getCreatedAt().compareTo(n1.getCreatedAt()))
                .collect(Collectors.toList());
    }
    
    @Override
    public List<News> findPublishedNews() {
        return findAllNews().stream()
                .filter(News::isPublished)
                .collect(Collectors.toList());
    }
    
    @Override
    public Optional<News> findNewsById(Long id) {
        Map<Long, News> newsData = mockDataProvider.getNewsData();
        return Optional.ofNullable(newsData.get(id));
    }
    
    @Override
    public List<News> searchNewsByTitle(String title) {
        return findAllNews().stream()
                .filter(news -> news.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }
    
    @Override
    public List<News> searchPublishedNewsByTitle(String title) {
        return findPublishedNews().stream()
                .filter(news -> news.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }
    
    @Override
    public News saveNews(News news) {
        Map<Long, News> newsData = mockDataProvider.getNewsData();
        
        if (news.getId() == null) {
            // New news
            Long newId = mockDataProvider.getNextNewsId();
            setEntityId(news, newId);
            setCreatedAt(news, LocalDateTime.now());
        }
        
        setUpdatedAt(news, LocalDateTime.now());
        newsData.put(news.getId(), news);
        
        return news;
    }
    
    @Override
    public void deleteNews(Long id) {
        Map<Long, News> newsData = mockDataProvider.getNewsData();
        newsData.remove(id);
    }
    
    @Override
    public boolean existsById(Long id) {
        Map<Long, News> newsData = mockDataProvider.getNewsData();
        return newsData.containsKey(id);
    }
    
    // Utility methods using reflection
    private void setEntityId(News entity, Long id) {
        try {
            var idField = entity.getClass().getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(entity, id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set entity ID", e);
        }
    }
    
    private void setCreatedAt(News entity, LocalDateTime createdAt) {
        try {
            var createdAtField = entity.getClass().getSuperclass().getDeclaredField("createdAt");
            createdAtField.setAccessible(true);
            createdAtField.set(entity, createdAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set createdAt", e);
        }
    }
    
    private void setUpdatedAt(News entity, LocalDateTime updatedAt) {
        try {
            var updatedAtField = entity.getClass().getSuperclass().getDeclaredField("updatedAt");
            updatedAtField.setAccessible(true);
            updatedAtField.set(entity, updatedAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set updatedAt", e);
        }
    }
}