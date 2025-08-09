package com.lorecraft.api.common.mockdata;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Component;

import com.lorecraft.api.entity.EntityCompany;
import com.lorecraft.api.entity.EntityEvent;
import com.lorecraft.api.entity.EntityNews;
import com.lorecraft.api.entity.EntityUser;

import jakarta.annotation.PostConstruct;

@Component
public class MockDataProvider {
    
    // Thread-safe collections for mock data
    private final Map<Long, EntityCompany> companyData = new ConcurrentHashMap<>();
    private final Map<Long, EntityNews> newsData = new ConcurrentHashMap<>();
    private final Map<Long, EntityEvent> eventData = new ConcurrentHashMap<>();
    private final Map<Long, EntityUser> userData = new ConcurrentHashMap<>();
    
    // ID generators
    private final AtomicLong companyIdGenerator = new AtomicLong(1);
    private final AtomicLong newsIdGenerator = new AtomicLong(1);
    private final AtomicLong eventIdGenerator = new AtomicLong(1);
    private final AtomicLong userIdGenerator = new AtomicLong(1);
    
    @PostConstruct
    public void initializeData() {
        initializeCompanyData();
        initializeNewsData();
        initializeEventData();
        initializeUserData();
    }
    
    private void initializeCompanyData() {
        EntityCompany company = createCompany(
            "LORECRAFT",
            "2025year", 
            "Hong Gil-dong",
            "Gyeonggi Suwon Somewhere 123",
            "IP Development, TCG, Community, Content Platform Service",
            "5people",
            "N/A"
        );
        companyData.put(1L, company);
    }
    
    private void initializeNewsData() {
        newsData.put(1L, createNews(
            "LORECRAFT Official Launch",
            """
            <h2>새로운 시작을 알리는 LORECRAFT</h2>
            <p>창의적인 콘텐츠와 혁신적인 기술로 새로운 엔터테인먼트 경험을 제공하는 LORECRAFT가 공식적으로 출범했습니다.</p>
            <img src="/images/news/news-1-hero.jpg" alt="LORECRAFT 런칭 이벤트" style="width: 100%; max-width: 800px; height: auto; margin: 20px 0;" />
            <h3>우리의 비전</h3>
            <p>LORECRAFT는 독창적인 지적 재산권(IP) 개발부터 TCG(Trading Card Game) 게임, 온라인 커뮤니티 플랫폼까지 다양한 콘텐츠 서비스를 통해 팬들과 게이머들에게 새로운 경험을 선사하고자 합니다.</p>
            <blockquote>
            <p>"우리는 단순히 게임을 만드는 것이 아니라, 하나의 세계관을 창조하여 사용자들이 그 안에서 자신만의 이야기를 만들어갈 수 있도록 돕고자 합니다." - 홍길동 대표</p>
            </blockquote>
            <img src="/images/news/news-1-content1.jpg" alt="개발팀 단체 사진" style="width: 100%; max-width: 600px; height: auto; margin: 20px 0;" />
            <h3>앞으로의 계획</h3>
            <ul>
            <li>독창적인 TCG 게임 개발</li>
            <li>커뮤니티 플랫폼 베타 서비스 시작</li>
            <li>IP 기반 콘텐츠 확장</li>
            <li>글로벌 서비스 론칭</li>
            </ul>
            <p>많은 관심과 응원 부탁드립니다!</p>
            """,
            "Administrator",
            Arrays.asList("/images/news/news-1-hero.jpg", "/images/news/news-1-content1.jpg"),
            "공지사항",
            Arrays.asList("런칭", "LORECRAFT", "시작", "공식발표"),
            "/images/news/news-1-hero.jpg",
            true
        ));
        
        newsData.put(2L, createNews(
            "🃏 혁신적인 TCG 게임 '미스틱 아레나' 개발 착수",
            """
            <h2>독창적인 세계관의 TCG 게임 미스틱 아레나</h2>
            <p>LORECRAFT가 자체 IP를 활용한 새로운 TCG(Trading Card Game) '미스틱 아레나' 개발에 본격 착수했습니다.</p>
            <img src="/images/news/news-2-hero.jpg" alt="미스틱 아레나 컨셉아트" style="width: 100%; max-width: 800px; height: auto; margin: 20px 0;" />
            <h3>게임의 독창적 시스템</h3>
            <ul>
            <li><strong>시공간 전투 시스템</strong>: 과거, 현재, 미래를 넘나드는 전투</li>
            <li><strong>진화형 캐릭터</strong>: 플레이어의 선택에 따라 성장하는 영웅들</li>
            <li><strong>하이브리드 플레이</strong>: 물리 카드와 디지털이 연동되는 새로운 경험</li>
            <li><strong>길드 시스템</strong>: 전 세계 플레이어들과 함께하는 대규모 전쟁</li>
            </ul>
            <h3>출시 계획</h3>
            <p>2025년 말 클로즈 베타 테스트를 시작으로, 2026년 상반기 정식 출시 예정입니다. 사전 등록자에게는 특별한 한정판 카드와 독점 아이템을 제공할 계획입니다.</p>
            <blockquote>
            <p>"미스틱 아레나는 단순한 카드 게임이 아닙니다. 플레이어가 직접 만들어가는 거대한 서사시가 될 것입니다." - 개발팀 리드 김민수</p>
            </blockquote>
            """,
            "Development Team",
            Arrays.asList("/images/news/news-2-hero.jpg"),
            "게임소식",
            Arrays.asList("TCG", "미스틱아레나", "게임개발", "카드게임", "베타테스트"),
            "/images/news/news-2-hero.jpg",
            true
        ));
        
        newsData.put(3L, createNews(
            "🌐 LORECRAFT 커뮤니티 허브 '길드하우스' 오픈 베타 시작",
            """
            <h2>모든 게이머들의 소통 공간, 길드하우스</h2>
            <p>LORECRAFT의 통합 커뮤니티 플랫폼 '길드하우스'가 드디어 오픈 베타 서비스를 시작합니다!</p>
            <img src="/images/news/news-3-hero.jpg" alt="길드하우스 메인 화면" style="width: 100%; max-width: 800px; height: auto; margin: 20px 0;" />
            <h3>길드하우스만의 특별한 기능</h3>
            <ul>
            <li><strong>실시간 게임 매칭</strong>: 같은 관심사를 가진 플레이어들과 즉시 매칭</li>
            <li><strong>창작 콘텐츠 공유</strong>: 팬아트, 스토리, 게임 공략 등을 자유롭게 공유</li>
            <li><strong>길드 시스템</strong>: 친구들과 함께 길드를 만들어 특별한 혜택 획득</li>
            <li><strong>이벤트 허브</strong>: 온/오프라인 이벤트 정보와 참여 기능</li>
            <li><strong>개발자 소통</strong>: 개발팀과 직접 소통할 수 있는 Q&A 코너</li>
            </ul>
            <h3>베타 테스터 모집</h3>
            <p>현재 1,000명의 베타 테스터를 모집 중입니다. 참여자 전원에게 특별한 기념품과 정식 오픈 시 프리미엄 멤버십 혜택을 드립니다!</p>
            <p><strong>신청 방법:</strong> 공식 홈페이지에서 간단한 설문 작성 후 신청</p>
            """,
            "Community Team",
            Arrays.asList("/images/news/news-3-hero.jpg"),
            "커뮤니티",
            Arrays.asList("길드하우스", "오픈베타", "커뮤니티", "플랫폼", "모집"),
            "/images/news/news-3-hero.jpg",
            false
        ));
    }
    
    private void initializeEventData() {
        eventData.put(1L, createEvent(
            "🎆 LORECRAFT 공식 런칭 파티 - 새로운 전설의 시작",
            """
            <h2>LORECRAFT 공식 런칭 이벤트에 여러분을 초대합니다!</h2>
            <p>새로운 시작을 함께 축하해주세요. 다양한 이벤트와 선물이 준비되어 있습니다.</p>
            <img src="/images/events/event-1-hero.jpg" alt="런칭 이벤트 포스터" style="width: 100%; max-width: 800px; height: auto; margin: 20px 0;" />
            <h3>이벤트 프로그램</h3>
            <ul>
            <li>14:00 - 개회식 및 환영사</li>
            <li>14:30 - LORECRAFT 소개 및 비전 발표</li>
            <li>15:00 - TCG 게임 시연</li>
            <li>15:30 - Q&A 세션</li>
            <li>16:00 - 네트워킹 시간</li>
            </ul>
            <h3>참여 혜택</h3>
            <p>참석하시는 모든 분께 특별한 기념품과 얼리버드 할인 혜택을 드립니다!</p>
            """,
            LocalDateTime.of(2025, 9, 1, 14, 0),
            "Seoul Gangnam-gu",
            100,
            0,
            true,
            Arrays.asList("/images/events/event-1-hero.jpg"),
            "런칭이벤트",
            Arrays.asList("런칭", "이벤트", "서울", "오프라인"),
            "/images/events/event-1-hero.jpg",
            true
        ));
        
        eventData.put(2L, createEvent(
            "⚔️ 미스틱 아레나 대회 - 시공간 첫 번째 챔피언을 가리자!",
            """
            <h2>최고의 시공간 전사를 찾습니다!</h2>
            <p>미스틱 아레나의 첫 번째 공식 토너먼트가 부산에서 개최됩니다. 시공간을 넘나드는 역대 최고의 대결을 목격하세요!</p>
            <img src="/images/events/event-2-hero.jpg" alt="미스틱 아레나 대회 포스터" style="width: 100%; max-width: 800px; height: auto; margin: 20px 0;" />
            <h3>토너먼트 상세 정보</h3>
            <ul>
            <li><strong>참가비:</strong> 무료 (사전 등록 시 기본 덱 제공)</li>
            <li><strong>상금 규모:</strong> 총 500만원 (우승 200만원, 준우승 100만원, 3위 50만원)</li>
            <li><strong>대회 형식:</strong> 5라운드 스위스 예선 + TOP 8 단일 제거 결선</li>
            <li><strong>특별 이벤트:</strong> 공식 코스플레이 콘테스트 동시 개최</li>
            <li><strong>특별 부상:</strong> 우승자에게 미스틱 아레나 공식 후원 자격 부여</li>
            </ul>
            <h3>참가 혜택</h3>
            <p>참가자 전원에게 특별 한정 커리어 카드와 공식 기념품을 증정! 사전 등록은 LORECRAFT 공식 홈페이지에서 가능합니다.</p>
            """,
            LocalDateTime.of(2025, 10, 15, 10, 0),
            "Busan Haeundae-gu",
            50,
            0,
            true,
            Arrays.asList("/images/events/event-2-hero.jpg"),
            "경대회",
            Arrays.asList("미스틱아레나", "TCG토너먼트", "부산", "경대회", "상금", "코스플레이"),
            "/images/events/event-2-hero.jpg",
            true
        ));
        
        eventData.put(3L, createEvent(
            "🎙️ 길드하우스 커뮤니티 토크 - 개발자와 함께하는 실시간 Q&A",
            """
            <h2>개발자와 직접 소통할 수 있는 특별한 시간!</h2>
            <p>LORECRAFT 개발팀과 직접 대화하고, 개발 소식과 업데이트 정보를 가장 빠르게 들을 수 있는 월례 커뮤니티 모임입니다.</p>
            <h3>이번 달 토크 주제</h3>
            <ul>
            <li><strong>미스틱 아레나 베타 테스트</strong> 참여 방법 및 일정</li>
            <li><strong>길드하우스 새 기능</strong> 미리보기</li>
            <li><strong>커뮤니티 이벤트</strong> 아이디어 제안 및 토론</li>
            <li><strong>자유 Q&A</strong> 세션 - 어떤 질문이든 환영!</li>
            </ul>
            <h3>참여 방법</h3>
            <p><strong>온라인 참여:</strong> 길드하우스 앱 또는 웹사이트에서 직접 참여 가능</p>
            <p><strong>사전 등록 없이</strong> 누구나 참여할 수 있으며, 대화방에서 실시간으로 소통하실 수 있습니다!</p>
            <h3>특별 혜택</h3>
            <p>참여자 전원에게 특별 커뮤니틴 배지와 길드하우스 전용 이모티콘을 증정!</p>
            """,
            LocalDateTime.of(2025, 8, 20, 19, 0),
            "Online",
            null,
            0,
            false,
            Arrays.asList(),
            "커뮤니티토크",
            Arrays.asList("길드하우스", "Q&A", "개발자토크", "온라인모임", "업데이트"),
            null,
            false
        ));
    }
    
    private void initializeUserData() {
        userData.put(1L, createUser(
            "admin",
            "$2a$10$encoded.password.hash",
            "admin@lorecraft.com",
            EntityUser.Role.ADMIN
        ));
        
        userData.put(2L, createUser(
            "user",
            "$2a$10$encoded.password.hash",
            "user@lorecraft.com",
            EntityUser.Role.USER
        ));
    }
    
    // Factory methods
    private EntityCompany createCompany(String name, String established, String ceo, 
                                 String address, String business, String employees, String capital) {
        EntityCompany company = new EntityCompany(name, established, ceo, address, business, employees, capital);
        setEntityId(company, companyIdGenerator.getAndIncrement());
        setEntityTimestamps(company);
        return company;
    }
    
    private EntityNews createNews(String title, String content, String author, boolean published) {
        EntityNews news = new EntityNews(title, content, author);
        setEntityId(news, newsIdGenerator.getAndIncrement());
        setEntityTimestamps(news);
        if (published) {
            news.publish();
        }
        return news;
    }
    
    private EntityNews createNews(String title, String content, String author, List<String> imageUrls,
                           String category, List<String> tags, String heroImage, boolean published) {
        EntityNews news = new EntityNews(title, content, author, imageUrls, category, tags, heroImage);
        setEntityId(news, newsIdGenerator.getAndIncrement());
        setEntityTimestamps(news);
        if (published) {
            news.publish();
        }
        return news;
    }
    
    private EntityEvent createEvent(String title, String content, LocalDateTime eventDate, 
                             String location, Integer maxParticipants, Integer currentParticipants,
                             boolean registrationRequired, boolean published) {
        EntityEvent event = new EntityEvent(title, content, eventDate, location, maxParticipants, registrationRequired);
        setEntityId(event, eventIdGenerator.getAndIncrement());
        setEntityTimestamps(event);
        if (published) {
            event.publish();
        }
        return event;
    }
    
    private EntityEvent createEvent(String title, String content, LocalDateTime eventDate,
                            String location, Integer maxParticipants, Integer currentParticipants,
                            boolean registrationRequired, List<String> imageUrls,
                            String category, List<String> tags, String heroImage, boolean published) {
        EntityEvent event = new EntityEvent(title, content, eventDate, location, maxParticipants, 
                                          registrationRequired, imageUrls, category, tags, heroImage);
        setEntityId(event, eventIdGenerator.getAndIncrement());
        setEntityTimestamps(event);
        if (published) {
            event.publish();
        }
        return event;
    }
    
    private EntityUser createUser(String username, String password, String email, EntityUser.Role role) {
        EntityUser user = new EntityUser(username, password, email, role);
        setEntityId(user, userIdGenerator.getAndIncrement());
        setEntityTimestamps(user);
        return user;
    }
    
    // Utility methods using reflection to set private fields
    private void setEntityId(Object entity, Long id) {
        try {
            var idField = entity.getClass().getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(entity, id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set entity ID", e);
        }
    }
    
    private void setEntityTimestamps(Object entity) {
        try {
            LocalDateTime now = LocalDateTime.now();
            
            var createdAtField = entity.getClass().getSuperclass().getDeclaredField("createdAt");
            createdAtField.setAccessible(true);
            createdAtField.set(entity, now);
            
            var updatedAtField = entity.getClass().getSuperclass().getDeclaredField("updatedAt");
            updatedAtField.setAccessible(true);
            updatedAtField.set(entity, now);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set entity timestamps", e);
        }
    }
    
    // Getter methods for DAO implementations
    public Map<Long, EntityCompany> getCompanyData() {
        return new ConcurrentHashMap<>(companyData);
    }
    
    public Map<Long, EntityNews> getNewsData() {
        return new ConcurrentHashMap<>(newsData);
    }
    
    public Map<Long, EntityEvent> getEventData() {
        return new ConcurrentHashMap<>(eventData);
    }
    
    public Map<Long, EntityUser> getUserData() {
        return new ConcurrentHashMap<>(userData);
    }
    
    // ID generators for new entities
    public Long getNextCompanyId() {
        return companyIdGenerator.incrementAndGet();
    }
    
    public Long getNextNewsId() {
        return newsIdGenerator.incrementAndGet();
    }
    
    public Long getNextEventId() {
        return eventIdGenerator.incrementAndGet();
    }
    
    public Long getNextUserId() {
        return userIdGenerator.incrementAndGet();
    }
}