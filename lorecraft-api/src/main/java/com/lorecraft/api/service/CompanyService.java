package com.lorecraft.api.service;

import com.lorecraft.api.dao.CompanyDao;
import com.lorecraft.api.dto.CompanyDto;
import com.lorecraft.api.entity.Company;
import com.lorecraft.api.service.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyService extends BaseService {

    private final CompanyDao companyDao;

    @Autowired
    public CompanyService(CompanyDao companyDao) {
        this.companyDao = companyDao;
    }

    public CompanyDto.Response getCompanyInfo() {
        logServiceCall("getCompanyInfo");
        
        Company company = companyDao.findCompanyInfo();
        
        if (company == null) {
            company = createDefaultCompany();
        }
        
        CompanyDto.Response response = convertToResponse(company);
        logServiceResult("getCompanyInfo", response);
        
        return response;
    }

    public CompanyDto.Response updateCompanyInfo(CompanyDto.Request request) {
        logServiceCall("updateCompanyInfo", request);
        
        validateNotNull(request, "CompanyDto.Request");
        validateNotEmpty(request.getName(), "Company name");
        
        Company company = companyDao.findCompanyInfo();
        
        if (company == null) {
            company = new Company(
                request.getName(), 
                request.getEstablished(), 
                request.getCeo(), 
                request.getAddress(), 
                request.getBusiness(), 
                request.getEmployees(), 
                request.getCapital()
            );
        } else {
            company.updateCompanyInfo(
                request.getName(), 
                request.getEstablished(), 
                request.getCeo(), 
                request.getAddress(), 
                request.getBusiness(), 
                request.getEmployees(), 
                request.getCapital()
            );
        }

        Company savedCompany = companyDao.saveCompany(company);
        CompanyDto.Response response = convertToResponse(savedCompany);
        
        logServiceResult("updateCompanyInfo", response);
        
        return response;
    }

    private Company createDefaultCompany() {
        Company defaultCompany = new Company(
                "LORECRAFT", 
                "2025year", 
                "Hong Gil-dong", 
                "Gyeonggi Suwon Somewhere 123",
                "IP Development, TCG, Community, Content Platform Service",
                "5people", 
                "N/A"
        );
        return companyDao.saveCompany(defaultCompany);
    }

    private CompanyDto.Response convertToResponse(Company company) {
        validateNotNull(company, "Company");
        
        return new CompanyDto.Response(
                company.getId(),
                company.getName(),
                company.getEstablished(),
                company.getCeo(),
                company.getAddress(),
                company.getBusiness(),
                company.getEmployees(),
                company.getCapital()
        );
    }
}