// App.jsx
import { useState, useEffect } from "react";
import "./styles.css";

// 로딩 애니메이션 컴포넌트
function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-bg" />
      <div className="ink-spread-container">
        <div className="ink-blob ink-blob-1" />
        <div className="ink-blob ink-blob-2" />
        <div className="ink-blob ink-blob-3" />
        <div className="ink-blob ink-blob-4" />
      </div>
      
      <div className="loading-title-container">
        <h1 className="loading-title-main">
          <span className="brush-char" style={{ animationDelay: '1.5s' }}>마</span>
          <span className="brush-char" style={{ animationDelay: '1.7s' }}>교</span>
          <span className="brush-char" style={{ animationDelay: '1.9s' }}>주</span>
          <span className="brush-char" style={{ animationDelay: '2.1s' }}>야</span>
          <span className="brush-char" style={{ animationDelay: '2.3s' }}>담</span>
        </h1>
        <h2 className="loading-title-sub">
          <span className="brush-char-cn" style={{ animationDelay: '2.6s' }}>魔</span>
          <span className="brush-char-cn" style={{ animationDelay: '2.7s' }}>敎</span>
          <span className="brush-char-cn" style={{ animationDelay: '2.8s' }}>主</span>
          <span className="brush-char-cn" style={{ animationDelay: '2.9s' }}>夜</span>
          <span className="brush-char-cn" style={{ animationDelay: '3.0s' }}>談</span>
        </h2>
      </div>
    </div>
  );
}

const tabs = [
  { id: "intro", label: "소개", subtitle: "이야기의 시작" },
  { id: "world", label: "세계관", subtitle: "천마신교의 세상" },
  { id: "characters", label: "등장인물", subtitle: "운명의 주인공들" },
  { id: "player", label: "etc", subtitle: "당신의 이야기" },
];

// 캐릭터 데이터
const characters = {
  protagonist: {
    name: "소교주",
    title: "천마의 아들",
    group: "교주 직속",
    rank: "소교주",
    description: "죽은 천마의 아들이자 현 천마신교의 후계자. 겉으로는 근엄하지만 속은 현대인의 멘탈을 가진 빙의자.",
    personality: "현대적 사고방식과 마교의 전통 사이에서 균형을 잡으려 노력하는 리더",
    specialAbility: "천마신공 계승자"
  },
  wimujin: {
    name: "위무진",
    title: "대호법",
    group: "교주 직속",
    rank: "대호법",
    description: "충성심 과다의 원칙주의자. 교주바라기지만 융통성이 없어 때로는 피곤한 스타일.",
    personality: "강직하고 원칙적이며, 교주에 대한 충성심이 하늘을 찌름",
    specialAbility: "절대 충성"
  },
  danyoung: {
    name: "단영",
    title: "좌호법",
    group: "교주 직속",
    rank: "좌호법",
    description: "차가운 독설가이자 효율성 성애자. 팩트 폭력으로 소교주의 멘탈을 갉아먹는다.",
    personality: "냉철한 현실주의자, 감정보다 효율을 우선시",
    specialAbility: "독설과 전략"
  },
  cheonghwi: {
    name: "청휘",
    title: "우호법",
    group: "교주 직속",
    rank: "우호법",
    description: "싸움과 쾌락에 미친 천재. 통제 불능의 사고뭉치이지만 실력만큼은 확실하다.",
    personality: "자유분방하고 충동적, 전투광",
    specialAbility: "천재적 무공"
  },
  hyunmuhong: {
    name: "현무홍",
    title: "현마검가 가주",
    group: "장로원",
    rank: "장로",
    description: "고고한 귀족병 말기 환자. 피 튀기는 걸 싫어하는 무인으로, 우아함을 추구한다.",
    personality: "귀족적이고 품위를 중시하는 완벽주의자",
    specialAbility: "현마검법"
  },
  mongyehwa: {
    name: "몽예화",
    title: "몽환마가 가주",
    group: "장로원",
    rank: "장로",
    description: "관심 종자이자 공주병 환자. 기분이 곧 태도가 되는 변덕스러운 성격.",
    personality: "감정 기복이 심하고 관심받기를 좋아함",
    specialAbility: "환술"
  },
  seolhanga: {
    name: "설항아",
    title: "빙백마가 가주",
    group: "장로원",
    rank: "장로",
    description: "추위를 많이 타는 빙공 고수. 동생 설묘령이 사고 칠까 봐 전전긍긍한다.",
    personality: "조용하고 신중하며, 동생을 극진히 아끼는 누나",
    specialAbility: "빙백신공"
  },
  dangbiyeon: {
    name: "당비연",
    title: "독혈마가 가주",
    group: "장로원",
    rank: "장로",
    description: "끈적한 집착녀. 소교주를 장난감 취급하며 호시탐탐 노린다.",
    personality: "집착적이고 소유욕이 강하며, 위험한 매력을 가짐",
    specialAbility: "독공"
  },
  hyulajin: {
    name: "혈아진",
    title: "혈의마가 가주",
    group: "장로원",
    rank: "장로",
    description: "고통을 즐기는 매드 사이언티스트. 피를 보면 환장하는 위험인물.",
    personality: "광기 어린 연구자, 고통에 대한 병적인 집착",
    specialAbility: "혈의술"
  },
  cheonihyun: {
    name: "천이현",
    title: "천기마가 가주",
    group: "장로원",
    rank: "장로",
    description: "웃는 얼굴로 뒤통수치는 하라구로 책사. 속을 알 수 없는 인물.",
    personality: "계산적이고 음흉하며, 항상 한 수 앞을 내다봄",
    specialAbility: "전략과 계략"
  },
  yeonyuhwa: {
    name: "연유화",
    title: "흑산마가 가주",
    group: "장로원",
    rank: "장로",
    description: "츤데레 쿨뷰티. 귀찮아하면서도 은근히 챙겨주는 반전 매력.",
    personality: "겉으로는 냉담하지만 내면은 따뜻한 츤데레",
    specialAbility: "흑산신공"
  },
  geumchaerin: {
    name: "금채린",
    title: "재정총관",
    group: "기타 실무진",
    rank: "총관",
    description: "돈에 죽고 돈에 사는 자본주의 괴물. 교단 예산의 수호자.",
    personality: "철저한 현실주의자, 돈과 효율을 최우선으로",
    specialAbility: "재정 관리"
  },
  somirang: {
    name: "소미랑",
    title: "시녀장",
    group: "기타 실무진",
    rank: "시녀장",
    description: "웃으며 뼈 때리는 온화한 시녀장. 생활력이 만렙인 살림꾼.",
    personality: "온화하지만 날카로운 통찰력을 가진 생활의 달인",
    specialAbility: "완벽한 시중"
  },
  muhongrin: {
    name: "무홍린",
    title: "친위대장",
    group: "친위대",
    rank: "대장",
    description: "융통성 제로의 철혈 여전사. 명령 위반 시 자기 자신도 처벌하려 드는 고지식한 충신.",
    personality: "원칙적이고 엄격하며, 자기 자신에게도 가혹함",
    specialAbility: "절대 복종"
  },
  jingwang: {
    name: "진광",
    title: "친위대 대원",
    group: "친위대",
    rank: "대원",
    description: "머리보다 몸이 먼저 나가는 열혈 바보. 한쪽 눈을 잃고도 싸움이 즐거운 비글.",
    personality: "단순하고 열정적이며, 전투를 즐기는 순수한 무인",
    specialAbility: "불굴의 투지"
  }
};

// 그룹별 캐릭터 분류
const characterGroups = {
  "플레이어(User)": [
    { id: "protagonist", name: "소교주", title: "천마의 아들" }
  ],
  "교주 직속": [
    { id: "wimujin", name: "위무진", title: "대호법" },
    { id: "danyoung", name: "단영", title: "좌호법" },
    { id: "cheonghwi", name: "청휘", title: "우호법" }
  ],
  "장로원": [
    { id: "hyunmuhong", name: "현무홍", title: "현마검가" },
    { id: "mongyehwa", name: "몽예화", title: "몽환마가" },
    { id: "seolhanga", name: "설항아", title: "빙백마가" },
    { id: "dangbiyeon", name: "당비연", title: "독혈마가" },
    { id: "hyulajin", name: "혈아진", title: "혈의마가" },
    { id: "cheonihyun", name: "천이현", title: "천기마가" },
    { id: "yeonyuhwa", name: "연유화", title: "흑산마가" }
  ],
  "기타 실무진": [
    { id: "geumchaerin", name: "금채린", title: "재정총관" },
    { id: "somirang", name: "소미랑", title: "시녀장" }
  ],
  "친위대": [
    { id: "muhongrin", name: "무홍린", title: "친위대장" },
    { id: "jingwang", name: "진광", title: "친위대원" }
  ]
};

// 탭별 콘텐츠
const tabContent = {
  intro: {
    items: [
      {
        title: "장르",
        content: "무협 판타지",
        icon: "⚔️"
      },
      {
        title: "배경",
        content: "명나라 시대, 십만대산에 위치한 천마신교",
        icon: "🏮"
      },
      {
        title: "주제",
        content: "권력, 충성, 그리고 생존",
        icon: "🌙"
      }
    ]
  },
  world: {
    items: [
      {
        title: "천마신교의 정체성",
        content: "오직 힘이 곧 정의인 곳. '강자존' 사상 아래 실력만 있다면 신분도, 출신도 묻지 않는다. 정파의 위선을 혐오하며, 교주의 권위는 절대적이다.",
        badge: "핵심"
      },
      {
        title: "내성(內城)",
        content: "무공을 익힌 교도들의 요새이자 교주가 거주하는 권력의 심장부. 만마전과 각종 관청이 위치한 천마신교의 중심지.",
        badge: "지리"
      },
      {
        title: "외성(外城)",
        content: "일반 교도와 가족들이 사는 평범한 산중 마을. 시장과 농경지가 있어 자급자족이 가능한 생활 공간.",
        badge: "지리"
      }
    ]
  }
};

// 캐릭터 프로필 모달
function CharacterProfile({ character, onClose }) {
  if (!character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="profile-image-box">
              <div className="profile-aura" />
              <span className="profile-placeholder">초상(肖像)</span>
            </div>
            <h2 className="profile-name">{character.name}</h2>
            <div className="profile-title">{character.title}</div>
          </div>
          
          <div className="profile-main">
            <div className="profile-section">
              <h3 className="profile-section-title">기본 정보</h3>
              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <span className="profile-label">소속</span>
                  <span className="profile-value">{character.group}</span>
                </div>
                <div className="profile-info-item">
                  <span className="profile-label">직위</span>
                  <span className="profile-value">{character.rank}</span>
                </div>
              </div>
            </div>
            
            <div className="profile-section">
              <h3 className="profile-section-title">인물 소개</h3>
              <p className="profile-description">{character.description}</p>
            </div>
            
            <div className="profile-section">
              <h3 className="profile-section-title">성격</h3>
              <p className="profile-description">{character.personality}</p>
            </div>
            
            <div className="profile-section">
              <h3 className="profile-section-title">특기</h3>
              <p className="profile-description">{character.specialAbility}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  
  const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];
  const content = tabContent[activeTab];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleCharacterClick = (characterId) => {
    setSelectedCharacter(characters[characterId]);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {selectedCharacter && (
        <CharacterProfile 
          character={selectedCharacter} 
          onClose={() => setSelectedCharacter(null)} 
        />
      )}
      
      <div className="page">
        <header className="banner">
          <div 
            className="banner-overlay"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
          
          <nav className="nav">
            <div className="logo">
              <span className="logo-icon">☯</span>
              <span className="logo-text">마교주야담</span>
            </div>
          </nav>
          
          <div className="banner-title">
            <div className="title-decoration top" />
            <h1 className="main-title">
              <span className="title-ko">마교주야담</span>
              <span className="title-divider">·</span>
              <span className="title-cn">魔敎主夜談</span>
            </h1>
            <p className="subtitle">밤마다 펼쳐지는 마교주의 이야기</p>
            <div className="title-decoration bottom" />
          </div>

          <div className="banner-scroll-indicator">
            <div className="scroll-line" />
            <span className="scroll-text">SCROLL</span>
          </div>
        </header>

        <nav className="mid-nav">
          <div className="mid-nav-inner">
            <ul className="mid-nav-list">
              {tabs.map((tab, index) => (
                <li key={tab.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <button
                    className={`mid-nav-button${
                      activeTab === tab.id ? " is-active" : ""
                    }`}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="tab-label">{tab.label}</span>
                    {activeTab === tab.id && <div className="tab-indicator" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <main className="main">
          <div className={`section-head ${isVisible ? 'visible' : ''}`}>
            <div className="section-title-wrapper">
              <div className="section-ornament left">◆</div>
              <div>
                <h2 className="section-title">{currentTab.label}</h2>
                <p className="section-subtitle">{currentTab.subtitle}</p>
              </div>
              <div className="section-ornament right">◆</div>
            </div>
          </div>
          
          {activeTab === 'characters' ? (
            <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s' }}>
              {Object.entries(characterGroups).map(([groupName, chars], groupIndex) => (
                <div 
                  key={groupName} 
                  className="character-group"
                  style={{ animationDelay: `${groupIndex * 0.2}s` }}
                >
                  <h3 className="character-group-title">{groupName}</h3>
                  <div
                    className={`character-grid${
                      chars.length <= 2 ? " character-grid--compact" : ""
                    }`}
                  >
                    {chars.map((char) => (
                      <div
                        key={char.id}
                        className="character-card"
                        onClick={() => handleCharacterClick(char.id)}
                      >
                        <div className="character-image">
                          <span className="character-placeholder">초상</span>
                        </div>
                        <h3 className="character-name">{char.name}</h3>
                        <div className="character-title">{char.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : content ? (
            <div
              className={`content-grid ${isVisible ? 'visible' : ''}${
                activeTab === "world" ? " content-grid--world" : ""
              }`}
            >
              {content.items.map((item, index) => (
                <article 
                  key={index} 
                  className="content-card"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="card-header">
                    {item.icon && <div className="card-icon">{item.icon}</div>}
                    {item.badge && (
                      <span className="card-badge">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-content">{item.content}</p>
                  <div className="card-footer">
                    <div className="card-ornament" />
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </main>

        <footer className="footer">
          <div className="footer-ornament" />
          <p className="footer-text">
            <span className="footer-symbol">◈</span>
            © 2026 마교주야담. All rights reserved.
            <span className="footer-symbol">◈</span>
          </p>
          <div className="footer-ornament" />
        </footer>
      </div>
    </>
  );
}