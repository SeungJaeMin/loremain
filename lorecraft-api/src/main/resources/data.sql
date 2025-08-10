-- Company 초기 데이터
INSERT INTO entity_company (id, name, established, ceo, address, business, employees, capital, created_at, updated_at) VALUES
(1, 'LORECRAFT', '2025년', '홍길동', '경기도 수원시 어딘가구 어딘가길 123', 'IP개발, TCG, 커뮤니티, 콘텐츠 플랫폼 서비스', '5명', '-', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- News 초기 데이터
INSERT INTO entity_news (id, title, content, author, published, created_at, updated_at, category, hero_image) VALUES
(1, 'LORECRAFT 공식 웹사이트 오픈!', '<h2>안녕하세요, LORECRAFT입니다!</h2><p>드디어 저희의 새로운 웹사이트가 공식 오픈했습니다. 앞으로 이곳에서 다양한 소식들을 전해드리겠습니다.</p><h3>주요 콘텐츠</h3><ul><li>게임 개발 소식</li><li>커뮤니티 이벤트</li><li>업데이트 정보</li></ul><p>많은 관심 부탁드립니다!</p>', '운영팀', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'announcement', '/images/news/news-1-hero.jpg'),
(2, 'TCG Estela 베타 테스트 시작', '<h2>Estela 베타 테스트 안내</h2><p>오랜 준비 끝에 TCG Estela의 베타 테스트를 시작합니다. 많은 분들의 참여를 기다리고 있습니다.</p><h3>베타 테스트 일정</h3><ul><li>신청 기간: 2025년 1월 20일 ~ 1월 31일</li><li>테스트 기간: 2025년 2월 1일 ~ 2월 28일</li><li>참가 인원: 선착순 1,000명</li></ul><p>자세한 내용은 공식 디스코드를 확인해주세요.</p>', '개발팀', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'game', '/images/news/news-2-hero.jpg'),
(3, '2025 로드맵 공개', '<h2>2025년 LORECRAFT 로드맵</h2><p>올해 LORECRAFT가 준비하고 있는 프로젝트들을 소개합니다.</p><h3>Q1 - Q2</h3><ul><li>TCG Estela 정식 출시</li><li>글로벌 서비스 확대</li></ul><h3>Q3 - Q4</h3><ul><li>신규 IP 개발</li><li>커뮤니티 플랫폼 강화</li><li>e스포츠 대회 개최</li></ul><p>자세한 내용은 추후 공개 예정입니다.</p>', '기획팀', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'announcement', '/images/news/news-3-hero.jpg'),
(4, '개발자 인터뷰: 게임 디자인 철학', '<h2>개발자 인터뷰</h2><p>이번에는 게임 디자인 팀장과의 인터뷰를 준비했습니다.</p><blockquote>"좋은 게임은 플레이어와 소통하는 게임입니다."</blockquote><p>더 자세한 내용은 본문에서 확인하세요...</p>', '홍보팀', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'interview', NULL),
(5, '커뮤니티 이벤트 당첨자 발표', '<h2>이벤트 당첨자 발표</h2><p>지난 주 진행된 커뮤니티 이벤트의 당첨자를 발표합니다.</p><h3>당첨자 명단</h3><ul><li>1등: User_001</li><li>2등: User_002</li><li>3등: User_003</li></ul><p>당첨되신 분들께는 개별 연락드리겠습니다.</p>', '운영팀', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'event', NULL);

-- News Tags 초기 데이터
INSERT INTO entity_news_tags (entity_news_id, tags) VALUES
(1, 'website'), (1, 'launch'), (1, 'news'),
(2, 'tcg'), (2, 'estela'), (2, 'beta'), (2, 'test'),
(3, 'roadmap'), (3, '2025'), (3, 'planning'),
(4, 'developer'), (4, 'design'), (4, 'philosophy'),
(5, 'community'), (5, 'event'), (5, 'winner');

-- Event 초기 데이터
INSERT INTO entity_event (id, title, content, event_date, registration_required, max_participants, current_participants, published, created_at, updated_at, location, category, hero_image) VALUES
(1, 'TCG Estela 출시 기념 이벤트', '<h2>Estela 출시를 축하합니다!</h2><p>TCG Estela의 정식 출시를 기념하여 특별 이벤트를 준비했습니다.</p><h3>이벤트 내용</h3><ul><li>신규 가입자 보너스 카드팩 증정</li><li>일일 로그인 보상 2배</li><li>한정판 카드 획득 기회</li></ul>', '2025-03-01 10:00:00', false, 0, 0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Online', 'game_launch', '/images/events/event-1-hero.jpg'),
(2, '오프라인 팬미팅', '<h2>첫 번째 오프라인 팬미팅</h2><p>LORECRAFT와 함께하는 특별한 시간을 준비했습니다.</p><h3>프로그램</h3><ul><li>개발진과의 만남</li><li>게임 시연 및 체험</li><li>Q&A 세션</li><li>경품 추첨</li></ul><p>사전 등록이 필요합니다.</p>', '2025-03-15 14:00:00', true, 100, 45, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '서울특별시 강남구', 'meetup', '/images/events/event-2-hero.jpg'),
(3, '베타 테스터 모집', '<h2>신규 콘텐츠 베타 테스터 모집</h2><p>새로운 게임 모드의 베타 테스터를 모집합니다.</p><h3>모집 요강</h3><ul><li>모집 인원: 200명</li><li>테스트 기간: 2주</li><li>참가 보상: 특별 뱃지 및 인게임 재화</li></ul>', '2025-03-20 00:00:00', true, 200, 150, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Online', 'recruitment', NULL),
(4, '봄맞이 특별 세일', '<h2>봄맞이 특별 할인 이벤트</h2><p>모든 인게임 아이템 30% 할인!</p>', '2025-04-01 00:00:00', false, 0, 0, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Online', 'promotion', NULL);

