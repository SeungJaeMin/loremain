package com.lorecraft.api.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lorecraft.api.entity.EntityEvent;

public interface EventRepository extends JpaRepository<EntityEvent, Long> {
    
    List<EntityEvent> findByPublishedTrue();
    
    List<EntityEvent> findByEventDateAfter(LocalDateTime currentTime);
    
    List<EntityEvent> findByTitleContainingIgnoreCase(String title);
    
    List<EntityEvent> findByPublishedTrueAndTitleContainingIgnoreCase(String title);
}