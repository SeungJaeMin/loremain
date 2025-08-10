package com.lorecraft.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.lorecraft.api.repository")
public class LoreCraftApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(LoreCraftApiApplication.class, args);
    }

}