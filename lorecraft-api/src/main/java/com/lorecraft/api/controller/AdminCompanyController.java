package com.lorecraft.api.controller;

import com.lorecraft.api.dto.CompanyDto;
import com.lorecraft.api.service.CompanyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/company")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AdminCompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getCompanyInfo() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            CompanyDto.Response companyInfo = companyService.getCompanyInfo();
            
            response.put("success", true);
            response.put("data", companyInfo);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "회사 정보를 불러오는 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/info")
    public ResponseEntity<Map<String, Object>> updateCompanyInfo(@Valid @RequestBody CompanyDto.Request request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            CompanyDto.Response updatedCompany = companyService.updateCompanyInfo(request);
            
            response.put("success", true);
            response.put("message", "회사 정보가 성공적으로 저장되었습니다.");
            response.put("data", updatedCompany);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "회사 정보 저장 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}