package com.lorecraft.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lorecraft.api.repository.CompanyRepository;
import com.lorecraft.api.dto.CompanyDto;
import com.lorecraft.api.entity.CompanyInfo;
import com.lorecraft.api.service.base.BaseService;

@Service
public class CompanyService extends BaseService {

    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public CompanyDto.Response getCompanyInfo() {
        logServiceCall("getCompanyInfo");
        
        CompanyInfo company = companyRepository.findFirst();
        
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
        
        CompanyInfo company = companyRepository.findFirst();
        
        if (company == null) {
            company = new CompanyInfo(
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

        CompanyInfo savedCompany = companyRepository.save(company);
        CompanyDto.Response response = convertToResponse(savedCompany);
        
        logServiceResult("updateCompanyInfo", response);
        
        return response;
    }

    private CompanyInfo createDefaultCompany() {
        CompanyInfo defaultCompany = new CompanyInfo(
                "LORECRAFT", 
                2025, 
                "Hong Gil-dong", 
                "Gyeonggi Suwon Somewhere 123",
                "IP Development, TCG, Community, Content Platform Service",
                5, 
                "N/A"
        );
        return companyRepository.save(defaultCompany);
    }

    private CompanyDto.Response convertToResponse(CompanyInfo company) {
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