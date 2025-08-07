package com.lorecraft.api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "news")
public class News extends BaseEntity {

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

    protected News() {}

    public News(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
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

    public void publish() {
        this.published = true;
    }

    public void unpublish() {
        this.published = false;
    }
}