package com.lorecraft.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class EventDto {

    public static class Request {
        @NotBlank(message = "제목은 필수입니다")
        @Size(max = 200, message = "제목은 200자 이하여야 합니다")
        private String title;

        @NotBlank(message = "내용은 필수입니다")
        private String content;

        @NotNull(message = "이벤트 날짜는 필수입니다")
        @JsonProperty("eventDate")
        private LocalDateTime eventDate;

        @Size(max = 200, message = "장소는 200자 이하여야 합니다")
        private String location;

        private Integer maxParticipants;
        private boolean registrationRequired = false;

        @Size(max = 50, message = "카테고리는 50자 이하여야 합니다")
        private String category;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public LocalDateTime getEventDate() { return eventDate; }
        public void setEventDate(LocalDateTime eventDate) { this.eventDate = eventDate; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public Integer getMaxParticipants() { return maxParticipants; }
        public void setMaxParticipants(Integer maxParticipants) { this.maxParticipants = maxParticipants; }
        public boolean isRegistrationRequired() { return registrationRequired; }
        public void setRegistrationRequired(boolean registrationRequired) { this.registrationRequired = registrationRequired; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
    }

    public static class Response {
        private Long id;
        private String title;
        private String content;
        private LocalDateTime eventDate;
        private String location;
        private Integer maxParticipants;
        private Integer currentParticipants;
        private boolean registrationRequired;
        private boolean published;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private List<String> imageUrls;
        private String category;
        private List<String> tags;
        private String heroImage;

        public Response(Long id, String title, String content, LocalDateTime eventDate,
                        String location, Integer maxParticipants, Integer currentParticipants,
                        boolean registrationRequired, boolean published, 
                        LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.id = id;
            this.title = title;
            this.content = content;
            this.eventDate = eventDate;
            this.location = location;
            this.maxParticipants = maxParticipants;
            this.currentParticipants = currentParticipants;
            this.registrationRequired = registrationRequired;
            this.published = published;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }

        public Response(Long id, String title, String content, LocalDateTime eventDate,
                       String location, Integer maxParticipants, Integer currentParticipants,
                       boolean registrationRequired, boolean published,
                       LocalDateTime createdAt, LocalDateTime updatedAt,
                       List<String> imageUrls, String category, List<String> tags, String heroImage) {
            this.id = id;
            this.title = title;
            this.content = content;
            this.eventDate = eventDate;
            this.location = location;
            this.maxParticipants = maxParticipants;
            this.currentParticipants = currentParticipants;
            this.registrationRequired = registrationRequired;
            this.published = published;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.imageUrls = imageUrls;
            this.category = category;
            this.tags = tags;
            this.heroImage = heroImage;
        }

        public Long getId() { return id; }
        public String getTitle() { return title; }
        public String getContent() { return content; }
        public LocalDateTime getEventDate() { return eventDate; }
        public String getLocation() { return location; }
        public Integer getMaxParticipants() { return maxParticipants; }
        public Integer getCurrentParticipants() { return currentParticipants; }
        public boolean isRegistrationRequired() { return registrationRequired; }
        public boolean isPublished() { return published; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public LocalDateTime getUpdatedAt() { return updatedAt; }
        public List<String> getImageUrls() { return imageUrls; }
        public String getCategory() { return category; }
        public List<String> getTags() { return tags; }
        public String getHeroImage() { return heroImage; }
    }

    public static class Summary {
        private Long id;
        private String title;
        private LocalDateTime eventDate;
        private String location;
        private Integer maxParticipants;
        private Integer currentParticipants;
        private boolean published;
        private String category;
        private String heroImage;

        public Summary(Long id, String title, LocalDateTime eventDate, String location,
                       Integer maxParticipants, Integer currentParticipants, boolean published) {
            this.id = id;
            this.title = title;
            this.eventDate = eventDate;
            this.location = location;
            this.maxParticipants = maxParticipants;
            this.currentParticipants = currentParticipants;
            this.published = published;
        }

        public Summary(Long id, String title, LocalDateTime eventDate, String location,
                      Integer maxParticipants, Integer currentParticipants, boolean published,
                      String category, String heroImage) {
            this.id = id;
            this.title = title;
            this.eventDate = eventDate;
            this.location = location;
            this.maxParticipants = maxParticipants;
            this.currentParticipants = currentParticipants;
            this.published = published;
            this.category = category;
            this.heroImage = heroImage;
        }

        public Long getId() { return id; }
        public String getTitle() { return title; }
        public LocalDateTime getEventDate() { return eventDate; }
        public String getLocation() { return location; }
        public Integer getMaxParticipants() { return maxParticipants; }
        public Integer getCurrentParticipants() { return currentParticipants; }
        public boolean isPublished() { return published; }
        public String getCategory() { return category; }
        public String getHeroImage() { return heroImage; }
    }
}