package com.lorecraft.api.dao.impl;

import com.lorecraft.api.common.mockdata.MockDataProvider;
import com.lorecraft.api.dao.EventDao;
import com.lorecraft.api.entity.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class EventDaoImpl implements EventDao {
    
    private final MockDataProvider mockDataProvider;
    
    @Autowired
    public EventDaoImpl(MockDataProvider mockDataProvider) {
        this.mockDataProvider = mockDataProvider;
    }
    
    @Override
    public List<Event> findAllEvents() {
        Map<Long, Event> eventData = mockDataProvider.getEventData();
        return eventData.values().stream()
                .sorted((e1, e2) -> e1.getEventDate().compareTo(e2.getEventDate()))
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Event> findPublishedEvents() {
        return findAllEvents().stream()
                .filter(Event::isPublished)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Event> findUpcomingEvents(LocalDateTime currentTime) {
        return findPublishedEvents().stream()
                .filter(event -> event.getEventDate().isAfter(currentTime))
                .collect(Collectors.toList());
    }
    
    @Override
    public Optional<Event> findEventById(Long id) {
        Map<Long, Event> eventData = mockDataProvider.getEventData();
        return Optional.ofNullable(eventData.get(id));
    }
    
    @Override
    public List<Event> searchEventsByTitle(String title) {
        return findAllEvents().stream()
                .filter(event -> event.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Event> searchPublishedEventsByTitle(String title) {
        return findPublishedEvents().stream()
                .filter(event -> event.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }
    
    @Override
    public Event saveEvent(Event event) {
        Map<Long, Event> eventData = mockDataProvider.getEventData();
        
        if (event.getId() == null) {
            // New event
            Long newId = mockDataProvider.getNextEventId();
            setEntityId(event, newId);
            setCreatedAt(event, LocalDateTime.now());
        }
        
        setUpdatedAt(event, LocalDateTime.now());
        eventData.put(event.getId(), event);
        
        return event;
    }
    
    @Override
    public void deleteEvent(Long id) {
        Map<Long, Event> eventData = mockDataProvider.getEventData();
        eventData.remove(id);
    }
    
    @Override
    public boolean existsById(Long id) {
        Map<Long, Event> eventData = mockDataProvider.getEventData();
        return eventData.containsKey(id);
    }
    
    // Utility methods using reflection
    private void setEntityId(Event entity, Long id) {
        try {
            var idField = entity.getClass().getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(entity, id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set entity ID", e);
        }
    }
    
    private void setCreatedAt(Event entity, LocalDateTime createdAt) {
        try {
            var createdAtField = entity.getClass().getSuperclass().getDeclaredField("createdAt");
            createdAtField.setAccessible(true);
            createdAtField.set(entity, createdAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set createdAt", e);
        }
    }
    
    private void setUpdatedAt(Event entity, LocalDateTime updatedAt) {
        try {
            var updatedAtField = entity.getClass().getSuperclass().getDeclaredField("updatedAt");
            updatedAtField.setAccessible(true);
            updatedAtField.set(entity, updatedAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set updatedAt", e);
        }
    }
}