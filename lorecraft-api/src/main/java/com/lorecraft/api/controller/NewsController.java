package com.lorecraft.api.controller;

import com.lorecraft.api.common.response.ApiResponse;
import com.lorecraft.api.dto.NewsDto;
import com.lorecraft.api.service.NewsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    @Autowired
    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<NewsDto.Summary>>> getNewsList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "false") boolean includeUnpublished) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<NewsDto.Summary> newsPage;
        
        if (includeUnpublished) {
            newsPage = newsService.getAllNewsList(pageable);
        } else {
            newsPage = newsService.getPublishedNewsList(pageable);
        }
        
        return ResponseEntity.ok(ApiResponse.success(newsPage));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<NewsDto.Response>> getNewsDetail(@PathVariable Long id) {
        NewsDto.Response response = newsService.getNewsDetail(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<NewsDto.Response>> createNews(
            @Valid @RequestBody NewsDto.Request request) {
        NewsDto.Response response = newsService.createNews(request);
        return ResponseEntity.ok(ApiResponse.success("뉴스가 성공적으로 생성되었습니다.", response));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<NewsDto.Response>> updateNews(
            @PathVariable Long id,
            @Valid @RequestBody NewsDto.Request request) {
        NewsDto.Response response = newsService.updateNews(id, request);
        return ResponseEntity.ok(ApiResponse.success("뉴스가 성공적으로 업데이트되었습니다.", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.ok(ApiResponse.success("뉴스가 성공적으로 삭제되었습니다.", null));
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<ApiResponse<NewsDto.Response>> publishNews(@PathVariable Long id) {
        NewsDto.Response response = newsService.publishNews(id);
        return ResponseEntity.ok(ApiResponse.success("뉴스가 게시되었습니다.", response));
    }

    @PostMapping("/{id}/unpublish")
    public ResponseEntity<ApiResponse<NewsDto.Response>> unpublishNews(@PathVariable Long id) {
        NewsDto.Response response = newsService.unpublishNews(id);
        return ResponseEntity.ok(ApiResponse.success("뉴스 게시가 중단되었습니다.", response));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<NewsDto.Summary>>> searchNews(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "true") boolean publishedOnly) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<NewsDto.Summary> newsPage = newsService.searchNews(keyword, publishedOnly, pageable);
        
        return ResponseEntity.ok(ApiResponse.success(newsPage));
    }
}