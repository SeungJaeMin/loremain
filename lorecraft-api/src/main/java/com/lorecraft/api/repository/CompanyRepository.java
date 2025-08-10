package com.lorecraft.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lorecraft.api.entity.EntityCompany;

public interface CompanyRepository extends JpaRepository<EntityCompany, Long> {
    
    @Query("SELECT c FROM EntityCompany c ORDER BY c.id ASC")
    EntityCompany findFirst();
}