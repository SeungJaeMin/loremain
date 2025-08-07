package com.lorecraft.api.controller;

import com.lorecraft.api.common.response.ApiResponse;
import com.lorecraft.api.dto.EventDto;
import com.lorecraft.api.service.EventService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<EventDto.Summary>>> getEventsList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "false") boolean includeUnpublished,
            @RequestParam(defaultValue = "false") boolean upcomingOnly) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("eventDate").ascending());
        Page<EventDto.Summary> eventPage;
        
        if (upcomingOnly) {
            eventPage = eventService.getUpcomingEvents(pageable);
        } else if (includeUnpublished) {
            eventPage = eventService.getAllEventsList(pageable);
        } else {
            eventPage = eventService.getPublishedEventsList(pageable);
        }
        
        return ResponseEntity.ok(ApiResponse.success(eventPage));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EventDto.Response>> getEventDetail(@PathVariable Long id) {
        EventDto.Response response = eventService.getEventDetail(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EventDto.Response>> createEvent(
            @Valid @RequestBody EventDto.Request request) {
        EventDto.Response response = eventService.createEvent(request);
        return ResponseEntity.ok(ApiResponse.success("이벤트가 성공적으로 생성되었습니다.", response));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EventDto.Response>> updateEvent(
            @PathVariable Long id,
            @Valid @RequestBody EventDto.Request request) {
        EventDto.Response response = eventService.updateEvent(id, request);
        return ResponseEntity.ok(ApiResponse.success("이벤트가 성공적으로 업데이트되었습니다.", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok(ApiResponse.success("이벤트가 성공적으로 삭제되었습니다.", null));
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<ApiResponse<EventDto.Response>> publishEvent(@PathVariable Long id) {
        EventDto.Response response = eventService.publishEvent(id);
        return ResponseEntity.ok(ApiResponse.success("이벤트가 게시되었습니다.", response));
    }

    @PostMapping("/{id}/unpublish")
    public ResponseEntity<ApiResponse<EventDto.Response>> unpublishEvent(@PathVariable Long id) {
        EventDto.Response response = eventService.unpublishEvent(id);
        return ResponseEntity.ok(ApiResponse.success("이벤트 게시가 중단되었습니다.", response));
    }

    @PostMapping("/{id}/register")
    public ResponseEntity<ApiResponse<EventDto.Response>> registerForEvent(@PathVariable Long id) {
        EventDto.Response response = eventService.registerForEvent(id);
        return ResponseEntity.ok(ApiResponse.success("이벤트에 성공적으로 등록되었습니다.", response));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<EventDto.Response>> cancelRegistration(@PathVariable Long id) {
        EventDto.Response response = eventService.cancelRegistration(id);
        return ResponseEntity.ok(ApiResponse.success("이벤트 등록이 취소되었습니다.", response));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<EventDto.Summary>>> searchEvents(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "true") boolean publishedOnly) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("eventDate").ascending());
        Page<EventDto.Summary> eventPage = eventService.searchEvents(keyword, publishedOnly, pageable);
        
        return ResponseEntity.ok(ApiResponse.success(eventPage));
    }
}