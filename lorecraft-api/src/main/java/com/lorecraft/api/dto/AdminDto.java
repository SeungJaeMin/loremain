package com.lorecraft.api.dto;

import jakarta.validation.constraints.NotBlank;

public class AdminDto {

    public static class LoginRequest {
        @NotBlank(message = "아이디는 필수입니다")
        private String username;

        @NotBlank(message = "비밀번호는 필수입니다")
        private String password;

        // Getters and Setters
        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class LoginResponse {
        private String token;
        private String username;
        private long expiresIn;

        public LoginResponse(String token, String username, long expiresIn) {
            this.token = token;
            this.username = username;
            this.expiresIn = expiresIn;
        }

        // Getters and Setters
        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public long getExpiresIn() {
            return expiresIn;
        }

        public void setExpiresIn(long expiresIn) {
            this.expiresIn = expiresIn;
        }
    }
}