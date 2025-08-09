package com.lorecraft.api.controller;

import com.lorecraft.api.common.response.ApiResponse;
import com.lorecraft.api.dto.CompanyDto;
import com.lorecraft.api.service.CompanyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/info")
    public ResponseEntity<ApiResponse<CompanyDto.Response>> getCompanyInfo() {
        CompanyDto.Response response = companyService.getCompanyInfo();
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PutMapping("/info")
    public ResponseEntity<ApiResponse<CompanyDto.Response>> updateCompanyInfo(
            @Valid @RequestBody CompanyDto.Request request) {
        CompanyDto.Response response = companyService.updateCompanyInfo(request);
        return ResponseEntity.ok(ApiResponse.success("회사 정보가 성공적으로 업데이트되었습니다.", response));
    }
}