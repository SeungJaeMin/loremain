-- Basic company information data
INSERT INTO company (name, established, ceo, address, business, employees, capital, created_at, updated_at) 
VALUES ('LORECRAFT', '2025year', 'Hong Gil-dong', 'Gyeonggi Suwon Somewhere 123', 
        'IP Development, TCG, Community, Content Platform Service', '5people', 'N/A', NOW(), NOW());

-- Sample news data
INSERT INTO news (title, content, author, published, created_at, updated_at)
VALUES 
('LORECRAFT Official Launch', 'LORECRAFT providing new entertainment experiences with creative content and innovative technology has been officially launched.', 'Administrator', true, NOW(), NOW()),
('New TCG Game Development Started', 'We have started developing new TCG games using unique IP.', 'Development Team', true, NOW(), NOW()),
('Community Platform Open Beta', 'Open beta of online community platform for gamers and fans begins.', 'Community Team', false, NOW(), NOW());

-- Sample event data
INSERT INTO event (title, content, event_date, location, max_participants, current_participants, registration_required, published, created_at, updated_at)
VALUES 
('LORECRAFT Launch Event', 'Join our launch event for a new beginning!', '2025-09-01 14:00:00', 'Seoul Gangnam-gu', 100, 0, true, true, NOW(), NOW()),
('TCG Tournament', 'Tournament to find the best TCG player.', '2025-10-15 10:00:00', 'Busan Haeundae-gu', 50, 0, true, true, NOW(), NOW()),
('Community Meeting', 'Offline meeting with online community members', '2025-08-20 19:00:00', 'Online', null, 0, false, false, NOW(), NOW());