package com.lorecraft.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "entity_company")
public class EntityCompany extends EntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "established", length = 20)
    private String established;

    @Column(name = "ceo", length = 50)
    private String ceo;

    @Column(name = "address", length = 500)
    private String address;

    @Column(name = "business", length = 1000)
    private String business;

    @Column(name = "employees", length = 50)
    private String employees;

    @Column(name = "capital", length = 50)
    private String capital;

    protected EntityCompany() {}

    public EntityCompany(String name, String established, String ceo, String address, 
                   String business, String employees, String capital) {
        this.name = name;
        this.established = established;
        this.ceo = ceo;
        this.address = address;
        this.business = business;
        this.employees = employees;
        this.capital = capital;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEstablished() {
        return established;
    }

    public String getCeo() {
        return ceo;
    }

    public String getAddress() {
        return address;
    }

    public String getBusiness() {
        return business;
    }

    public String getEmployees() {
        return employees;
    }

    public String getCapital() {
        return capital;
    }

    public void updateCompanyInfo(String name, String established, String ceo, String address, 
                                  String business, String employees, String capital) {
        this.name = name;
        this.established = established;
        this.ceo = ceo;
        this.address = address;
        this.business = business;
        this.employees = employees;
        this.capital = capital;
    }
}