package com.lorecraft.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public class NewsDto {

    public static class Request {
        @NotBlank(message = "제목은 필수입니다")
        @Size(max = 200, message = "제목은 200자 이하여야 합니다")
        private String title;

        @NotBlank(message = "내용은 필수입니다")
        private String content;

        @Size(max = 50, message = "작성자는 50자 이하여야 합니다")
        private String author;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public String getAuthor() { return author; }
        public void setAuthor(String author) { this.author = author; }
    }

    public static class Response {
        private Long id;
        private String title;
        private String content;
        private String author;
        private boolean published;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Response(Long id, String title, String content, String author, 
                        boolean published, LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.id = id;
            this.title = title;
            this.content = content;
            this.author = author;
            this.published = published;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }

        public Long getId() { return id; }
        public String getTitle() { return title; }
        public String getContent() { return content; }
        public String getAuthor() { return author; }
        public boolean isPublished() { return published; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public LocalDateTime getUpdatedAt() { return updatedAt; }
    }

    public static class Summary {
        private Long id;
        private String title;
        private String author;
        private boolean published;
        private LocalDateTime createdAt;

        public Summary(Long id, String title, String author, boolean published, LocalDateTime createdAt) {
            this.id = id;
            this.title = title;
            this.author = author;
            this.published = published;
            this.createdAt = createdAt;
        }

        public Long getId() { return id; }
        public String getTitle() { return title; }
        public String getAuthor() { return author; }
        public boolean isPublished() { return published; }
        public LocalDateTime getCreatedAt() { return createdAt; }
    }
}