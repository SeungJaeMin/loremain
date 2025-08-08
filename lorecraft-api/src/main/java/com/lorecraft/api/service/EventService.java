package com.lorecraft.api.service;

import com.lorecraft.api.dao.EventDao;
import com.lorecraft.api.dto.EventDto;
import com.lorecraft.api.entity.Event;
import com.lorecraft.api.service.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService extends BaseService {

    private final EventDao eventDao;

    @Autowired
    public EventService(EventDao eventDao) {
        this.eventDao = eventDao;
    }

    public Page<EventDto.Summary> getPublishedEventsList(Pageable pageable) {
        logServiceCall("getPublishedEventsList", pageable);
        
        List<Event> eventList = eventDao.findPublishedEvents();
        List<EventDto.Summary> summaryList = eventList.stream()
                .map(this::convertToSummary)
                .collect(Collectors.toList());
        
        Page<EventDto.Summary> result = createPageFromList(summaryList, pageable);
        logServiceResult("getPublishedEventsList", result);
        
        return result;
    }

    public Page<EventDto.Summary> getAllEventsList(Pageable pageable) {
        logServiceCall("getAllEventsList", pageable);
        
        List<Event> eventList = eventDao.findAllEvents();
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
        List<Event> eventList = eventDao.findUpcomingEvents(now);
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
        
        Event event = eventDao.findEventById(id)
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
        
        Event event = new Event(
                request.getTitle(),
                request.getContent(),
                request.getEventDate(),
                request.getLocation(),
                request.getMaxParticipants(),
                request.isRegistrationRequired()
        );
        Event savedEvent = eventDao.saveEvent(event);
        
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
        
        Event event = eventDao.findEventById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));

        event.updateEvent(
                request.getTitle(),
                request.getContent(),
                request.getEventDate(),
                request.getLocation(),
                request.getMaxParticipants(),
                request.isRegistrationRequired()
        );
        Event updatedEvent = eventDao.saveEvent(event);
        
        EventDto.Response response = convertToResponse(updatedEvent);
        logServiceResult("updateEvent", response);
        
        return response;
    }

    public void deleteEvent(Long id) {
        logServiceCall("deleteEvent", id);
        
        validatePositive(id, "Event ID");
        
        if (!eventDao.existsById(id)) {
            throw new RuntimeException("Event not found with ID: " + id);
        }
        
        eventDao.deleteEvent(id);
        logServiceResult("deleteEvent", "Success");
    }

    public EventDto.Response publishEvent(Long id) {
        logServiceCall("publishEvent", id);
        
        validatePositive(id, "Event ID");
        
        Event event = eventDao.findEventById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));

        event.publish();
        Event publishedEvent = eventDao.saveEvent(event);
        
        EventDto.Response response = convertToResponse(publishedEvent);
        logServiceResult("publishEvent", response);
        
        return response;
    }

    public EventDto.Response unpublishEvent(Long id) {
        logServiceCall("unpublishEvent", id);
        
        validatePositive(id, "Event ID");
        
        Event event = eventDao.findEventById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));

        event.unpublish();
        Event unpublishedEvent = eventDao.saveEvent(event);
        
        EventDto.Response response = convertToResponse(unpublishedEvent);
        logServiceResult("unpublishEvent", response);
        
        return response;
    }

    public EventDto.Response registerForEvent(Long id) {
        logServiceCall("registerForEvent", id);
        
        validatePositive(id, "Event ID");
        
        Event event = eventDao.findEventById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));

        if (!event.canRegister()) {
            throw new RuntimeException("Event registration is closed or full");
        }

        event.addParticipant();
        Event updatedEvent = eventDao.saveEvent(event);
        
        EventDto.Response response = convertToResponse(updatedEvent);
        logServiceResult("registerForEvent", response);
        
        return response;
    }

    public EventDto.Response cancelRegistration(Long id) {
        logServiceCall("cancelRegistration", id);
        
        validatePositive(id, "Event ID");
        
        Event event = eventDao.findEventById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));

        event.removeParticipant();
        Event updatedEvent = eventDao.saveEvent(event);
        
        EventDto.Response response = convertToResponse(updatedEvent);
        logServiceResult("cancelRegistration", response);
        
        return response;
    }

    public Page<EventDto.Summary> searchEvents(String keyword, boolean publishedOnly, Pageable pageable) {
        logServiceCall("searchEvents", keyword, publishedOnly, pageable);
        
        validateNotEmpty(keyword, "Search keyword");
        
        List<Event> eventList;
        if (publishedOnly) {
            eventList = eventDao.searchPublishedEventsByTitle(keyword);
        } else {
            eventList = eventDao.searchEventsByTitle(keyword);
        }
        
        List<EventDto.Summary> summaryList = eventList.stream()
                .map(this::convertToSummary)
                .collect(Collectors.toList());
        
        Page<EventDto.Summary> result = createPageFromList(summaryList, pageable);
        logServiceResult("searchEvents", result);
        
        return result;
    }

    private EventDto.Response convertToResponse(Event event) {
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

    private EventDto.Summary convertToSummary(Event event) {
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