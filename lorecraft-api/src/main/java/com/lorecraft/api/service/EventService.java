package com.lorecraft.api.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.lorecraft.api.repository.EventRepository;
import com.lorecraft.api.dto.EventDto;
import com.lorecraft.api.entity.EntityEvent;
import com.lorecraft.api.service.base.BaseService;

@Service
public class EventService extends BaseService {

    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Page<EventDto.Summary> getPublishedEventsList(Pageable pageable) {
        logServiceCall("getPublishedEventsList", pageable);
        
        List<EntityEvent> eventList = eventRepository.findByPublishedTrue();
        List<EventDto.Summary> summaryList = eventList.stream()
                .map(this::convertToSummary)
                .collect(Collectors.toList());
        
        Page<EventDto.Summary> result = createPageFromList(summaryList, pageable);
        logServiceResult("getPublishedEventsList", result);
        
        return result;
    }

    public Page<EventDto.Summary> getAllEventsList(Pageable pageable) {
        logServiceCall("getAllEventsList", pageable);
        
        List<EntityEvent> eventList = eventRepository.findAll();
        List<EventDto.Summary> summaryList = eventList.stream()
                .map(this::convertToSummary)
                .collect(Collectors.toList());
        
        Page<EventDto.Summary> result = createPageFromList(summaryList, pageable);
        logServiceResult("getAllEventsList", result);
        
        return result;
    }

    public Page<EventDto.Summary> getUpcomingEvents(Pageable pageable) {
        logServiceCall("getUpcomingEvents", pageable);
        
        LocalDateTime now = LocalDateTime.now();
        List<EntityEvent> eventList = eventRepository.findByEventDateAfter(now);
        List<EventDto.Summary> summaryList = eventList.stream()
                .map(this::convertToSummary)
                .collect(Collectors.toList());
        
        Page<EventDto.Summary> result = createPageFromList(summaryList, pageable);
        logServiceResult("getUpcomingEvents", result);
        
        return result;
    }

    public EventDto.Response getEventDetail(Long id) {
        logServiceCall("getEventDetail", id);
        
        validatePositive(id, "Event ID");
        
        EntityEvent event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));
        
        EventDto.Response response = convertToResponse(event);
        logServiceResult("getEventDetail", response);
        
        return response;
    }

    public EventDto.Response createEvent(EventDto.Request request) {
        logServiceCall("createEvent", request);
        
        validateNotNull(request, "EventDto.Request");
        validateNotEmpty(request.getTitle(), "Event title");
        validateNotEmpty(request.getContent(), "Event content");
        validateNotNull(request.getEventDate(), "Event date");
        
        EntityEvent event = new EntityEvent(
                request.getTitle(),
                request.getContent(),
                request.getEventDate(),
                request.getLocation(),
                request.getMaxParticipants(),
                request.isRegistrationRequired(),
                request.getCategory()
        );
        EntityEvent savedEvent = eventRepository.save(event);
        
        EventDto.Response response = convertToResponse(savedEvent);
        logServiceResult("createEvent", response);
        
        return response;
    }

    public EventDto.Response updateEvent(Long id, EventDto.Request request) {
        logServiceCall("updateEvent", id, request);
        
        validatePositive(id, "Event ID");
        validateNotNull(request, "EventDto.Request");
        validateNotEmpty(request.getTitle(), "Event title");
        validateNotEmpty(request.getContent(), "Event content");
        validateNotNull(request.getEventDate(), "Event date");
        
        EntityEvent event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));

        event.updateEvent(
                request.getTitle(),
                request.getContent(),
                request.getEventDate(),
                request.getLocation(),
                request.getMaxParticipants(),
                request.isRegistrationRequired(),
                request.getCategory()
        );
        EntityEvent updatedEvent = eventRepository.save(event);
        
        EventDto.Response response = convertToResponse(updatedEvent);
        logServiceResult("updateEvent", response);
        
        return response;
    }

    public void deleteEvent(Long id) {
        logServiceCall("deleteEvent", id);
        
        validatePositive(id, "Event ID");
        
        if (!eventRepository.existsById(id)) {
            throw new RuntimeException("Event not found with ID: " + id);
        }
        
        eventRepository.deleteById(id);
        logServiceResult("deleteEvent", "Success");
    }

    public EventDto.Response publishEvent(Long id) {
        logServiceCall("publishEvent", id);
        
        validatePositive(id, "Event ID");
        
        EntityEvent event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));

        event.publish();
        EntityEvent publishedEvent = eventRepository.save(event);
        
        EventDto.Response response = convertToResponse(publishedEvent);
        logServiceResult("publishEvent", response);
        
        return response;
    }

    public EventDto.Response unpublishEvent(Long id) {
        logServiceCall("unpublishEvent", id);
        
        validatePositive(id, "Event ID");
        
        EntityEvent event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));

        event.unpublish();
        EntityEvent unpublishedEvent = eventRepository.save(event);
        
        EventDto.Response response = convertToResponse(unpublishedEvent);
        logServiceResult("unpublishEvent", response);
        
        return response;
    }

    public EventDto.Response registerForEvent(Long id) {
        logServiceCall("registerForEvent", id);
        
        validatePositive(id, "Event ID");
        
        EntityEvent event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));

        if (!event.canRegister()) {
            throw new RuntimeException("Event registration is closed or full");
        }

        event.addParticipant();
        EntityEvent updatedEvent = eventRepository.save(event);
        
        EventDto.Response response = convertToResponse(updatedEvent);
        logServiceResult("registerForEvent", response);
        
        return response;
    }

    public EventDto.Response cancelRegistration(Long id) {
        logServiceCall("cancelRegistration", id);
        
        validatePositive(id, "Event ID");
        
        EntityEvent event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));

        event.removeParticipant();
        EntityEvent updatedEvent = eventRepository.save(event);
        
        EventDto.Response response = convertToResponse(updatedEvent);
        logServiceResult("cancelRegistration", response);
        
        return response;
    }

    public Page<EventDto.Summary> searchEvents(String keyword, boolean publishedOnly, Pageable pageable) {
        logServiceCall("searchEvents", keyword, publishedOnly, pageable);
        
        validateNotEmpty(keyword, "Search keyword");
        
        List<EntityEvent> eventList;
        if (publishedOnly) {
            eventList = eventRepository.findByPublishedTrueAndTitleContainingIgnoreCase(keyword);
        } else {
            eventList = eventRepository.findByTitleContainingIgnoreCase(keyword);
        }
        
        List<EventDto.Summary> summaryList = eventList.stream()
                .map(this::convertToSummary)
                .collect(Collectors.toList());
        
        Page<EventDto.Summary> result = createPageFromList(summaryList, pageable);
        logServiceResult("searchEvents", result);
        
        return result;
    }

    private EventDto.Response convertToResponse(EntityEvent event) {
        validateNotNull(event, "Event");
        
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

    private EventDto.Summary convertToSummary(EntityEvent event) {
        validateNotNull(event, "Event");
        
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