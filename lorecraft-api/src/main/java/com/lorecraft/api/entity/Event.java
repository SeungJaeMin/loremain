package com.lorecraft.api.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "event")
public class Event extends BaseEntity {

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

    protected Event() {}

    public Event(String title, String content, LocalDateTime eventDate, String location, 
                 Integer maxParticipants, boolean registrationRequired) {
        this.title = title;
        this.content = content;
        this.eventDate = eventDate;
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.registrationRequired = registrationRequired;
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