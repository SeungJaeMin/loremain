package com.lorecraft.api.controller;

import com.lorecraft.api.dto.AdminDto;
import com.lorecraft.api.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${admin.username:admin}")
    private String adminUsername;

    @Value("${admin.password:admin123}")
    private String adminPassword;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody AdminDto.LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        try {
            // 간단한 관리자 인증 (실제 환경에서는 BCrypt 등으로 암호화 권장)
            if (adminUsername.equals(loginRequest.getUsername()) && 
                adminPassword.equals(loginRequest.getPassword())) {
                
                String token = jwtUtil.generateToken(loginRequest.getUsername());
                
                Map<String, Object> data = new HashMap<>();
                data.put("token", token);
                data.put("username", loginRequest.getUsername());
                data.put("expiresIn", 24 * 60 * 60 * 1000); // 24 hours in milliseconds

                response.put("success", true);
                response.put("message", "로그인 성공");
                response.put("data", data);
                
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "아이디 또는 비밀번호가 올바르지 않습니다.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "로그인 처리 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "로그아웃 되었습니다.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyToken() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "토큰이 유효합니다.");
        return ResponseEntity.ok(response);
    }
}