package com.lorecraft.api.service.base;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Transactional
public abstract class BaseService {
    
    protected final Logger logger = LoggerFactory.getLogger(getClass());
    
    protected static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    protected void logServiceCall(String methodName, Object... params) {
        logger.debug("Service call: {} with params: {}", methodName, params);
    }
    
    protected void logServiceResult(String methodName, Object result) {
        logger.debug("Service result: {} returned: {}", methodName, result != null ? result.getClass().getSimpleName() : "null");
    }
    
    protected String formatDateTime(LocalDateTime dateTime) {
        return dateTime != null ? dateTime.format(DATE_FORMATTER) : null;
    }
    
    protected void validateNotNull(Object obj, String paramName) {
        if (obj == null) {
            throw new IllegalArgumentException(paramName + " cannot be null");
        }
    }
    
    protected void validateNotEmpty(String str, String paramName) {
        if (str == null || str.trim().isEmpty()) {
            throw new IllegalArgumentException(paramName + " cannot be null or empty");
        }
    }
    
    protected void validatePositive(Long number, String paramName) {
        if (number == null || number <= 0) {
            throw new IllegalArgumentException(paramName + " must be positive");
        }
    }
    
    protected <T> org.springframework.data.domain.Page<T> createPageFromList(java.util.List<T> list, org.springframework.data.domain.Pageable pageable) {
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), list.size());
        
        java.util.List<T> pageContent = list.subList(start, end);
        
        return new org.springframework.data.domain.PageImpl<>(pageContent, pageable, list.size());
    }
}