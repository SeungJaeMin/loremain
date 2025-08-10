package com.lorecraft.api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.lorecraft.api.repository.NewsRepository;
import com.lorecraft.api.dto.NewsDto;
import com.lorecraft.api.entity.EntityNews;
import com.lorecraft.api.service.base.BaseService;

@Service
public class NewsService extends BaseService {

    private final NewsRepository newsRepository;

    @Autowired
    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public Page<NewsDto.Summary> getPublishedNewsList(Pageable pageable) {
        logServiceCall("getPublishedNewsList", pageable);
        
        List<EntityNews> newsList = newsRepository.findByPublishedTrue();
        List<NewsDto.Summary> summaryList = newsList.stream()
                .map(this::convertToSummary)
                .collect(Collectors.toList());
        
        Page<NewsDto.Summary> result = createPageFromList(summaryList, pageable);
        logServiceResult("getPublishedNewsList", result);
        
        return result;
    }

    public Page<NewsDto.Summary> getAllNewsList(Pageable pageable) {
        logServiceCall("getAllNewsList", pageable);
        
        List<EntityNews> newsList = newsRepository.findAll();
        List<NewsDto.Summary> summaryList = newsList.stream()
                .map(this::convertToSummary)
                .collect(Collectors.toList());
        
        Page<NewsDto.Summary> result = createPageFromList(summaryList, pageable);
        logServiceResult("getAllNewsList", result);
        
        return result;
    }

    public NewsDto.Response getNewsDetail(Long id) {
        logServiceCall("getNewsDetail", id);
        
        validatePositive(id, "News ID");
        
        EntityNews news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found with ID: " + id));
        
        NewsDto.Response response = convertToResponse(news);
        logServiceResult("getNewsDetail", response);
        
        return response;
    }

    public NewsDto.Response createNews(NewsDto.Request request) {
        logServiceCall("createNews", request);
        
        validateNotNull(request, "NewsDto.Request");
        validateNotEmpty(request.getTitle(), "News title");
        validateNotEmpty(request.getContent(), "News content");
        
        EntityNews news = new EntityNews(request.getTitle(), request.getContent(), request.getAuthor());
        EntityNews savedNews = newsRepository.save(news);
        
        NewsDto.Response response = convertToResponse(savedNews);
        logServiceResult("createNews", response);
        
        return response;
    }

    public NewsDto.Response updateNews(Long id, NewsDto.Request request) {
        logServiceCall("updateNews", id, request);
        
        validatePositive(id, "News ID");
        validateNotNull(request, "NewsDto.Request");
        validateNotEmpty(request.getTitle(), "News title");
        validateNotEmpty(request.getContent(), "News content");
        
        EntityNews news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found with ID: " + id));

        news.updateNews(request.getTitle(), request.getContent(), request.getAuthor());
        EntityNews updatedNews = newsRepository.save(news);
        
        NewsDto.Response response = convertToResponse(updatedNews);
        logServiceResult("updateNews", response);
        
        return response;
    }

    public void deleteNews(Long id) {
        logServiceCall("deleteNews", id);
        
        validatePositive(id, "News ID");
        
        if (!newsRepository.existsById(id)) {
            throw new RuntimeException("News not found with ID: " + id);
        }
        
        newsRepository.deleteById(id);
        logServiceResult("deleteNews", "Success");
    }

    public NewsDto.Response publishNews(Long id) {
        logServiceCall("publishNews", id);
        
        validatePositive(id, "News ID");
        
        EntityNews news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found with ID: " + id));

        news.publish();
        EntityNews publishedNews = newsRepository.save(news);
        
        NewsDto.Response response = convertToResponse(publishedNews);
        logServiceResult("publishNews", response);
        
        return response;
    }

    public NewsDto.Response unpublishNews(Long id) {
        logServiceCall("unpublishNews", id);
        
        validatePositive(id, "News ID");
        
        EntityNews news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found with ID: " + id));

        news.unpublish();
        EntityNews unpublishedNews = newsRepository.save(news);
        
        NewsDto.Response response = convertToResponse(unpublishedNews);
        logServiceResult("unpublishNews", response);
        
        return response;
    }

    public Page<NewsDto.Summary> searchNews(String keyword, boolean publishedOnly, Pageable pageable) {
        logServiceCall("searchNews", keyword, publishedOnly, pageable);
        
        validateNotEmpty(keyword, "Search keyword");
        
        List<EntityNews> newsList;
        if (publishedOnly) {
            newsList = newsRepository.findByPublishedTrueAndTitleContainingIgnoreCase(keyword);
        } else {
            newsList = newsRepository.findByTitleContainingIgnoreCase(keyword);
        }
        
        List<NewsDto.Summary> summaryList = newsList.stream()
                .map(this::convertToSummary)
                .collect(Collectors.toList());
        
        Page<NewsDto.Summary> result = createPageFromList(summaryList, pageable);
        logServiceResult("searchNews", result);
        
        return result;
    }

    // Admin specific methods
    public List<NewsDto.Summary> getAllNewsForAdmin(int page, int size) {
        logServiceCall("getAllNewsForAdmin", page, size);
        
        List<EntityNews> newsList = newsRepository.findAll();
        List<NewsDto.Summary> summaryList = newsList.stream()
                .map(this::convertToSummary)
                .collect(Collectors.toList());
        
        // Apply pagination manually
        int start = Math.max(0, (page - 1) * size);
        int end = Math.min(summaryList.size(), start + size);
        
        List<NewsDto.Summary> result = start < summaryList.size() ? 
            summaryList.subList(start, end) : List.of();
        
        logServiceResult("getAllNewsForAdmin", result);
        return result;
    }

    public NewsDto.Response getNewsById(Long id) {
        logServiceCall("getNewsById", id);
        
        validatePositive(id, "News ID");
        
        EntityNews news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found with ID: " + id));
        
        NewsDto.Response response = convertToResponse(news);
        logServiceResult("getNewsById", response);
        
        return response;
    }

    public NewsDto.Response togglePublishStatus(Long id) {
        logServiceCall("togglePublishStatus", id);
        
        validatePositive(id, "News ID");
        
        EntityNews news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found with ID: " + id));

        if (news.isPublished()) {
            news.unpublish();
        } else {
            news.publish();
        }
        
        EntityNews updatedNews = newsRepository.save(news);
        
        NewsDto.Response response = convertToResponse(updatedNews);
        logServiceResult("togglePublishStatus", response);
        
        return response;
    }

    private NewsDto.Response convertToResponse(EntityNews news) {
        validateNotNull(news, "News");
        
        return new NewsDto.Response(
                news.getId(),
                news.getTitle(),
                news.getContent(),
                news.getAuthor(),
                news.isPublished(),
                news.getCreatedAt(),
                news.getUpdatedAt(),
                news.getImageUrls(),
                news.getCategory(),
                news.getTags(),
                news.getHeroImage()
        );
    }

    private NewsDto.Summary convertToSummary(EntityNews news) {
        validateNotNull(news, "News");
        
        return new NewsDto.Summary(
                news.getId(),
                news.getTitle(),
                news.getAuthor(),
                news.isPublished(),
                news.getCreatedAt(),
                news.getCategory(),
                news.getHeroImage()
        );
    }
}