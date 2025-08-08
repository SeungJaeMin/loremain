package com.lorecraft.api.repository.impl;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.lorecraft.api.common.mockdata.MockDataProvider;
import com.lorecraft.api.repository.UserRepository;
import com.lorecraft.api.entity.EntityUser;

@Repository
public class UserRepositoryImpl implements UserRepository {
    
    private final MockDataProvider mockDataProvider;
    
    @Autowired
    public UserRepositoryImpl(MockDataProvider mockDataProvider) {
        this.mockDataProvider = mockDataProvider;
    }
    
    @Override
    public Optional<EntityUser> findByUsername(String username) {
        Map<Long, EntityUser> userData = mockDataProvider.getUserData();
        return userData.values().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst();
    }
    
    @Override
    public Optional<EntityUser> findByEmail(String email) {
        Map<Long, EntityUser> userData = mockDataProvider.getUserData();
        return userData.values().stream()
                .filter(user -> user.getEmail().equals(email))
                .findFirst();
    }
    
    @Override
    public Optional<EntityUser> findById(Long id) {
        Map<Long, EntityUser> userData = mockDataProvider.getUserData();
        return Optional.ofNullable(userData.get(id));
    }
    
    @Override
    public EntityUser save(EntityUser user) {
        Map<Long, EntityUser> userData = mockDataProvider.getUserData();
        
        if (user.getId() == null) {
            // New user
            Long newId = mockDataProvider.getNextUserId();
            setEntityId(user, newId);
            setCreatedAt(user, LocalDateTime.now());
        }
        
        setUpdatedAt(user, LocalDateTime.now());
        userData.put(user.getId(), user);
        
        return user;
    }
    
    @Override
    public boolean existsByUsername(String username) {
        return findByUsername(username).isPresent();
    }
    
    @Override
    public boolean existsByEmail(String email) {
        return findByEmail(email).isPresent();
    }
    
    // Utility methods using reflection
    private void setEntityId(EntityUser entity, Long id) {
        try {
            var idField = entity.getClass().getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(entity, id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set entity ID", e);
        }
    }
    
    private void setCreatedAt(EntityUser entity, LocalDateTime createdAt) {
        try {
            var createdAtField = entity.getClass().getSuperclass().getDeclaredField("createdAt");
            createdAtField.setAccessible(true);
            createdAtField.set(entity, createdAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set createdAt", e);
        }
    }
    
    private void setUpdatedAt(EntityUser entity, LocalDateTime updatedAt) {
        try {
            var updatedAtField = entity.getClass().getSuperclass().getDeclaredField("updatedAt");
            updatedAtField.setAccessible(true);
            updatedAtField.set(entity, updatedAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set updatedAt", e);
        }
    }
}