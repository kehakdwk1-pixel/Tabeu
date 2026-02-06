import { useState, useEffect } from "react";

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
      {/* 배경 이미지 */}
      <div className="loading-bg" />
      
      {/* 먹물 번짐 효과 */}
      <div className="ink-spread-container">
        <div className="ink-blob ink-blob-1" />
        <div className="ink-blob ink-blob-2" />
        <div className="ink-blob ink-blob-3" />
        <div className="ink-blob ink-blob-4" />
      </div>
      
      {/* 타이틀 텍스트 */}
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
  { id: "world", label: "세계관", subtitle: "마교가 지배하는 세상" },
  { id: "characters", label: "등장인물", subtitle: "운명의 주인공들" },
  { id: "stories", label: "에피소드", subtitle: "밤의 이야기" },
];

// 각 탭별 콘텐츠
const tabContent = {
  intro: {
    title: "마교주야담",
    description: "밤마다 펼쳐지는 마교주의 이야기",
    items: [
      {
        title: "장르",
        content: "무협 판타지",
        icon: "⚔️"
      },
      {
        title: "배경",
        content: "마교가 지배하는 강호",
        icon: "🏮"
      },
      {
        title: "주제",
        content: "권력, 복수, 그리고 운명",
        icon: "🌙"
      }
    ]
  },
  world: {
    title: "세계관",
    description: "마교가 지배하는 강호의 모습",
    items: [
      {
        title: "마교(魔敎)",
        content: "강호를 지배하는 절대 권력. 교주를 정점으로 사대 천왕과 십이 마사가 이끈다.",
        badge: "핵심"
      },
      {
        title: "정파(正派)",
        content: "무림맹을 중심으로 마교에 저항하는 세력. 하지만 내부 분열로 약화되었다.",
        badge: "대립"
      },
      {
        title: "혈룡성",
        content: "마교주가 거처하는 거대한 요새. 누구도 함부로 접근할 수 없는 성역.",
        badge: "장소"
      }
    ]
  },
  characters: {
    title: "등장인물",
    description: "이야기의 중심에 선 자들",
    items: [
      {
        title: "천마교주 혈무진",
        content: "마교의 절대자. 냉혹하지만 카리스마 넘치는 인물로, 밤마다 자신의 이야기를 풀어놓는다.",
        badge: "주인공",
        color: "red"
      },
      {
        title: "검성 소요화",
        content: "정파의 마지막 희망. 마교주에게 복수를 맹세한 천재 검객.",
        badge: "라이벌",
        color: "blue"
      },
      {
        title: "사천왕 귀면",
        content: "마교 사대 천왕의 수장. 교주의 오른팔이자 그림자.",
        badge: "조력자",
        color: "purple"
      }
    ]
  },
  stories: {
    title: "에피소드",
    description: "밤마다 펼쳐지는 이야기들",
    items: [
      {
        title: "제1야: 피의 즉위식",
        content: "새로운 마교주의 탄생. 혈무진이 교주의 자리에 오르기까지의 치열한 권력 다툼.",
        badge: "1화"
      },
      {
        title: "제2야: 검성의 도전",
        content: "정파의 천재 소요화가 혈룡성에 단신으로 침입하다.",
        badge: "2화"
      },
      {
        title: "제3야: 과거의 그림자",
        content: "마교주의 숨겨진 과거가 드러나기 시작한다.",
        badge: "3화"
      }
    ]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];
  const content = tabContent[activeTab] || tabContent.intro;

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

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div className="page">
        <header className="banner">
          <div 
            className="banner-overlay"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
          
          <nav className="nav">
            <div className="logo">
              <span className="logo-icon">☯</span>
              <span className="logo-text">김타브</span>
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
          
          <div className={`content-grid ${isVisible ? 'visible' : ''}`}>
            {content.items.map((item, index) => (
              <article 
                key={index} 
                className="content-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="card-header">
                  {item.icon && <div className="card-icon">{item.icon}</div>}
                  {item.badge && (
                    <span className={`card-badge ${item.color || ''}`}>
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
        </main>

        <footer className="footer">
          <div className="footer-ornament" />
          <p className="footer-text">
            <span className="footer-symbol">◈</span>
            © 2026 김타브. All rights reserved.
            <span className="footer-symbol">◈</span>
          </p>
          <div className="footer-ornament" />
        </footer>
      </div>
    </>
  );
}