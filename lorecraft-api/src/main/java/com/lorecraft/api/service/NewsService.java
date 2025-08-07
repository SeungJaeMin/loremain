package com.lorecraft.api.service;

import com.lorecraft.api.dto.NewsDto;
import com.lorecraft.api.entity.News;
import com.lorecraft.api.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class NewsService {

    private final NewsRepository newsRepository;

    @Autowired
    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @Transactional(readOnly = true)
    public Page<NewsDto.Summary> getPublishedNewsList(Pageable pageable) {
        Page<News> newsPage = newsRepository.findByPublishedTrue(pageable);
        return newsPage.map(this::convertToSummary);
    }

    @Transactional(readOnly = true)
    public Page<NewsDto.Summary> getAllNewsList(Pageable pageable) {
        Page<News> newsPage = newsRepository.findAllOrderByCreatedAtDesc(pageable);
        return newsPage.map(this::convertToSummary);
    }

    @Transactional(readOnly = true)
    public NewsDto.Response getNewsDetail(Long id) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("뉴스를 찾을 수 없습니다."));
        
        return convertToResponse(news);
    }

    public NewsDto.Response createNews(NewsDto.Request request) {
        News news = new News(request.getTitle(), request.getContent(), request.getAuthor());
        News savedNews = newsRepository.save(news);
        return convertToResponse(savedNews);
    }

    public NewsDto.Response updateNews(Long id, NewsDto.Request request) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("뉴스를 찾을 수 없습니다."));

        news.updateNews(request.getTitle(), request.getContent(), request.getAuthor());
        News updatedNews = newsRepository.save(news);
        return convertToResponse(updatedNews);
    }

    public void deleteNews(Long id) {
        if (!newsRepository.existsById(id)) {
            throw new RuntimeException("뉴스를 찾을 수 없습니다.");
        }
        newsRepository.deleteById(id);
    }

    public NewsDto.Response publishNews(Long id) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("뉴스를 찾을 수 없습니다."));

        news.publish();
        News publishedNews = newsRepository.save(news);
        return convertToResponse(publishedNews);
    }

    public NewsDto.Response unpublishNews(Long id) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("뉴스를 찾을 수 없습니다."));

        news.unpublish();
        News unpublishedNews = newsRepository.save(news);
        return convertToResponse(unpublishedNews);
    }

    @Transactional(readOnly = true)
    public Page<NewsDto.Summary> searchNews(String keyword, boolean publishedOnly, Pageable pageable) {
        Page<News> newsPage;
        if (publishedOnly) {
            newsPage = newsRepository.findByTitleContainingIgnoreCaseAndPublishedTrue(keyword, pageable);
        } else {
            newsPage = newsRepository.findByTitleContainingIgnoreCase(keyword, pageable);
        }
        return newsPage.map(this::convertToSummary);
    }

    private NewsDto.Response convertToResponse(News news) {
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
        return new NewsDto.Summary(
                news.getId(),
                news.getTitle(),
                news.getAuthor(),
                news.isPublished(),
                news.getCreatedAt()
        );
    }
}