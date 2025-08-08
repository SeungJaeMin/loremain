package com.lorecraft.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.Repository;

import com.lorecraft.api.entity.EntityNews;

public interface NewsRepository extends Repository<EntityNews, Long> {
    
    List<EntityNews> findAll();
    
    List<EntityNews> findByPublishedTrue();
    
    Optional<EntityNews> findById(Long id);
    
    List<EntityNews> findByTitleContainingIgnoreCase(String title);
    
    List<EntityNews> findByPublishedTrueAndTitleContainingIgnoreCase(String title);
    
    EntityNews save(EntityNews news);
    
    void deleteById(Long id);
    
    boolean existsById(Long id);
}