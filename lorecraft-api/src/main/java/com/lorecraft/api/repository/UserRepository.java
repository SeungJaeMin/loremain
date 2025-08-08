package com.lorecraft.api.repository;

import java.util.Optional;

import org.springframework.data.repository.Repository;

import com.lorecraft.api.entity.EntityUser;

public interface UserRepository extends Repository<EntityUser, Long> {
    
    Optional<EntityUser> findByUsername(String username);
    
    Optional<EntityUser> findByEmail(String email);
    
    Optional<EntityUser> findById(Long id);
    
    EntityUser save(EntityUser user);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
}