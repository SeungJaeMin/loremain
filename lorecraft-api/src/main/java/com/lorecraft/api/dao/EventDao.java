package com.lorecraft.api.dao;

import com.lorecraft.api.entity.Event;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EventDao {
    
    List<Event> findAllEvents();
    
    List<Event> findPublishedEvents();
    
    List<Event> findUpcomingEvents(LocalDateTime currentTime);
    
    Optional<Event> findEventById(Long id);
    
    List<Event> searchEventsByTitle(String title);
    
    List<Event> searchPublishedEventsByTitle(String title);
    
    Event saveEvent(Event event);
    
    void deleteEvent(Long id);
    
    boolean existsById(Long id);
}