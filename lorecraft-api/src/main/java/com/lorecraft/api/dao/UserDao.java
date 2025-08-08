package com.lorecraft.api.dao;

import com.lorecraft.api.entity.User;

import java.util.Optional;

public interface UserDao {
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findById(Long id);
    
    User saveUser(User user);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
}