package com.lorecraft.api.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.Repository;

import com.lorecraft.api.entity.EntityEvent;

public interface EventRepository extends Repository<EntityEvent, Long> {
    
    List<EntityEvent> findAll();
    
    List<EntityEvent> findByPublishedTrue();
    
    List<EntityEvent> findByEventDateAfter(LocalDateTime currentTime);
    
    Optional<EntityEvent> findById(Long id);
    
    List<EntityEvent> findByTitleContainingIgnoreCase(String title);
    
    List<EntityEvent> findByPublishedTrueAndTitleContainingIgnoreCase(String title);
    
    EntityEvent save(EntityEvent event);
    
    void deleteById(Long id);
    
    boolean existsById(Long id);
}