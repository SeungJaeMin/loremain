package com.lorecraft.api.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "event")
public class EntityEvent extends EntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "event_date", nullable = false)
    private LocalDateTime eventDate;

    @Column(name = "location", length = 200)
    private String location;

    @Column(name = "max_participants")
    private Integer maxParticipants;

    @Column(name = "current_participants", nullable = false)
    private Integer currentParticipants = 0;

    @Column(name = "registration_required", nullable = false)
    private boolean registrationRequired = false;

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

    protected EntityEvent() {}

    public EntityEvent(String title, String content, LocalDateTime eventDate, String location, 
                 Integer maxParticipants, boolean registrationRequired) {
        this.title = title;
        this.content = content;
        this.eventDate = eventDate;
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.registrationRequired = registrationRequired;
        this.imageUrls = new ArrayList<>();
        this.tags = new ArrayList<>();
    }

    public EntityEvent(String title, String content, LocalDateTime eventDate, String location,
                      Integer maxParticipants, boolean registrationRequired, List<String> imageUrls,
                      String category, List<String> tags, String heroImage) {
        this.title = title;
        this.content = content;
        this.eventDate = eventDate;
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.registrationRequired = registrationRequired;
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

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public String getLocation() {
        return location;
    }

    public Integer getMaxParticipants() {
        return maxParticipants;
    }

    public Integer getCurrentParticipants() {
        return currentParticipants;
    }

    public boolean isRegistrationRequired() {
        return registrationRequired;
    }

    public boolean isPublished() {
        return published;
    }

    public void updateEvent(String title, String content, LocalDateTime eventDate, String location, 
                            Integer maxParticipants, boolean registrationRequired) {
        this.title = title;
        this.content = content;
        this.eventDate = eventDate;
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.registrationRequired = registrationRequired;
    }

    public void updateEvent(String title, String content, LocalDateTime eventDate, String location,
                           Integer maxParticipants, boolean registrationRequired, List<String> imageUrls,
                           String category, List<String> tags, String heroImage) {
        this.title = title;
        this.content = content;
        this.eventDate = eventDate;
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.registrationRequired = registrationRequired;
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

    public boolean canRegister() {
        return maxParticipants == null || currentParticipants < maxParticipants;
    }

    public void addParticipant() {
        if (canRegister()) {
            this.currentParticipants++;
        }
    }

    public void removeParticipant() {
        if (this.currentParticipants > 0) {
            this.currentParticipants--;
        }
    }
}