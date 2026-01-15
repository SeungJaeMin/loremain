// 텍스트 리소스 중앙 관리 파일
// 회사명 변경 시 이 파일만 수정하면 됩니다.

export const COMPANY = {
  name: "크팅미디어",
  nameEn: "CTINGMEDIA",
  description: "IP를 이용한 TCG, 미디어 콘텐츠, 커뮤니티를 운영하는 기업",
};

export const CONTACT = {
  email: "contact@ctingmedia.co.kr",
  ir: "ir@ctingmedia.co.kr",
  careers: "careers@ctingmedia.co.kr",
};

export const URLS = {
  community: "https://community.ctingmedia.co.kr",
  store: "https://store.ctingmedia.co.kr",
  social: {
    youtube: "https://youtube.com/@ctingmedia",
    instagram: "https://instagram.com/ctingmedia_official",
    discord: "https://discord.gg/ctingmedia",
    twitter: "https://twitter.com/ctingmedia_kr",
  },
};

export const PAGES = {
  companyInfo: {
    heroTitle: `About ${COMPANY.nameEn}`,
  },
  recruit: {
    introText: `We are looking for passionate and talented developers at ${COMPANY.nameEn}.`,
    whyJoinTitle: `Why Join ${COMPANY.nameEn}?`,
  },
  events: {
    launchEventTitle: `${COMPANY.nameEn} 런칭 이벤트`,
  },
};

// 기본 export
export default {
  COMPANY,
  CONTACT,
  URLS,
  PAGES,
};
