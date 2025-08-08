package com.lorecraft.api.repository.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.lorecraft.api.common.mockdata.MockDataProvider;
import com.lorecraft.api.repository.EventRepository;
import com.lorecraft.api.entity.EntityEvent;

@Repository
public class EventRepositoryImpl implements EventRepository {
    
    private final MockDataProvider mockDataProvider;
    
    @Autowired
    public EventRepositoryImpl(MockDataProvider mockDataProvider) {
        this.mockDataProvider = mockDataProvider;
    }
    
    @Override
    public List<EntityEvent> findAll() {
        Map<Long, EntityEvent> eventData = mockDataProvider.getEventData();
        return eventData.values().stream()
                .sorted((e1, e2) -> e1.getEventDate().compareTo(e2.getEventDate()))
                .collect(Collectors.toList());
    }
    
    @Override
    public List<EntityEvent> findByPublishedTrue() {
        return findAll().stream()
                .filter(EntityEvent::isPublished)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<EntityEvent> findByEventDateAfter(LocalDateTime currentTime) {
        return findByPublishedTrue().stream()
                .filter(event -> event.getEventDate().isAfter(currentTime))
                .collect(Collectors.toList());
    }
    
    @Override
    public Optional<EntityEvent> findById(Long id) {
        Map<Long, EntityEvent> eventData = mockDataProvider.getEventData();
        return Optional.ofNullable(eventData.get(id));
    }
    
    @Override
    public List<EntityEvent> findByTitleContainingIgnoreCase(String title) {
        return findAll().stream()
                .filter(event -> event.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }
    
    @Override
    public List<EntityEvent> findByPublishedTrueAndTitleContainingIgnoreCase(String title) {
        return findByPublishedTrue().stream()
                .filter(event -> event.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }
    
    @Override
    public EntityEvent save(EntityEvent event) {
        Map<Long, EntityEvent> eventData = mockDataProvider.getEventData();
        
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
    public void deleteById(Long id) {
        Map<Long, EntityEvent> eventData = mockDataProvider.getEventData();
        eventData.remove(id);
    }
    
    @Override
    public boolean existsById(Long id) {
        Map<Long, EntityEvent> eventData = mockDataProvider.getEventData();
        return eventData.containsKey(id);
    }
    
    // Utility methods using reflection
    private void setEntityId(EntityEvent entity, Long id) {
        try {
            var idField = entity.getClass().getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(entity, id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set entity ID", e);
        }
    }
    
    private void setCreatedAt(EntityEvent entity, LocalDateTime createdAt) {
        try {
            var createdAtField = entity.getClass().getSuperclass().getDeclaredField("createdAt");
            createdAtField.setAccessible(true);
            createdAtField.set(entity, createdAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set createdAt", e);
        }
    }
    
    private void setUpdatedAt(EntityEvent entity, LocalDateTime updatedAt) {
        try {
            var updatedAtField = entity.getClass().getSuperclass().getDeclaredField("updatedAt");
            updatedAtField.setAccessible(true);
            updatedAtField.set(entity, updatedAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set updatedAt", e);
        }
    }
}