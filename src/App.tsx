import { useState, useRef, useCallback, useEffect } from "react";
import "./app.css";

/* ═══════════ TYPES ═══════════ */
interface Character { id:number; name:string; hanja:string; title:string; alias:string; aliasH:string; group:string; realm:string; realmSub:string; arts:string; weapon:string; desc:string; accent:string; detailCount?:number; detailLabels?:string[]; }
interface Realm     { level:number; name:string; hanja:string; color:string; bar:number; desc:string; }
interface House     { name:string; hanja:string; dept:string; role:string; color:string; leader:string; desc:string; }

/* ═══════════ DATA ═══════════ */
const CHARS: Character[] = [
  { id:1,  name:"위무진", hanja:"魏武眞", title:"대호법",                  alias:"흑월검마", aliasH:"黑月劍魔", group:"교주직속", realm:"극마",   realmSub:"극(極)",    arts:"수라혈검 · 흑천마라신공",      weapon:"마검 흑신(黑神)",              desc:"교주의 가장 굳건한 검이자 그림자. 감정 표현이 거의 없는 냉철한 원칙주의자. 교단과 교주에 대한 충성심이 그의 모든 것을 지배하며, 패배를 개인의 수치이자 교단에 대한 불충으로 여긴다.", accent:"#c8a44a" },
  { id:2,  name:"단영",   hanja:"斷影",   title:"좌호법",                  alias:"흑면나찰", aliasH:"黑面羅刹", group:"교주직속", realm:"초절정", realmSub:"완숙(完熟)", arts:"뇌명쾌검 · 백뢰신공",          weapon:"연검 은린(銀鱗)",              desc:"암살과 첩보를 담당하는 교단의 칼날. 까칠한 독설가이자 완벽주의자이지만, 사실은 칭찬에 약한 츤데레. 일 외적인 부분에서는 놀라울 정도로 둔감한 면모를 보인다.", accent:"#a0b8d0" },
  { id:3,  name:"청휘",   hanja:"靑輝",   title:"우호법",                  alias:"청랑광마", aliasH:"靑狼狂魔", group:"교주직속", realm:"절정",   realmSub:"극(極)",    arts:"광염쌍룡검 · 청염수라공",      weapon:"아귀(餓鬼) & 나찰(羅刹)",      desc:"외부 강호와의 싸움을 즐기는 전투광. 자유분방하고 자기중심적인 천재로, 강자와의 싸움에서 쾌락을 느끼며 스스로를 극한으로 몰아붙이는 것을 즐긴다.", accent:"#70c090" },
  { id:4,  name:"금채린", hanja:"金彩璘", title:"재정총관",                alias:"참마재신", aliasH:"斬魔財神", group:"교주직속", realm:"일류",   realmSub:"입문(入門)", arts:"청랑파도법 · 황금만능공",       weapon:"언월도 금식(金息)",            desc:"돈을 신처럼 여기는 자본주의의 화신. 명랑하고 쾌활하지만, 돈 낭비는 절대 용납하지 않는 수전노. 교단의 재정 앞에서는 어떤 사적인 감정도 배제한다.", accent:"#e8c830" },
  { id:5,  name:"무홍린", hanja:"武紅麟", title:"친위대 대장",              alias:"철혈검화", aliasH:"鐵血劍花", group:"교주직속", realm:"절정",   realmSub:"완숙(完熟)", arts:"멸마참수검 · 천강불괴공",       weapon:"강검 적혈(赤血)",              desc:"규율과 명령을 절대적으로 여기는 강박적인 책임감의 소유자. 융통성 제로의 완벽주의자이지만, 전투 중에는 누구보다 먼저 부하를 보호하는 리더.", accent:"#e05050" },
  { id:6,  name:"진광",   hanja:"進光",   title:"친위대 대원",              alias:"독안광랑", aliasH:"獨眼狂狼", group:"교주직속", realm:"이류",   realmSub:"극(極)",    arts:"파천금강권 · 금강아기공",       weapon:"철염주 단죄(斷罪)",            desc:"생각보다 몸이 먼저 나가는 열혈 바보. 활발하고 씩씩하며, 맞아도 아랑곳하지 않는 비글미를 자랑한다. 교주에 대한 충성심이 매우 강하다.", accent:"#d09060" },
  { id:7,  name:"소미랑", hanja:"蘇美浪", title:"시녀장",                  alias:"홍화자모", aliasH:"紅花慈母", group:"교주직속", realm:"이류",   realmSub:"완숙(完熟)", arts:"홍화곤법 · 홍화보신공",         weapon:"장봉 가화(嘉禾)",              desc:"온화하고 다정한 외모와 달리, 피와 죽음에 무감각한 시녀장. 생활력은 강하지만, 악의 없이 웃으며 잔인한 말을 툭툭 내뱉는 무자각 폭력성을 지녔다.", accent:"#e090b0" },
  { id:8,  name:"현무홍", hanja:"玄武弘", title:"현마검가 가주 · 무경관주", alias:"현천검주", aliasH:"玄天劍主", group:"마도칠문", realm:"극마",   realmSub:"입문(入門)", arts:"현마검법 · 태을현마신공",       weapon:"마검 현영(玄影)",              desc:"고고하고 오만한 귀족. 혈통과 격을 중시하며, 피나 더러움 같은 추한 것을 병적으로 혐오한다. 타인을 가문의 격에 따라 나누어 대하는 선민의식이 강하다.", accent:"#9090e0" },
  { id:9,  name:"몽예화", hanja:"夢蕊華", title:"몽환마가 가주 · 천상관주", alias:"천음마희", aliasH:"天音魔姬", group:"마도칠문", realm:"절정",   realmSub:"극(極)",    arts:"몽환대법 · 섭혼음공",           weapon:"비파 화연(華筵)",              desc:"관심 중독 성향의 나르시시스트. 세상의 중심이 자신이라고 믿으며, 변덕스러운 기분에 따라 타인의 감정을 장난감처럼 가지고 논다.", accent:"#d080c0" },
  { id:10, name:"설항아", hanja:"雪姮娥", title:"빙백마가 가주 · 암류관주", alias:"빙궁선자", aliasH:"氷宮仙子", group:"마도칠문", realm:"극마",   realmSub:"입문(入門)", arts:"빙백신장 · 한빙검법",           weapon:"마검 빙루(氷淚)",              desc:"고요하고 냉정한 통제자. 감정을 거의 드러내지 않으며, 모든 것을 이성과 원칙에 따라 판단한다. 동생인 설묘령을 아끼며, 평소에는 추위를 많이 타 털목도리를 하고 다닌다.", accent:"#90c8e8" },
  { id:11, detailCount:2, detailLabels:["가면","얼굴"], name:"설묘령", hanja:"雪卯玲", title:"빙백마가 소가주 · 집행인", alias:"한월귀묘", aliasH:"寒月鬼卯", group:"마도칠문", realm:"절정",   realmSub:"입문(入門)", arts:"설묘광검 · 빙백광공",           weapon:"마검 백야(白夜)",              desc:"우아한 사이코패스. 살인을 '구원'이라 여기며 자신의 모든 행위를 선행이라 믿는 비틀린 자비심을 가졌다. 나른한 광기와 풍부한 감수성이 공존하는 독특한 인물.", accent:"#b0d8f0" },
  { id:12, name:"당비연", hanja:"唐翡鳶", title:"독혈마가 가주 · 흑문관주", alias:"녹사마후", aliasH:"綠蛇魔后", group:"마도칠문", realm:"초절정", realmSub:"완숙(完熟)", arts:"혈독수 · 사영암혼",              weapon:"마조 비취(翡翠) · 독침",       desc:"능글맞고 교활한 포식자. 과도한 스킨십과 유혹적인 태도로 상대의 경계를 무너뜨린 뒤, 소유물처럼 집착하는 새디스트.", accent:"#60c870" },
  { id:13, name:"혈아진", hanja:"血我眞", title:"혈의마가 가주 · 마의관주", alias:"적혈나한", aliasH:"赤血羅漢", group:"마도칠문", realm:"초절정", realmSub:"완숙(完熟)", arts:"혈영검법 · 혈천수 · 재생술",    weapon:"마검 혈혼(血魂) · 혈주(血珠)", desc:"고통을 쾌락으로 느끼는 사이코패스. 도덕 관념이 결여되어 있으며, 상처 입고 피를 흘리는 것을 일종의 교류로 인식하는 마조히스트적 성향.", accent:"#e04040" },
  { id:14, detailCount:2, detailLabels:["가면","얼굴"], name:"천이현", hanja:"千利賢", title:"천기마가 가주 · 기공관주", alias:"만상지주", aliasH:"萬象之主", group:"마도칠문", realm:"절정",   realmSub:"극(極)",    arts:"풍뢰선법 · 기문진법",           weapon:"마선 백우풍뢰(白羽風雷)",      desc:"온화한 가면을 쓴 궤변가. 항상 미소를 띠고 있지만, 그 속에는 아군마저 장기말로 취급하는 냉정한 계산이 숨어 있다. 말로 상대를 농락하는 것을 즐기는 하라구로 타입.", accent:"#b0e060" },
  { id:15, name:"연유화", hanja:"燕宥花", title:"흑산마가 가주 · 계문관주", alias:"흑요검후", aliasH:"黑曜劍后", group:"마도칠문", realm:"초절정", realmSub:"극(極)",    arts:"흑산검법 · 현암천근공",         weapon:"중검 흑암(黑巖)",              desc:"도도하고 까칠한 철벽의 쿨데레. 약자를 혐오하는 실력주의자지만, 무심한 척 뒤에서 챙겨주는 츤데레 기질과 은근한 질투심을 가지고 있다.", accent:"#a0a0c0" },
];

const REALMS: Realm[] = [
  { level:1, name:"삼류",        hanja:"三流",       color:"#7a6850", bar:12,  desc:"갓 무공에 입문. 초식의 겉모습만 흉내 내는 단계. 실전에서는 거의 힘을 쓰지 못한다." },
  { level:2, name:"이류",        hanja:"二流",       color:"#8a7860", bar:24,  desc:"초식이 몸에 익숙해졌으나 내공 운용이 미숙하고 실전 경험이 부족한 단계." },
  { level:3, name:"일류",        hanja:"一流",       color:"#9a8858", bar:36,  desc:"초식에 내공을 담아 위력을 발휘할 수 있는 단계. 본격적인 무인(武人)으로 인정받는다." },
  { level:4, name:"절정",        hanja:"絶頂",       color:"#a07830", bar:50,  desc:"검강(劍罡)을 사용할 수 있는 경지. 웬만한 문파의 장로나 핵심 고수들이 이 단계에 속한다." },
  { level:5, name:"초절정",      hanja:"超絶頂",     color:"#b08020", bar:63,  desc:"호신강기(護身罡氣)를 자유롭게 사용하는 경지. 각 문파의 장문인이나 가주급 고수들이 포진." },
  { level:6, name:"극마 · 화경", hanja:"極魔 / 化境", color:"#b81c30", bar:76,  desc:"손짓 하나가 절기가 되는 경지. 意到氣到(의도기도)를 실현. 천하에 그 수가 매우 적다." },
  { level:7, name:"탈마 · 현경", hanja:"脫魔 / 玄境", color:"#d42040", bar:88,  desc:"천인합일(天人合一)의 경지. 인간의 한계를 초월하여 자연의 힘을 빌려 쓰는 살아있는 전설." },
  { level:8, name:"생사경",      hanja:"生死境",     color:"#e83050", bar:100, desc:"삶과 죽음의 경계를 초월. 무(武)를 통해 도(道)의 영역에 들어선 신화 속 궁극의 경지." },
];

const SEVEN_HOUSES: House[] = [
  { name:"현마검가", hanja:"玄魔劍家", dept:"무경관(武經觀)", role:"군사",     color:"#1a1c30", leader:"현무홍", desc:"교단의 공식적인 군대(무력대)를 조직·훈련·지휘하며, 전쟁 및 대규모 전투를 총괄한다. 실력과 규율을 중시하며, 교주에 대한 충성심이 가장 강한 보수적인 검사 가문." },
  { name:"몽환마가", hanja:"夢幻魔家", dept:"천상관(天商觀)", role:"상업",     color:"#28102a", leader:"몽예화", desc:"교단 외부에서 상단을 운영하고 무역 활동을 통해 막대한 자금을 벌어들이는 교단의 주 수입원. 화려함과 쾌락을 추구하는 예술가적 기질이 강하며, 환술(幻術)과 음공(音功)에 능함." },
  { name:"빙백마가", hanja:"氷魄魔家", dept:"암류관(暗流觀)", role:"사법",     color:"#081420", leader:"설항아", desc:"교단의 법률인 교규(敎規)를 집행하며, 내부 비리 감찰·범죄자 심문 및 처벌을 담당하는 사법기관. 감정을 배제한 냉철한 이성과 원칙을 중시하며, 빙공(氷功)을 사용한다." },
  { name:"독혈마가", hanja:"毒血魔家", dept:"흑문관(黑門觀)", role:"정보",     color:"#0c1a0c", leader:"당비연", desc:"강호 전역의 정보를 수집·분석하고, 독(毒)을 제조·관리하며 외부의 암살 의뢰를 처리한다. 음침하고 폐쇄적이며, 독공(毒功)과 암기술(暗器術)에 특화된 가문." },
  { name:"혈의마가", hanja:"血醫魔家", dept:"마의관(魔醫觀)", role:"의료",     color:"#1e0808", leader:"혈아진", desc:"부상당한 교도들을 치료하고 각종 영약을 제조한다. 무공 연구를 위해 기이한 인체 실험도 서슴지 않는 매드 사이언티스트 집단이지만, 의술 실력만큼은 최고. 혈공(血功)을 운용한다." },
  { name:"천기마가", hanja:"天機魔家", dept:"기공관(機巧觀)", role:"교육·연구", color:"#101810", leader:"천이현", desc:"신입 교도 교육, 무공 이론 및 전술 연구, 진법(陣法) 개발, 고서적 보관 등을 담당하는 학술 기관. 지적 우월감이 강하며, 점술이나 진법 등 신비로운 기술에 능통하다." },
  { name:"흑산마가", hanja:"黑山魔家", dept:"계문관(計文觀)", role:"행정·보급", color:"#101014", leader:"연유화", desc:"인사 관리, 식량 및 물자 보급, 시설 보수 등 교단 운영에 필요한 모든 살림을 총괄하는 행정 부서. 변화를 꺼리고 안정을 추구하는 보수적인 성향이 강하며, 꼼꼼하고 신중하게 일을 처리한다." },
];

/* ═══════════ IMG SLOT ═══════════ */
function ImgSlot({ src, className, icon, label, sub }: {
  src: string; className?: string; icon: string; label: string; sub: string;
}) {
  const [err, setErr] = useState(false);
  return (
    <div className={`img-slot${className ? " " + className : ""}`}>
      {!err
        ? <img src={src} alt={label} onError={() => setErr(true)} />
        : (
          <div className="img-slot-placeholder">
            <div className="img-slot-icon">{icon}</div>
            <div className="img-slot-label">{label}</div>
            <div className="img-slot-sub">{sub}</div>
          </div>
        )
      }
    </div>
  );
}

/* ═══════════ AUDIO ═══════════ */
function useAmbient() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  const start = useCallback(() => {
    if (!audioRef.current) { const a = new Audio("/Untitled.mp3"); a.loop=true; a.volume=0.45; audioRef.current=a; }
    audioRef.current.play().then(()=>setOn(true)).catch(()=>{});
  }, []);
  const toggle = useCallback(() => {
    if (!audioRef.current) { start(); return; }
    if (audioRef.current.paused) audioRef.current.play().then(()=>setOn(true)).catch(()=>{});
    else { audioRef.current.pause(); setOn(false); }
  }, [start]);
  return { on, toggle, start };
}

/* ═══════════ LOADING ═══════════ */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  useState(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 3000);
    return () => [t1, t2].forEach(clearTimeout);
  });
  const handleEnter = () => { setPhase(3); setTimeout(onComplete, 900); };
  return (
    <div className="load" style={{ opacity: phase === 3 ? 0 : 1, pointerEvents: phase === 3 ? "none" : "auto" }}>
      <div className="load-bg" />
      {[140, 230, 340].map((r, i) => (
        <div key={i} className="load-ring" style={{ width:r*2, height:r*2, top:`calc(50% - ${r}px)`, left:`calc(50% - ${r}px)`, animationDelay:`${i*0.6}s` }} />
      ))}
      <div className="load-content" style={{ opacity: phase>=1?1:0, transform: phase>=1?"translateY(0)":"translateY(20px)" }}>
        <div className="load-eyebrow">Made By 김타브</div>
        <div className="load-title">魔敎主夜談</div>
        <div className="load-romanized">마교주야담</div>
        <div className="load-bar-wrap"><div className="load-bar" style={{width:phase>=1?"100%":"0%"}} /></div>
        <button
          className="load-btn"
          style={{ opacity: phase>=2?1:0, transform: phase>=2?"translateY(0)":"translateY(10px)", pointerEvents: phase>=2?"auto":"none" }}
          onClick={handleEnter}
        >
          <span className="load-btn-line" />
          세계관 보러가기
          <span className="load-btn-line" />
        </button>
        <div className="load-hint" style={{ opacity: phase>=2?0.5:0 }}>♪ BGM 포함 · 하단에서 조절</div>
      </div>
    </div>
  );
}

/* ═══════════ SIDEBAR ═══════════ */
type TabId = "world"|"faction"|"martial"|"chars";
const NAV_ITEMS: { id:TabId; char:string; label:string; sub:string }[] = [
  { id:"world",   char:"世", label:"세계관",   sub:"WORLD"   },
  { id:"faction", char:"敎", label:"천마신교", sub:"FACTION" },
  { id:"martial", char:"武", label:"무공체계", sub:"MARTIAL" },
  { id:"chars",   char:"人", label:"인물소개", sub:"CAST"    },
];
function Sidebar({ tab, setTab, bgmOn, toggleBgm }: { tab:TabId; setTab:(t:TabId)=>void; bgmOn:boolean; toggleBgm:()=>void }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-kanji">魔</div>
        <div className="sidebar-logo-text">
          <span>마교주야담</span>
          <span>魔敎主夜談</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item, i) => (
          <button key={item.id} className={`snav-item${tab===item.id?" active":""}`} onClick={()=>setTab(item.id)}>
            <span className="snav-num">0{i+1}</span>
            <span className="snav-char">{item.char}</span>
            <span className="snav-labels">
              <span className="snav-label">{item.label}</span>
              <span className="snav-sub">{item.sub}</span>
            </span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="bgm-btn" onClick={toggleBgm} title="BGM">
          {bgmOn ? "■" : "▶"}
        </button>
        <span className="sidebar-footer-text">BGM</span>
      </div>
    </aside>
  );
}

/* ═══════════ WORLD ═══════════ */
function WorldSection() {
  return (
    <div className="section-wrap">
      <header className="section-header">
        <div className="sh-eyebrow">Chapter 01</div>
        <h1 className="sh-title">세계관<span className="sh-hanja">世界觀</span></h1>
        <p className="sh-desc">가정(嘉靖) 황제 치세(1522–1566)부터 시작하여 융경, 만력 연간으로 이어지는 시기. 황실의 권위는 실추되었고, 관료 사회는 부패했다. 이러한 혼란을 틈타, 정규 군사력으로는 해결할 수 없는 문제들을 무림의 힘으로 해결하려는 움직임이 생겨났다. 이로 인해 무림 세력들의 영향력이 이전보다 훨씬 커졌으며, 사실상 치외법권적인 자치권을 누리는 거대 문파들이 등장한다.</p>
      </header>

      <div className="section-body">
        <div className="label-row">삼분지계 三分之計</div>
        <p style={{fontSize:"0.83rem",lineHeight:"1.95",color:"var(--ink2)",marginBottom:"1.5rem"}}>현재 강호는 크게 정파(正派), 사파(邪派), 그리고 마교(魔敎)라는 세 개의 거대한 축으로 나뉘어 팽팽한 긴장 관계를 유지한다.</p>
        <div className="faction-grid">
          {[
            { tag:"正派", name:"정파 · 무림맹", hanja:"正派 · 武林盟", color:"#3a5a8a",
              desc:"구파일방(九派一幇)을 중심으로 뭉친 정의와 협의를 내세우는 세력. 소림, 무당, 화산 등이 주축을 이룬다.",
              subs:["대의명분을 중시하며 강호를 통제하려 한다.", "내부적으로는 이권 다툼과 위선이 만연.", "▸ 마교와의 관계: 천하의 공적이자 만악의 근원으로 규정. 기회만 되면 토벌하려 드는 불구대천의 원수"] },
            { tag:"邪派", name:"사파 · 사도련", hanja:"邪派 · 邪道聯", color:"#6a5030",
              desc:"정파에 속하지 못하는 이익 집단들의 연합체. 하오문, 녹림, 사천당문 일부 등이 여기에 포함된다.",
              subs:["실리에 따라 이합집산하는 경향이 강하다.", "정파와 마교 사이에서 줄타기하며 이득을 챙긴다.", "▸ 마교와의 관계: 기본 적대적, 필요시 일시 연대"] },
            { tag:"魔敎", name:"마교 · 천마신교", hanja:"魔敎 · 天魔神敎", color:"#8a1a28",
              desc:"천마(天魔)를 유일신으로 숭배하는 종교적 성격의 거대 무력 집단. 강자존(强者尊)의 사상을 바탕으로 움직인다.",
              subs:["십만대산 험준한 요새에 자리 잡은 독자적 사회.", "철저한 실력주의와 교주에 대한 절대 충성.", "정파의 위선을 경멸하고, 오직 힘만이 유일한 진리라고 믿는다.", "다른 세력을 '교외(敎外)의 미개한 자들'로 여기며 독자적인 세계를 구축.", "▸ 정파/사파와의 관계: 강호 모든 세력을 적으로 간주"] },
          ].map(f => (
            <div className="faction-card" key={f.tag} style={{ borderTopColor: f.color }}>
              <div className="fc-tag" style={{ color: f.color }}>{f.tag}</div>
              <div className="fc-name">{f.name}</div>
              <div className="fc-hanja">{f.hanja}</div>
              <p className="fc-desc">{f.desc}</p>
              <ul className="fc-subs">{f.subs.map((s,i)=><li key={i}>{s}</li>)}</ul>
            </div>
          ))}
        </div>

        <div className="divider" />
        <div className="label-row">교단 3대 규율</div>
        <div className="rules-row">
          {["배교는 곧 죽음이다 — 교단을 등지는 행위는 어떠한 이유로도 용납되지 않으며, 배교자는 하늘 끝까지 추적하여 처단한다.",
            "동료의 등을 찌르지 말라 — 내부의 암투나 음모는 허용될 수 있으나, 교단 전체에 해가 되는 명백한 배신 행위는 엄격히 금지된다.",
            "천마의 명은 하늘의 뜻이다 — 교주의 명령은 절대적이며, 어떤 개인적인 사정이나 판단보다 우선시된다.",
          ].map((r, i) => (
            <div className="rule-card" key={i}>
              <span className="rule-num">{"一二三"[i]}</span>
              <p className="rule-text"><b>{r.split("—")[0]}</b>— {r.split("—")[1]}</p>
            </div>
          ))}
        </div>

        <div className="divider" />
        <div className="label-row">강호 지도 · 세력 구도</div>
        <ImgSlot
          src="/map.png"
          className="map-slot"
          icon="地"
          label="강호 지도"
          sub="지도 이미지를 /public/map.jpg 에 넣어주세요"
        />
      </div>
    </div>
  );
}

/* ═══════════ FACTION ═══════════ */
function FactionSection() {
  return (
    <div className="section-wrap">
      <header className="section-header">
        <div className="sh-eyebrow">Chapter 02</div>
        <h1 className="sh-title">천마신교<span className="sh-hanja">天魔神敎</span></h1>
        <p className="sh-desc">천마신교는 단순한 무림 문파가 아닌, 천마(天魔)를 유일신으로 섬기는 거대한 종교적 군사 집단이다. 십만대산이라는 험준한 자연의 요새에 자리 잡고 있으며, 외부 강호와는 철저히 격리된 독자적인 사회와 문화를 구축한다.</p>
      </header>
      <div className="section-body">
        <div className="label-row">본산 · 십만대산</div>
        <ImgSlot
          src="/honsan.png"
          className="honsan-slot"
          icon="山"
          label="천마신교 본산 · 만마전"
          sub="이미지를 /public/honsan.jpg 에 넣어주세요"
        />
        <div className="divider" />
        {/* Org */}
        <div className="label-row">조직 구조</div>
        <p style={{fontSize:"0.88rem",lineHeight:"1.95",color:"var(--ink2)",marginBottom:"1.5rem"}}>천마신교의 권력은 교주를 정점으로 하는 피라미드 구조다. 교주 직속 조직과, 교단의 핵심 운영을 담당하는 7개의 장로 가문(마도칠문)이 그 근간을 이룬다.</p>
        <div className="org-wrap">
          <div className="org-apex">
            <div className="org-apex-name">교주 (天魔)</div>
            <div className="org-apex-sub">살아있는 신 · 교단의 절대자</div>
          </div>
          <div className="org-connector" />
          <div className="org-label-small">교주 직속</div>
          <div className="org-direct">
            {[["대호법","최고 무력 책임자"],["좌호법","암살 · 첩보 전담"],["우호법","외부 무력 대응"],["재정총관","교단 재정 총괄"],["친위대","본산 호위 정예부대"],["시녀장","만마전 총괄 관리"]].map(([n,s])=>(
              <div className="org-box red" key={n}><div className="ob-name">{n}</div><div className="ob-sub">{s}</div></div>
            ))}
          </div>
          <div className="org-connector" />
          <div className="org-label-small">마도칠문 魔道七門</div>
          <div className="org-seven">
            {SEVEN_HOUSES.map(h=>(
              <div className="org-box" key={h.name}><div className="ob-name">{h.name}</div><div className="ob-sub">{h.role}</div></div>
            ))}
          </div>
        </div>

        <div className="divider" />
        <div className="label-row">마도칠문 魔道七門</div>
        <p style={{fontSize:"0.88rem",lineHeight:"1.95",color:"var(--ink2)",marginBottom:"1.5rem"}}>마도칠문은 천마신교의 심장부이자 척추를 형성하는 일곱 개의 장로 가문이다. 단순히 교단 내의 유력 가문을 넘어, 천마신교의 창립과 발전에 지대한 공을 세운 개국공신들의 후예로서 교단의 실질적인 운영을 책임지는 핵심 권력 집단이다. 각 가문은 교단 행정을 담당하는 7개의 행정전각 중 하나를 전담하여 책임지고 운영한다.</p>
        <div className="houses-list">
          {SEVEN_HOUSES.map((h, i) => (
            <div className="house-row" key={h.name}>
              <div className="hr-num">0{i+1}</div>
              <div className="hr-kanji">{h.hanja[0]}</div>
              <div className="hr-info">
                <div className="hr-name">{h.name} <span className="hr-hanja">{h.hanja}</span></div>
                <div className="hr-dept">{h.dept} — {h.role}</div>
                <div className="hr-leader">가주: <b>{h.leader}</b></div>
              </div>
              <div className="hr-desc">{h.desc}</div>
            </div>
          ))}
        </div>

        <div className="divider" />
        <div className="label-row">권력 구조 · 장로원</div>
        <div className="two-col-info">
          <div className="tci-block">
            <div className="tci-title">교주의 절대 권위</div>
            <p className="tci-desc">교주, 즉 '천마'는 살아있는 신이자 교단의 모든 것이다. 교주의 말은 곧 법이고 진리이며, 교주에 대한 충성은 선택이 아닌 의무다.</p>
          </div>
          <div className="tci-block">
            <div className="tci-title">장로원 (長老院)</div>
            <p className="tci-desc">마도칠문의 가주들은 교단 최고 의결 기구인 장로원의 구성원이 된다. 교단의 중대사를 논의하고 교주에게 조언하지만, 최종 결정권은 오직 교주에게 있다.</p>
          </div>
          <div className="tci-block">
            <div className="tci-title">권력의 균형추</div>
            <p className="tci-desc">7개의 가문은 교주에 대한 충성을 공통분모로 삼으면서도, 서로를 견제하고 경쟁하며 권력의 균형을 이룬다. 이들의 복잡한 역학 관계는 천마신교 내부 정치의 핵심이다.</p>
          </div>
        </div>

        <div className="divider" />
        <div className="label-row">핵심 사상 · 강자존</div>
        <div className="two-col-info">
          <div className="tci-block">
            <div className="tci-title">강자존 · 실력지상주의</div>
            <p className="tci-desc">천마신교의 모든 것을 관통하는 대원칙. 출신, 배경, 나이, 성별에 관계없이 오직 개인의 힘만이 가치를 결정한다. 약자는 강자에게 복종해야 하며, 힘을 통해 자신의 가치를 증명하는 것이 교단의 가장 큰 미덕이다.</p>
          </div>
          <div className="tci-block">
            <div className="tci-title">강자존 · 위선 타파</div>
            <p className="tci-desc">정파가 내세우는 '협의'나 '대의'를 위선적인 허울로 여기고 경멸한다. 인간의 본성은 힘을 향한 욕망이며, 이를 솔직하게 인정하고 추구하는 것이야말로 진정한 길이라고 믿는다.</p>
          </div>
          <div className="tci-block">
            <div className="tci-title">성화 숭배 (聖火)</div>
            <p className="tci-desc">교단 본산에는 영원히 꺼지지 않는 성화(聖火)가 타오른다. 이 불꽃은 천마의 권위와 교단의 영원성을 상징하는 신성한 상징물이다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ MARTIAL ═══════════ */
function MartialSection() {
  const realmChars = (name: string) => CHARS.filter(c => c.realm === name.split("·")[0].trim()).map(c => c.name);
  return (
    <div className="section-wrap">
      <header className="section-header">
        <div className="sh-eyebrow">Chapter 03</div>
        <h1 className="sh-title">무공 체계<span className="sh-hanja">武功體系</span></h1>
        <p className="sh-desc">무공의 경지는 단순히 기술의 숙련도를 넘어, 내공의 깊이와 무(武)에 대한 깨달음의 정도를 나타내는 척도다.</p>
      </header>
      <div className="section-body">
        <div className="label-row">경지 팔단계 — 입문 · 완숙 · 극</div>
        <p style={{fontSize:"0.88rem",lineHeight:"1.95",color:"var(--ink2)",marginBottom:"1.5rem"}}>무공의 경지는 단순히 기술의 숙련도를 넘어, 내공의 깊이와 무(武)에 대한 깨달음의 정도를 나타내는 척도다. 경지는 크게 여덟 단계로 나뉘며, 각 단계는 다시 <b style={{color:"var(--ink)"}}>입문(入門) → 완숙(完熟) → 극(極)</b>의 세부 등급으로 구분된다.</p>
        <div className="realm-table">
          {[...REALMS].reverse().map(r => {
            const chars = realmChars(r.name);
            return (
              <div className="rt-row" key={r.level}>
                <div className="rt-left">
                  <div className="rt-level">경지 {r.level}단계</div>
                  <div className="rt-name" style={{ color: r.color }}>{r.name}</div>
                  <div className="rt-hanja">{r.hanja}</div>
                  <div className="rt-bar-wrap"><div className="rt-bar" style={{ width:`${r.bar}%`, background:r.color }} /></div>
                </div>
                <div className="rt-right">
                  <p className="rt-desc">{r.desc}</p>
                  {chars.length > 0 && (
                    <div className="rt-chars">
                      <span className="rt-chars-label">해당 인물</span>
                      {chars.map(n => <span className="rt-char-tag" key={n}>{n}</span>)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ CHARACTER MODAL ═══════════ */
function CharModal({ c, onClose, onPrev, onNext, hasPrev, hasNext }: {
  c: Character; onClose: () => void;
  onPrev: () => void; onNext: () => void;
  hasPrev: boolean; hasNext: boolean;
}) {
  const [imgErr, setImgErr] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const count = c.detailCount ?? 1;

  // c 바뀔 때 이미지 상태 초기화
  useRef(null); // placeholder - 실제 리셋은 useEffect로
  useEffect(() => {
    setImgErr(false);
    setImgIdx(0);
  }, [c.id]);

  // 키보드 네비게이션
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [hasPrev, hasNext, onPrev, onNext, onClose]);

  const detailSrc = count > 1
    ? `/chars/detail/${c.id}_${imgIdx + 1}.png`
    : `/chars/detail/${c.id}.png`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-inner" style={{display:"flex",flexDirection:"column"}}>
          <div className="modal-photo">
            {!imgErr
              ? <img src={detailSrc} alt={c.name} onError={() => setImgErr(true)} />
              : <div className="modal-photo-empty"><span style={{ color: c.accent }}>{c.hanja[0]}</span></div>
            }
            <div className="modal-photo-bar" style={{ background: c.accent }} />
          </div>
          {count > 1 && c.detailLabels && (
            <div className="modal-img-tabs">
              {c.detailLabels.map((label, i) => (
                <button
                  key={i}
                  className={`modal-img-tab${imgIdx === i ? " active" : ""}`}
                  style={imgIdx === i ? { background: c.accent, borderColor: c.accent, color: "#fff" } : {}}
                  onClick={e => { e.stopPropagation(); setImgIdx(i); setImgErr(false); }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          <div className="modal-info">
            <div className="modal-group">{c.group}</div>
            <div className="modal-name">{c.name}<span className="modal-hanja">{c.hanja}</span></div>
            <div className="modal-title">{c.title}</div>
            <div className="modal-alias">
              <span className="modal-alias-label">별호</span>
              <span className="modal-alias-val" style={{ color: c.accent }}>{c.alias}</span>
              <span className="modal-alias-hanja">{c.aliasH}</span>
            </div>
            <div className="modal-divider" />
            <div className="modal-stat-row">
              <div className="modal-stat"><span className="ms-label">경지</span><span className="ms-val" style={{ color: c.accent }}>{c.realm}</span><span className="ms-sub">{c.realmSub}</span></div>
            </div>
            <div className="modal-stat-row">
              <div className="modal-stat"><span className="ms-label">무공</span><span className="ms-val">{c.arts}</span></div>
            </div>
            <div className="modal-stat-row">
              <div className="modal-stat"><span className="ms-label">무기</span><span className="ms-val">{c.weapon}</span></div>
            </div>
            <div className="modal-divider" />
            <p className="modal-desc">{c.desc}</p>
          </div>
          {/* 캐릭터 이동 — 정보 영역 하단 */}
          <div className="modal-char-nav">
            <button
              className="modal-char-btn"
              onClick={e => { e.stopPropagation(); if(hasPrev) onPrev(); }}
              disabled={!hasPrev}
            >
              ← 이전
            </button>
            <button
              className="modal-char-btn"
              onClick={e => { e.stopPropagation(); if(hasNext) onNext(); }}
              disabled={!hasNext}
            >
              다음 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ CHAR TILE ═══════════ */
function CharTile({ c, onSelect }: { c: Character; onSelect: () => void }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="char-tile" onClick={onSelect}>
      <div className="ct-photo">
        {!imgErr
          ? <img src={`/chars/${c.id}.png`} alt={c.name} onError={() => setImgErr(true)} />
          : <div className="ct-empty"><span style={{ color: c.accent }}>{c.hanja[0]}</span></div>
        }
        <div className="ct-bar" style={{ background: c.accent }} />
        <div className="ct-idx">{String(c.id).padStart(2, "0")}</div>
      </div>
      <div className="ct-body">
        <div className="ct-group">{c.group}</div>
        <div className="ct-name">{c.name}</div>
        <div className="ct-hanja">{c.hanja}</div>
        <div className="ct-realm" style={{ color: c.accent }}>{c.realm}</div>
        <div className="ct-alias">{c.alias}</div>
      </div>
    </div>
  );
}

/* ═══════════ CHARS SECTION ═══════════ */
function CharsSection() {
  const [filter, setFilter] = useState<"all"|"교주직속"|"마도칠문">("all");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const filtered = filter === "all" ? CHARS : CHARS.filter(c => c.group === filter);

  const selected = selectedIdx !== null ? filtered[selectedIdx] : null;
  const hasPrev = selectedIdx !== null && selectedIdx > 0;
  const hasNext = selectedIdx !== null && selectedIdx < filtered.length - 1;

  return (
    <div className="section-wrap">
      <header className="section-header">
        <div className="sh-eyebrow">Chapter 04</div>
        <h1 className="sh-title">인물 소개<span className="sh-hanja">人物紹介</span></h1>
        <p className="sh-desc">천마신교를 구성하는 15인의 인물. 카드를 클릭하면 상세 정보를 볼 수 있다.</p>
      </header>
      <div className="section-body">
        <div className="chars-filter">
          {(["all","교주직속","마도칠문"] as const).map(f => (
            <button key={f} className={`cf-btn${filter===f?" active":""}`} onClick={() => setFilter(f)}>
              {f === "all" ? "전체" : f}
            </button>
          ))}
        </div>
        <div className="chars-grid">
          {filtered.map((c, i) => (
            <CharTile key={c.id} c={c} onSelect={() => setSelectedIdx(i)} />
          ))}
        </div>
      </div>
      {selected && (
        <CharModal
          c={selected}
          onClose={() => setSelectedIdx(null)}
          onPrev={() => setSelectedIdx(i => i !== null ? i - 1 : null)}
          onNext={() => setSelectedIdx(i => i !== null ? i + 1 : null)}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      )}
    </div>
  );
}

/* ═══════════ APP ═══════════ */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabId>("world");
  const { on: bgmOn, toggle: toggleBgm, start: startBgm } = useAmbient();
  const handleEnter = () => { startBgm(); setLoading(false); };

  return (
    <>
      {loading && <LoadingScreen onComplete={handleEnter} />}
      {!loading && (
        <div className="app">
          <Sidebar tab={tab} setTab={setTab} bgmOn={bgmOn} toggleBgm={toggleBgm} />
          <div className="main-wrap">
            <main className="main">
              <div key={tab} className="section-fade">
                {tab === "world"   && <WorldSection />}
                {tab === "faction" && <FactionSection />}
                {tab === "martial" && <MartialSection />}
                {tab === "chars"   && <CharsSection />}
              </div>
            </main>
            <footer className="footer">
              <div className="footer-logo">魔敎主夜談</div>
              <div className="footer-copy">© 마교주야담 · All rights reserved</div>
              <div className="footer-tag">Made by 김타브</div>
              <div className="footer-hint">Website created by 몽유도인</div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}