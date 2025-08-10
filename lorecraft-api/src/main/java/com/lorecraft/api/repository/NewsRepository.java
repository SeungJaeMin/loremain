package com.lorecraft.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lorecraft.api.entity.EntityNews;

public interface NewsRepository extends JpaRepository<EntityNews, Long> {
    
    List<EntityNews> findByPublishedTrue();
    
    List<EntityNews> findByTitleContainingIgnoreCase(String title);
    
    List<EntityNews> findByPublishedTrueAndTitleContainingIgnoreCase(String title);
}