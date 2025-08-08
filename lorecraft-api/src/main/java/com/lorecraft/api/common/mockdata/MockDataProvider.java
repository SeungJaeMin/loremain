package com.lorecraft.api.common.mockdata;

import com.lorecraft.api.entity.*;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class MockDataProvider {
    
    // Thread-safe collections for mock data
    private final Map<Long, Company> companyData = new ConcurrentHashMap<>();
    private final Map<Long, News> newsData = new ConcurrentHashMap<>();
    private final Map<Long, Event> eventData = new ConcurrentHashMap<>();
    private final Map<Long, User> userData = new ConcurrentHashMap<>();
    
    // ID generators
    private final AtomicLong companyIdGenerator = new AtomicLong(1);
    private final AtomicLong newsIdGenerator = new AtomicLong(1);
    private final AtomicLong eventIdGenerator = new AtomicLong(1);
    private final AtomicLong userIdGenerator = new AtomicLong(1);
    
    @PostConstruct
    public void initializeData() {
        initializeCompanyData();
        initializeNewsData();
        initializeEventData();
        initializeUserData();
    }
    
    private void initializeCompanyData() {
        Company company = createCompany(
            "LORECRAFT",
            "2025year", 
            "Hong Gil-dong",
            "Gyeonggi Suwon Somewhere 123",
            "IP Development, TCG, Community, Content Platform Service",
            "5people",
            "N/A"
        );
        companyData.put(1L, company);
    }
    
    private void initializeNewsData() {
        newsData.put(1L, createNews(
            "LORECRAFT Official Launch",
            "LORECRAFT providing new entertainment experiences with creative content and innovative technology has been officially launched.",
            "Administrator",
            true
        ));
        
        newsData.put(2L, createNews(
            "New TCG Game Development Started",
            "We have started developing new TCG games using unique IP.",
            "Development Team",
            true
        ));
        
        newsData.put(3L, createNews(
            "Community Platform Open Beta",
            "Open beta of online community platform for gamers and fans begins.",
            "Community Team",
            false
        ));
    }
    
    private void initializeEventData() {
        eventData.put(1L, createEvent(
            "LORECRAFT Launch Event",
            "Join our launch event for a new beginning!",
            LocalDateTime.of(2025, 9, 1, 14, 0),
            "Seoul Gangnam-gu",
            100,
            0,
            true,
            true
        ));
        
        eventData.put(2L, createEvent(
            "TCG Tournament",
            "Tournament to find the best TCG player.",
            LocalDateTime.of(2025, 10, 15, 10, 0),
            "Busan Haeundae-gu",
            50,
            0,
            true,
            true
        ));
        
        eventData.put(3L, createEvent(
            "Community Meeting",
            "Offline meeting with online community members",
            LocalDateTime.of(2025, 8, 20, 19, 0),
            "Online",
            null,
            0,
            false,
            false
        ));
    }
    
    private void initializeUserData() {
        userData.put(1L, createUser(
            "admin",
            "$2a$10$encoded.password.hash",
            "admin@lorecraft.com",
            User.Role.ADMIN
        ));
        
        userData.put(2L, createUser(
            "user",
            "$2a$10$encoded.password.hash",
            "user@lorecraft.com",
            User.Role.USER
        ));
    }
    
    // Factory methods
    private Company createCompany(String name, String established, String ceo, 
                                 String address, String business, String employees, String capital) {
        Company company = new Company(name, established, ceo, address, business, employees, capital);
        setEntityId(company, companyIdGenerator.getAndIncrement());
        setEntityTimestamps(company);
        return company;
    }
    
    private News createNews(String title, String content, String author, boolean published) {
        News news = new News(title, content, author);
        setEntityId(news, newsIdGenerator.getAndIncrement());
        setEntityTimestamps(news);
        if (published) {
            news.publish();
        }
        return news;
    }
    
    private Event createEvent(String title, String content, LocalDateTime eventDate, 
                             String location, Integer maxParticipants, Integer currentParticipants,
                             boolean registrationRequired, boolean published) {
        Event event = new Event(title, content, eventDate, location, maxParticipants, registrationRequired);
        setEntityId(event, eventIdGenerator.getAndIncrement());
        setEntityTimestamps(event);
        if (published) {
            event.publish();
        }
        return event;
    }
    
    private User createUser(String username, String password, String email, User.Role role) {
        User user = new User(username, password, email, role);
        setEntityId(user, userIdGenerator.getAndIncrement());
        setEntityTimestamps(user);
        return user;
    }
    
    // Utility methods using reflection to set private fields
    private void setEntityId(Object entity, Long id) {
        try {
            var idField = entity.getClass().getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(entity, id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set entity ID", e);
        }
    }
    
    private void setEntityTimestamps(Object entity) {
        try {
            LocalDateTime now = LocalDateTime.now();
            
            var createdAtField = entity.getClass().getSuperclass().getDeclaredField("createdAt");
            createdAtField.setAccessible(true);
            createdAtField.set(entity, now);
            
            var updatedAtField = entity.getClass().getSuperclass().getDeclaredField("updatedAt");
            updatedAtField.setAccessible(true);
            updatedAtField.set(entity, now);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set entity timestamps", e);
        }
    }
    
    // Getter methods for DAO implementations
    public Map<Long, Company> getCompanyData() {
        return new ConcurrentHashMap<>(companyData);
    }
    
    public Map<Long, News> getNewsData() {
        return new ConcurrentHashMap<>(newsData);
    }
    
    public Map<Long, Event> getEventData() {
        return new ConcurrentHashMap<>(eventData);
    }
    
    public Map<Long, User> getUserData() {
        return new ConcurrentHashMap<>(userData);
    }
    
    // ID generators for new entities
    public Long getNextCompanyId() {
        return companyIdGenerator.incrementAndGet();
    }
    
    public Long getNextNewsId() {
        return newsIdGenerator.incrementAndGet();
    }
    
    public Long getNextEventId() {
        return eventIdGenerator.incrementAndGet();
    }
    
    public Long getNextUserId() {
        return userIdGenerator.incrementAndGet();
    }
}