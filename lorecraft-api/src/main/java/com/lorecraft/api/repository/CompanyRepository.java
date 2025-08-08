package com.lorecraft.api.repository;

import org.springframework.data.repository.Repository;

import com.lorecraft.api.entity.EntityCompany;

public interface CompanyRepository extends Repository<EntityCompany, Long> {
    
    EntityCompany findFirst();
    
    EntityCompany save(EntityCompany company);
    
    boolean existsBy();
}