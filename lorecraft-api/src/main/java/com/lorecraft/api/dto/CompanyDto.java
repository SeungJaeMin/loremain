package com.lorecraft.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CompanyDto {

    public static class Request {
        @NotBlank(message = "회사명은 필수입니다")
        @Size(max = 100, message = "회사명은 100자 이하여야 합니다")
        private String name;

        @Size(max = 20, message = "설립연도는 20자 이하여야 합니다")
        private String established;

        @Size(max = 50, message = "대표자명은 50자 이하여야 합니다")
        private String ceo;

        @Size(max = 500, message = "주소는 500자 이하여야 합니다")
        private String address;

        @Size(max = 1000, message = "사업내용은 1000자 이하여야 합니다")
        private String business;

        @Size(max = 50, message = "임직원수는 50자 이하여야 합니다")
        private String employees;

        @Size(max = 50, message = "자본금은 50자 이하여야 합니다")
        private String capital;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEstablished() { return established; }
        public void setEstablished(String established) { this.established = established; }
        public String getCeo() { return ceo; }
        public void setCeo(String ceo) { this.ceo = ceo; }
        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }
        public String getBusiness() { return business; }
        public void setBusiness(String business) { this.business = business; }
        public String getEmployees() { return employees; }
        public void setEmployees(String employees) { this.employees = employees; }
        public String getCapital() { return capital; }
        public void setCapital(String capital) { this.capital = capital; }
    }

    public static class Response {
        private Long id;
        private String name;
        private String established;
        private String ceo;
        private String address;
        private String business;
        private String employees;
        private String capital;

        public Response(Long id, String name, String established, String ceo, 
                        String address, String business, String employees, String capital) {
            this.id = id;
            this.name = name;
            this.established = established;
            this.ceo = ceo;
            this.address = address;
            this.business = business;
            this.employees = employees;
            this.capital = capital;
        }

        public Long getId() { return id; }
        public String getName() { return name; }
        public String getEstablished() { return established; }
        public String getCeo() { return ceo; }
        public String getAddress() { return address; }
        public String getBusiness() { return business; }
        public String getEmployees() { return employees; }
        public String getCapital() { return capital; }
    }
}