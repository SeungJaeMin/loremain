package com.lorecraft.api.dao.impl;

import com.lorecraft.api.common.mockdata.MockDataProvider;
import com.lorecraft.api.dao.CompanyDao;
import com.lorecraft.api.entity.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Map;

@Repository
public class CompanyDaoImpl implements CompanyDao {
    
    private final MockDataProvider mockDataProvider;
    
    @Autowired
    public CompanyDaoImpl(MockDataProvider mockDataProvider) {
        this.mockDataProvider = mockDataProvider;
    }
    
    @Override
    public Company findCompanyInfo() {
        Map<Long, Company> companyData = mockDataProvider.getCompanyData();
        return companyData.values().stream()
                .findFirst()
                .orElse(null);
    }
    
    @Override
    public Company saveCompany(Company company) {
        Map<Long, Company> companyData = mockDataProvider.getCompanyData();
        
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
    public boolean existsCompany() {
        Map<Long, Company> companyData = mockDataProvider.getCompanyData();
        return !companyData.isEmpty();
    }
    
    // Utility methods using reflection
    private void setEntityId(Company entity, Long id) {
        try {
            var idField = entity.getClass().getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(entity, id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set entity ID", e);
        }
    }
    
    private void setCreatedAt(Company entity, LocalDateTime createdAt) {
        try {
            var createdAtField = entity.getClass().getSuperclass().getDeclaredField("createdAt");
            createdAtField.setAccessible(true);
            createdAtField.set(entity, createdAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set createdAt", e);
        }
    }
    
    private void setUpdatedAt(Company entity, LocalDateTime updatedAt) {
        try {
            var updatedAtField = entity.getClass().getSuperclass().getDeclaredField("updatedAt");
            updatedAtField.setAccessible(true);
            updatedAtField.set(entity, updatedAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set updatedAt", e);
        }
    }
}