package com.lorecraft.api.repository.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.lorecraft.api.common.mockdata.MockDataProvider;
import com.lorecraft.api.repository.NewsRepository;
import com.lorecraft.api.entity.EntityNews;

@Repository
public class NewsRepositoryImpl implements NewsRepository {
    
    private final MockDataProvider mockDataProvider;
    
    @Autowired
    public NewsRepositoryImpl(MockDataProvider mockDataProvider) {
        this.mockDataProvider = mockDataProvider;
    }
    
    @Override
    public List<EntityNews> findAll() {
        Map<Long, EntityNews> newsData = mockDataProvider.getNewsData();
        return newsData.values().stream()
                .sorted((n1, n2) -> n2.getCreatedAt().compareTo(n1.getCreatedAt()))
                .collect(Collectors.toList());
    }
    
    @Override
    public List<EntityNews> findByPublishedTrue() {
        return findAll().stream()
                .filter(EntityNews::isPublished)
                .collect(Collectors.toList());
    }
    
    @Override
    public Optional<EntityNews> findById(Long id) {
        Map<Long, EntityNews> newsData = mockDataProvider.getNewsData();
        return Optional.ofNullable(newsData.get(id));
    }
    
    @Override
    public List<EntityNews> findByTitleContainingIgnoreCase(String title) {
        return findAll().stream()
                .filter(news -> news.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }
    
    @Override
    public List<EntityNews> findByPublishedTrueAndTitleContainingIgnoreCase(String title) {
        return findByPublishedTrue().stream()
                .filter(news -> news.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }
    
    @Override
    public EntityNews save(EntityNews news) {
        Map<Long, EntityNews> newsData = mockDataProvider.getNewsData();
        
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
    public void deleteById(Long id) {
        Map<Long, EntityNews> newsData = mockDataProvider.getNewsData();
        newsData.remove(id);
    }
    
    @Override
    public boolean existsById(Long id) {
        Map<Long, EntityNews> newsData = mockDataProvider.getNewsData();
        return newsData.containsKey(id);
    }
    
    // Utility methods using reflection
    private void setEntityId(EntityNews entity, Long id) {
        try {
            var idField = entity.getClass().getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(entity, id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set entity ID", e);
        }
    }
    
    private void setCreatedAt(EntityNews entity, LocalDateTime createdAt) {
        try {
            var createdAtField = entity.getClass().getSuperclass().getDeclaredField("createdAt");
            createdAtField.setAccessible(true);
            createdAtField.set(entity, createdAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set createdAt", e);
        }
    }
    
    private void setUpdatedAt(EntityNews entity, LocalDateTime updatedAt) {
        try {
            var updatedAtField = entity.getClass().getSuperclass().getDeclaredField("updatedAt");
            updatedAtField.setAccessible(true);
            updatedAtField.set(entity, updatedAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set updatedAt", e);
        }
    }
}