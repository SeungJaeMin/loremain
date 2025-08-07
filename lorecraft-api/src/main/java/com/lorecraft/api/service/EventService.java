package com.lorecraft.api.service;

import com.lorecraft.api.dto.EventDto;
import com.lorecraft.api.entity.Event;
import com.lorecraft.api.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Transactional(readOnly = true)
    public Page<EventDto.Summary> getPublishedEventsList(Pageable pageable) {
        Page<Event> eventPage = eventRepository.findPublishedEventsOrderByEventDate(pageable);
        return eventPage.map(this::convertToSummary);
    }

    @Transactional(readOnly = true)
    public Page<EventDto.Summary> getAllEventsList(Pageable pageable) {
        Page<Event> eventPage = eventRepository.findAll(pageable);
        return eventPage.map(this::convertToSummary);
    }

    @Transactional(readOnly = true)
    public Page<EventDto.Summary> getUpcomingEvents(Pageable pageable) {
        LocalDateTime now = LocalDateTime.now();
        Page<Event> eventPage = eventRepository.findByEventDateAfterAndPublishedTrue(now, pageable);
        return eventPage.map(this::convertToSummary);
    }

    @Transactional(readOnly = true)
    public EventDto.Response getEventDetail(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("이벤트를 찾을 수 없습니다."));
        
        return convertToResponse(event);
    }

    public EventDto.Response createEvent(EventDto.Request request) {
        Event event = new Event(
                request.getTitle(),
                request.getContent(),
                request.getEventDate(),
                request.getLocation(),
                request.getMaxParticipants(),
                request.isRegistrationRequired()
        );
        Event savedEvent = eventRepository.save(event);
        return convertToResponse(savedEvent);
    }

    public EventDto.Response updateEvent(Long id, EventDto.Request request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("이벤트를 찾을 수 없습니다."));

        event.updateEvent(
                request.getTitle(),
                request.getContent(),
                request.getEventDate(),
                request.getLocation(),
                request.getMaxParticipants(),
                request.isRegistrationRequired()
        );
        Event updatedEvent = eventRepository.save(event);
        return convertToResponse(updatedEvent);
    }

    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new RuntimeException("이벤트를 찾을 수 없습니다.");
        }
        eventRepository.deleteById(id);
    }

    public EventDto.Response publishEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("이벤트를 찾을 수 없습니다."));

        event.publish();
        Event publishedEvent = eventRepository.save(event);
        return convertToResponse(publishedEvent);
    }

    public EventDto.Response unpublishEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("이벤트를 찾을 수 없습니다."));

        event.unpublish();
        Event unpublishedEvent = eventRepository.save(event);
        return convertToResponse(unpublishedEvent);
    }

    public EventDto.Response registerForEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("이벤트를 찾을 수 없습니다."));

        if (!event.canRegister()) {
            throw new RuntimeException("이벤트 참가 신청이 마감되었습니다.");
        }

        event.addParticipant();
        Event updatedEvent = eventRepository.save(event);
        return convertToResponse(updatedEvent);
    }

    public EventDto.Response cancelRegistration(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("이벤트를 찾을 수 없습니다."));

        event.removeParticipant();
        Event updatedEvent = eventRepository.save(event);
        return convertToResponse(updatedEvent);
    }

    @Transactional(readOnly = true)
    public Page<EventDto.Summary> searchEvents(String keyword, boolean publishedOnly, Pageable pageable) {
        Page<Event> eventPage;
        if (publishedOnly) {
            eventPage = eventRepository.findByTitleContainingIgnoreCaseAndPublishedTrue(keyword, pageable);
        } else {
            eventPage = eventRepository.findByTitleContainingIgnoreCase(keyword, pageable);
        }
        return eventPage.map(this::convertToSummary);
    }

    private EventDto.Response convertToResponse(Event event) {
        return new EventDto.Response(
                event.getId(),
                event.getTitle(),
                event.getContent(),
                event.getEventDate(),
                event.getLocation(),
                event.getMaxParticipants(),
                event.getCurrentParticipants(),
                event.isRegistrationRequired(),
                event.isPublished(),
                event.getCreatedAt(),
                event.getUpdatedAt()
        );
    }

    private EventDto.Summary convertToSummary(Event event) {
        return new EventDto.Summary(
                event.getId(),
                event.getTitle(),
                event.getEventDate(),
                event.getLocation(),
                event.getMaxParticipants(),
                event.getCurrentParticipants(),
                event.isPublished()
        );
    }
}