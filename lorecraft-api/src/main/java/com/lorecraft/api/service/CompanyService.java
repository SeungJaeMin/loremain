package com.lorecraft.api.service;

import com.lorecraft.api.dto.CompanyDto;
import com.lorecraft.api.entity.Company;
import com.lorecraft.api.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Transactional(readOnly = true)
    public CompanyDto.Response getCompanyInfo() {
        Company company = companyRepository.findAll()
                .stream()
                .findFirst()
                .orElse(createDefaultCompany());
        
        return convertToResponse(company);
    }

    public CompanyDto.Response updateCompanyInfo(CompanyDto.Request request) {
        Company company = companyRepository.findAll()
                .stream()
                .findFirst()
                .orElse(new Company(request.getName(), request.getEstablished(), 
                                   request.getCeo(), request.getAddress(), 
                                   request.getBusiness(), request.getEmployees(), 
                                   request.getCapital()));

        company.updateCompanyInfo(request.getName(), request.getEstablished(), 
                                 request.getCeo(), request.getAddress(), 
                                 request.getBusiness(), request.getEmployees(), 
                                 request.getCapital());

        Company savedCompany = companyRepository.save(company);
        return convertToResponse(savedCompany);
    }

    private Company createDefaultCompany() {
        Company defaultCompany = new Company(
                "LORECRAFT", "2025년", "홍길동", 
                "경기도 수원시 어딘가구 어딘가길 123",
                "IP개발, TCG, 커뮤니티, 콘텐츠 플랫폼 서비스",
                "5명", "-"
        );
        return companyRepository.save(defaultCompany);
    }

    private CompanyDto.Response convertToResponse(Company company) {
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