package com.lorecraft.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "news")
public class EntityNews extends EntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "author", length = 50)
    private String author;

    @Column(name = "published", nullable = false)
    private boolean published = false;

    @ElementCollection
    private List<String> imageUrls = new ArrayList<>();

    @Column(name = "category", length = 50)
    private String category;

    @ElementCollection
    private List<String> tags = new ArrayList<>();

    @Column(name = "hero_image", length = 500)
    private String heroImage;

    protected EntityNews() {}

    public EntityNews(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.imageUrls = new ArrayList<>();
        this.tags = new ArrayList<>();
    }

    public EntityNews(String title, String content, String author, List<String> imageUrls, 
                     String category, List<String> tags, String heroImage) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.imageUrls = imageUrls != null ? new ArrayList<>(imageUrls) : new ArrayList<>();
        this.category = category;
        this.tags = tags != null ? new ArrayList<>(tags) : new ArrayList<>();
        this.heroImage = heroImage;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getAuthor() {
        return author;
    }

    public boolean isPublished() {
        return published;
    }

    public void updateNews(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public void updateNews(String title, String content, String author, List<String> imageUrls,
                          String category, List<String> tags, String heroImage) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.imageUrls = imageUrls != null ? new ArrayList<>(imageUrls) : new ArrayList<>();
        this.category = category;
        this.tags = tags != null ? new ArrayList<>(tags) : new ArrayList<>();
        this.heroImage = heroImage;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public String getCategory() {
        return category;
    }

    public List<String> getTags() {
        return tags;
    }

    public String getHeroImage() {
        return heroImage;
    }

    public void publish() {
        this.published = true;
    }

    public void unpublish() {
        this.published = false;
    }
}