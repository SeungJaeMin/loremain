package com.lorecraft.api.dao;

import com.lorecraft.api.entity.Company;

public interface CompanyDao {
    
    Company findCompanyInfo();
    
    Company saveCompany(Company company);
    
    boolean existsCompany();
}