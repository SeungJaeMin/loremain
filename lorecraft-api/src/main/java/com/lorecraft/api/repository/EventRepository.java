package com.lorecraft.api.repository;

import com.lorecraft.api.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    Page<Event> findByPublishedTrue(Pageable pageable);
    
    Page<Event> findByEventDateAfter(LocalDateTime date, Pageable pageable);
    
    Page<Event> findByEventDateAfterAndPublishedTrue(LocalDateTime date, Pageable pageable);
    
    Page<Event> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    
    Page<Event> findByTitleContainingIgnoreCaseAndPublishedTrue(String title, Pageable pageable);
    
    @Query("SELECT e FROM Event e WHERE e.published = true ORDER BY e.eventDate ASC")
    Page<Event> findPublishedEventsOrderByEventDate(Pageable pageable);
}