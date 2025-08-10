package com.lorecraft.api.controller;

import com.lorecraft.api.dto.NewsDto;
import com.lorecraft.api.service.NewsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/news")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AdminNewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllNews(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<NewsDto.Summary> newsList = newsService.getAllNewsForAdmin(page, size);
            
            response.put("success", true);
            response.put("data", newsList);
            response.put("message", "뉴스 목록을 성공적으로 불러왔습니다.");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "뉴스 목록을 불러오는 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getNewsById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            NewsDto.Response news = newsService.getNewsById(id);
            
            response.put("success", true);
            response.put("data", news);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "뉴스를 불러오는 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createNews(@Valid @RequestBody NewsDto.Request request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            NewsDto.Response createdNews = newsService.createNews(request);
            
            response.put("success", true);
            response.put("message", "뉴스가 성공적으로 생성되었습니다.");
            response.put("data", createdNews);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "뉴스 생성 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateNews(@PathVariable Long id, 
                                                         @Valid @RequestBody NewsDto.Request request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            NewsDto.Response updatedNews = newsService.updateNews(id, request);
            
            response.put("success", true);
            response.put("message", "뉴스가 성공적으로 수정되었습니다.");
            response.put("data", updatedNews);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "뉴스 수정 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteNews(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            newsService.deleteNews(id);
            
            response.put("success", true);
            response.put("message", "뉴스가 성공적으로 삭제되었습니다.");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "뉴스 삭제 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PatchMapping("/{id}/publish")
    public ResponseEntity<Map<String, Object>> togglePublishStatus(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            NewsDto.Response updatedNews = newsService.togglePublishStatus(id);
            
            response.put("success", true);
            response.put("message", "뉴스 게시 상태가 변경되었습니다.");
            response.put("data", updatedNews);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "뉴스 게시 상태 변경 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}