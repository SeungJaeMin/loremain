package com.lorecraft.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lorecraft.api.entity.CompanyInfo;

public interface CompanyRepository extends JpaRepository<CompanyInfo, Long> {
    
    @Query("SELECT c FROM CompanyInfo c ORDER BY c.id ASC")
    CompanyInfo findFirst();
}