package com.lorecraft.api.repository.impl;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.lorecraft.api.common.mockdata.MockDataProvider;
import com.lorecraft.api.repository.CompanyRepository;
import com.lorecraft.api.entity.EntityCompany;

@Repository
public class CompanyRepositoryImpl implements CompanyRepository {
    
    private final MockDataProvider mockDataProvider;
    
    @Autowired
    public CompanyRepositoryImpl(MockDataProvider mockDataProvider) {
        this.mockDataProvider = mockDataProvider;
    }
    
    @Override
    public EntityCompany findFirst() {
        Map<Long, EntityCompany> companyData = mockDataProvider.getCompanyData();
        return companyData.values().stream()
                .findFirst()
                .orElse(null);
    }
    
    @Override
    public EntityCompany save(EntityCompany company) {
        Map<Long, EntityCompany> companyData = mockDataProvider.getCompanyData();
        
        if (company.getId() == null) {
            // New company
            Long newId = mockDataProvider.getNextCompanyId();
            setEntityId(company, newId);
            setCreatedAt(company, LocalDateTime.now());
        }
        
        setUpdatedAt(company, LocalDateTime.now());
        companyData.put(company.getId(), company);
        
        return company;
    }
    
    @Override
    public boolean existsBy() {
        Map<Long, EntityCompany> companyData = mockDataProvider.getCompanyData();
        return !companyData.isEmpty();
    }
    
    // Utility methods using reflection
    private void setEntityId(EntityCompany entity, Long id) {
        try {
            var idField = entity.getClass().getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(entity, id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set entity ID", e);
        }
    }
    
    private void setCreatedAt(EntityCompany entity, LocalDateTime createdAt) {
        try {
            var createdAtField = entity.getClass().getSuperclass().getDeclaredField("createdAt");
            createdAtField.setAccessible(true);
            createdAtField.set(entity, createdAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set createdAt", e);
        }
    }
    
    private void setUpdatedAt(EntityCompany entity, LocalDateTime updatedAt) {
        try {
            var updatedAtField = entity.getClass().getSuperclass().getDeclaredField("updatedAt");
            updatedAtField.setAccessible(true);
            updatedAtField.set(entity, updatedAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set updatedAt", e);
        }
    }
}