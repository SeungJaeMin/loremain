package com.lorecraft.api.service;

import com.lorecraft.api.dao.NewsDao;
import com.lorecraft.api.dto.NewsDto;
import com.lorecraft.api.entity.News;
import com.lorecraft.api.service.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NewsService extends BaseService {

    private final NewsDao newsDao;

    @Autowired
    public NewsService(NewsDao newsDao) {
        this.newsDao = newsDao;
    }

    public Page<NewsDto.Summary> getPublishedNewsList(Pageable pageable) {
        logServiceCall("getPublishedNewsList", pageable);
        
        List<News> newsList = newsDao.findPublishedNews();
        List<NewsDto.Summary> summaryList = newsList.stream()
                .map(this::convertToSummary)
                .collect(Collectors.toList());
        
        Page<NewsDto.Summary> result = createPageFromList(summaryList, pageable);
        logServiceResult("getPublishedNewsList", result);
        
        return result;
    }

    public Page<NewsDto.Summary> getAllNewsList(Pageable pageable) {
        logServiceCall("getAllNewsList", pageable);
        
        List<News> newsList = newsDao.findAllNews();
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
        
        News news = newsDao.findNewsById(id)
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
        
        News news = new News(request.getTitle(), request.getContent(), request.getAuthor());
        News savedNews = newsDao.saveNews(news);
        
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
        
        News news = newsDao.findNewsById(id)
                .orElseThrow(() -> new RuntimeException("News not found with ID: " + id));

        news.updateNews(request.getTitle(), request.getContent(), request.getAuthor());
        News updatedNews = newsDao.saveNews(news);
        
        NewsDto.Response response = convertToResponse(updatedNews);
        logServiceResult("updateNews", response);
        
        return response;
    }

    public void deleteNews(Long id) {
        logServiceCall("deleteNews", id);
        
        validatePositive(id, "News ID");
        
        if (!newsDao.existsById(id)) {
            throw new RuntimeException("News not found with ID: " + id);
        }
        
        newsDao.deleteNews(id);
        logServiceResult("deleteNews", "Success");
    }

    public NewsDto.Response publishNews(Long id) {
        logServiceCall("publishNews", id);
        
        validatePositive(id, "News ID");
        
        News news = newsDao.findNewsById(id)
                .orElseThrow(() -> new RuntimeException("News not found with ID: " + id));

        news.publish();
        News publishedNews = newsDao.saveNews(news);
        
        NewsDto.Response response = convertToResponse(publishedNews);
        logServiceResult("publishNews", response);
        
        return response;
    }

    public NewsDto.Response unpublishNews(Long id) {
        logServiceCall("unpublishNews", id);
        
        validatePositive(id, "News ID");
        
        News news = newsDao.findNewsById(id)
                .orElseThrow(() -> new RuntimeException("News not found with ID: " + id));

        news.unpublish();
        News unpublishedNews = newsDao.saveNews(news);
        
        NewsDto.Response response = convertToResponse(unpublishedNews);
        logServiceResult("unpublishNews", response);
        
        return response;
    }

    public Page<NewsDto.Summary> searchNews(String keyword, boolean publishedOnly, Pageable pageable) {
        logServiceCall("searchNews", keyword, publishedOnly, pageable);
        
        validateNotEmpty(keyword, "Search keyword");
        
        List<News> newsList;
        if (publishedOnly) {
            newsList = newsDao.searchPublishedNewsByTitle(keyword);
        } else {
            newsList = newsDao.searchNewsByTitle(keyword);
        }
        
        List<NewsDto.Summary> summaryList = newsList.stream()
                .map(this::convertToSummary)
                .collect(Collectors.toList());
        
        Page<NewsDto.Summary> result = createPageFromList(summaryList, pageable);
        logServiceResult("searchNews", result);
        
        return result;
    }

    private NewsDto.Response convertToResponse(News news) {
        validateNotNull(news, "News");
        
        return new NewsDto.Response(
                news.getId(),
                news.getTitle(),
                news.getContent(),
                news.getAuthor(),
                news.isPublished(),
                news.getCreatedAt(),
                news.getUpdatedAt()
        );
    }

    private NewsDto.Summary convertToSummary(News news) {
        validateNotNull(news, "News");
        
        return new NewsDto.Summary(
                news.getId(),
                news.getTitle(),
                news.getAuthor(),
                news.isPublished(),
                news.getCreatedAt()
        );
    }
}