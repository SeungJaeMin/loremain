package com.lorecraft.api.repository;

import com.lorecraft.api.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    
    Page<News> findByPublishedTrue(Pageable pageable);
    
    Page<News> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    
    Page<News> findByTitleContainingIgnoreCaseAndPublishedTrue(String title, Pageable pageable);
    
    @Query("SELECT n FROM News n ORDER BY n.createdAt DESC")
    Page<News> findAllOrderByCreatedAtDesc(Pageable pageable);
}