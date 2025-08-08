package com.lorecraft.api.dao.impl;

import com.lorecraft.api.common.mockdata.MockDataProvider;
import com.lorecraft.api.dao.UserDao;
import com.lorecraft.api.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@Repository
public class UserDaoImpl implements UserDao {
    
    private final MockDataProvider mockDataProvider;
    
    @Autowired
    public UserDaoImpl(MockDataProvider mockDataProvider) {
        this.mockDataProvider = mockDataProvider;
    }
    
    @Override
    public Optional<User> findByUsername(String username) {
        Map<Long, User> userData = mockDataProvider.getUserData();
        return userData.values().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst();
    }
    
    @Override
    public Optional<User> findByEmail(String email) {
        Map<Long, User> userData = mockDataProvider.getUserData();
        return userData.values().stream()
                .filter(user -> user.getEmail().equals(email))
                .findFirst();
    }
    
    @Override
    public Optional<User> findById(Long id) {
        Map<Long, User> userData = mockDataProvider.getUserData();
        return Optional.ofNullable(userData.get(id));
    }
    
    @Override
    public User saveUser(User user) {
        Map<Long, User> userData = mockDataProvider.getUserData();
        
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
    private void setEntityId(User entity, Long id) {
        try {
            var idField = entity.getClass().getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(entity, id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set entity ID", e);
        }
    }
    
    private void setCreatedAt(User entity, LocalDateTime createdAt) {
        try {
            var createdAtField = entity.getClass().getSuperclass().getDeclaredField("createdAt");
            createdAtField.setAccessible(true);
            createdAtField.set(entity, createdAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set createdAt", e);
        }
    }
    
    private void setUpdatedAt(User entity, LocalDateTime updatedAt) {
        try {
            var updatedAtField = entity.getClass().getSuperclass().getDeclaredField("updatedAt");
            updatedAtField.setAccessible(true);
            updatedAtField.set(entity, updatedAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set updatedAt", e);
        }
    }
}