import { useState, useMemo, useCallback } from "react";

/* ═══════════════════ i18n ═══════════════════ */
const i18n = {
  fr: {
    badge: "Simulateur interactif",
    heroTitle1: "Et si vous pouviez ",
    heroHighlight: "revendre",
    heroTitle2: " vos jeux numériques ?",
    heroSub: "PlayStation supprime le disque en 2028. 350 000 joueurs sont en colère. Voici la solution que personne ne propose.",
    pickGame: "Sélectionnez un jeu de votre bibliothèque",
    newPrice: "Prix neuf",
    resaleLabel: "Ajustez le prix de revente",
    ofNew: "du prix neuf",
    splitTitle: "Répartition des revenus",
    digitalTitle: "Revente numérique",
    physicalTitle: "Occasion physique",
    seller: "Vendeur", publisher: "Éditeur", platform: "Plateforme",
    forSeller: "Pour le vendeur", forPublisher: "Pour l'éditeur", buyerSaving: "Économie acheteur",
    sellerSub: "70 % du prix de revente", publisherSub: "Au lieu de 0 en physique",
    buyerSubVs: "vs ", buyerSubPost: " en neuf",
    whyTitle: "Tout le monde y gagne",
    who1: "Le vendeur", why1a: "récupère ", why1b: " sur un jeu qui dormait dans sa bibliothèque.",
    who2: "L'éditeur", why2a: "touche ", why2b: " par revente — au lieu de rien en occasion physique.",
    who3: "L'acheteur", why3a: "accède au jeu pour ", why3b: " au lieu de ", why3c: ".",
    who4: "La plateforme", why4a: "empoche ", why4b: " sur une transaction qui n'existait pas.",
    today: "Aujourd'hui", zeroPublisher: "L'éditeur touche 0 sur chaque revente d'occasion physique.",
    tomorrow: "Demain", tomorrowSub: "Avec le trade-in digital, il touche automatiquement sur chaque transaction.",
    ctxBtn: "Contexte et sources", ctxBtnHide: "Masquer",
    stat1v: "5,86 Md€", stat1l: "Marché FR 2025", stat2v: "68 %", stat2l: "Ventes numériques EU",
    stat3v: "350K+", stat3l: "Pétition anti-disc kill", stat4v: "0 €", stat4l: "Part éditeur sur l'occasion",
    ctxP: "Le 1ᵉʳ juillet 2026, PlayStation a annoncé la fin des disques physiques pour janvier 2028. Les joueurs perdent leur dernier levier de revente. L'arrêt de la Cour de cassation (oct. 2024, UFC-Que Choisir c/ Valve) confirme qu'aucun droit de revente numérique n'existe en France. Pourtant, la technologie est prête. Ce simulateur montre qu'un modèle de trade-in digital avec commission éditeur est non seulement viable, mais plus rentable pour l'industrie que l'occasion physique.",
    ctxSrc: "Sources : SELL 2025 · Newzoo · Panel GSD · Cour de cassation oct. 2024 · PlayStation Blog 1ᵉʳ juil. 2026",
    footerBy: "Un concept de", footerSub: "Prototype — pas encore un service commercial",
    thisYear: "Cette année", oneYear: "1 an", nYears: " ans",
  },
  en: {
    badge: "Interactive simulator",
    heroTitle1: "What if you could ",
    heroHighlight: "resell",
    heroTitle2: " your digital games?",
    heroSub: "PlayStation is killing the disc in 2028. 350,000 gamers are outraged. Here's the solution no one is offering.",
    pickGame: "Pick a game from your library",
    newPrice: "Retail",
    resaleLabel: "Set your resale price",
    ofNew: "of retail",
    splitTitle: "Revenue breakdown",
    digitalTitle: "Digital resale",
    physicalTitle: "Physical second-hand",
    seller: "Seller", publisher: "Publisher", platform: "Platform",
    forSeller: "For the seller", forPublisher: "For the publisher", buyerSaving: "Buyer savings",
    sellerSub: "70% of resale price", publisherSub: "Instead of $0 in physical",
    buyerSubVs: "vs ", buyerSubPost: " retail",
    whyTitle: "Everybody wins",
    who1: "The seller", why1a: "recovers ", why1b: " from a game gathering dust in their library.",
    who2: "The publisher", why2a: "earns ", why2b: " per resale — instead of nothing in physical second-hand.",
    who3: "The buyer", why3a: "gets the game for ", why3b: " instead of ", why3c: ".",
    who4: "The platform", why4a: "earns ", why4b: " on a transaction that didn't exist before.",
    today: "Today", zeroPublisher: "The publisher earns $0 on every physical second-hand sale.",
    tomorrow: "Tomorrow", tomorrowSub: "With digital trade-in, they earn automatically on every transaction.",
    ctxBtn: "Context & sources", ctxBtnHide: "Hide",
    stat1v: "$6.4B", stat1l: "French market 2025", stat2v: "68%", stat2l: "Digital sales EU",
    stat3v: "350K+", stat3l: "Anti-disc-kill petition", stat4v: "$0", stat4l: "Publisher cut on resale",
    ctxP: "On July 1 2026, PlayStation announced the end of physical discs starting January 2028. Gamers lose their last resale option. A French Supreme Court ruling (Oct. 2024, UFC-Que Choisir v. Valve) confirmed no digital resale right exists. Yet the technology is ready. This simulator shows a digital trade-in model with publisher commission is viable and more profitable than physical second-hand.",
    ctxSrc: "Sources: SELL 2025 · Newzoo · GSD Panel · French Supreme Court Oct. 2024 · PlayStation Blog Jul. 1 2026",
    footerBy: "A concept by", footerSub: "Prototype — not a commercial service yet",
    thisYear: "This year", oneYear: "1 yr", nYears: " yrs",
  }
};

/* ═══════════════════ GAMES ═══════════════════ */
const GAMES = [
  { id:1,  title:"GTA VI",                   pub:"Rockstar / Take-Two", eur:79.99, usd:69.99, year:2026, genre:"Action · Open World",     g:"linear-gradient(135deg,#145a1f,#0b1e0b 40%,#c9980e)",      a:"#d4a017" },
  { id:2,  title:"Assassin's Creed Shadows",  pub:"Ubisoft",            eur:69.99, usd:69.99, year:2025, genre:"Action · RPG",             g:"linear-gradient(135deg,#7a1010,#1c0808 50%,#12122a)",      a:"#e74c3c" },
  { id:3,  title:"EA Sports FC 26",           pub:"Electronic Arts",    eur:69.99, usd:69.99, year:2025, genre:"Sport",                    g:"linear-gradient(135deg,#091420,#0f1c2c 40%,#00b347)",      a:"#00c853" },
  { id:4,  title:"Resident Evil Requiem",     pub:"Capcom",             eur:69.99, usd:69.99, year:2026, genre:"Survival Horror",          g:"linear-gradient(135deg,#111,#1e0808 50%,#6e0000)",         a:"#ef5350" },
  { id:5,  title:"FF VII Rebirth",            pub:"Square Enix",        eur:69.99, usd:69.99, year:2024, genre:"RPG · Action",             g:"linear-gradient(135deg,#080e1e,#141e60 50%,#00a8b5)",      a:"#00bcd4" },
  { id:6,  title:"Elden Ring",                pub:"Bandai Namco",       eur:59.99, usd:59.99, year:2022, genre:"Action · RPG",             g:"linear-gradient(135deg,#14140a,#2c1e12 50%,#d5a825)",      a:"#fbc02d" },
  { id:7,  title:"Spider-Man 2",              pub:"Sony / Insomniac",   eur:69.99, usd:69.99, year:2023, genre:"Action · Aventure",        g:"linear-gradient(135deg,#9a1616,#121228 50%,#1254a8)",      a:"#e53935" },
  { id:8,  title:"Hogwarts Legacy",           pub:"Warner Bros.",       eur:59.99, usd:59.99, year:2023, genre:"Action · RPG",             g:"linear-gradient(135deg,#12082a,#3c1180 50%,#b88528)",      a:"#ce9c3a" },
  { id:9,  title:"Star Wars Outlaws",         pub:"Ubisoft",            eur:69.99, usd:69.99, year:2024, genre:"Action · Open World",      g:"linear-gradient(135deg,#080808,#14202e 50%,#c44b00)",      a:"#ff6d00" },
  { id:10, title:"Astro Bot",                 pub:"Sony / Team Asobi",  eur:69.99, usd:59.99, year:2024, genre:"Platformer",               g:"linear-gradient(135deg,#1050a0,#0a3880 50%,#20a8e0)",      a:"#29b6f6" },
  { id:11, title:"Call of Duty: BO6",         pub:"Activision",         eur:69.99, usd:69.99, year:2024, genre:"FPS · Action",             g:"linear-gradient(135deg,#141414,#222 50%,#c44b00)",         a:"#ff6d00" },
  { id:12, title:"Phantom Blade Zero",        pub:"S-Game",             eur:69.99, usd:69.99, year:2026, genre:"Action · Wuxia",           g:"linear-gradient(135deg,#080e1e,#121228 50%,#c8c8c8)",      a:"#b0bec5" },
];

/* ═══════════════════ CSS-in-JS tokens ═══════════════════ */
const T = {
  bg:      "#06080f",
  surface: "rgba(14,17,28,.65)",
  glass:   "rgba(255,255,255,.04)",
  border:  "rgba(255,255,255,.07)",
  text:    "#e8ecf4",
  muted:   "#6b7a94",
  dim:     "#3a4560",
  violet:  "#8b5cf6",
  cyan:    "#22d3ee",
  lime:    "#a3e635",
  coral:   "#fb7185",
  radius:  14,
};

const font = "'Inter','Segoe UI',system-ui,-apple-system,sans-serif";

/* ═══════════════════ COMPONENTS ═══════════════════ */

function Pill({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: active ? `linear-gradient(135deg,${T.violet},#6d28d9)` : "transparent",
      border: "none", padding: "7px 14px", cursor: "pointer", borderRadius: 40,
      color: active ? "#fff" : T.muted, fontSize: 13, fontWeight: 700,
      letterSpacing: .4, transition: "all .2s",
    }}>{children}</button>
  );
}

function TopBar({ lang, setLang, cur, setCur }) {
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", justifyContent:"space-between", alignItems:"center",
      padding:"10px 20px", background:"rgba(6,8,15,.8)", backdropFilter:"blur(14px)", borderBottom:`1px solid ${T.border}` }}>
      <span style={{ fontWeight:800, fontSize:15, letterSpacing:-.3, color:T.text, fontFamily:font }}>
        <span style={{ color:T.violet }}>Trade-In</span> Digital
      </span>
      <div style={{ display:"flex", gap:6 }}>
        <div style={{ display:"flex", background:"rgba(255,255,255,.06)", borderRadius:40, padding:2 }}>
          <Pill active={lang==="fr"} onClick={()=>setLang("fr")}>FR</Pill>
          <Pill active={lang==="en"} onClick={()=>setLang("en")}>EN</Pill>
        </div>
        <div style={{ display:"flex", background:"rgba(255,255,255,.06)", borderRadius:40, padding:2 }}>
          <Pill active={cur==="eur"} onClick={()=>setCur("eur")}>€</Pill>
          <Pill active={cur==="usd"} onClick={()=>setCur("usd")}>$</Pill>
        </div>
      </div>
    </div>
  );
}

function GameCard({ game, selected, onClick, sym, cur }) {
  const price = cur==="eur" ? game.eur : game.usd;
  return (
    <button onClick={onClick} style={{
      flex:"0 0 130px", background:"none", border:"none", padding:0, cursor:"pointer", textAlign:"left", outline:"none",
      transform: selected ? "scale(1.06)" : "scale(1)",
      transition: "transform .3s cubic-bezier(.4,0,.2,1), filter .3s",
      filter: selected ? "brightness(1.1)" : "brightness(.85)",
    }}>
      <div style={{
        width:130, height:175, background:game.g, borderRadius:12,
        padding:"12px 10px", display:"flex", flexDirection:"column", justifyContent:"flex-end",
        position:"relative", overflow:"hidden",
        border: selected ? `2px solid ${game.a}` : "2px solid transparent",
        boxShadow: selected ? `0 0 28px ${game.a}55, 0 12px 32px rgba(0,0,0,.5)` : "0 6px 18px rgba(0,0,0,.35)",
      }}>
        <div style={{ position:"absolute", top:8, left:8, background:"rgba(0,0,0,.5)", backdropFilter:"blur(4px)", borderRadius:4, padding:"2px 6px" }}>
          <span style={{ fontSize:8, color:"#bbb", fontWeight:700, letterSpacing:.4 }}>{game.genre}</span>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"55%", background:"linear-gradient(transparent,rgba(0,0,0,.75))" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontSize:12, fontWeight:800, color:"#fff", lineHeight:1.2, marginBottom:2, textShadow:"0 1px 4px rgba(0,0,0,.6)" }}>{game.title}</div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,.5)", marginBottom:4 }}>{game.pub}</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:13, fontWeight:800, color:game.a }}>{sym}{price}</span>
            <span style={{ fontSize:8, color:"rgba(255,255,255,.35)" }}>{game.year}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function Ring({ pct, color, size, label, amount, sym }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
      <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={8} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition:"stroke-dashoffset .7s cubic-bezier(.4,0,.2,1)" }} />
      </svg>
      <div style={{ textAlign:"center", marginTop:-size/2 - 8, marginBottom: size/2 - 28 }}>
        <div style={{ fontSize:18, fontWeight:800, color }}>{sym}{amount.toFixed(0)}</div>
        <div style={{ fontSize:10, color:T.muted }}>{pct}%</div>
      </div>
      <div style={{ fontSize:11, color:T.muted, fontWeight:600, marginTop:4 }}>{label}</div>
    </div>
  );
}

function StatCard({ value, label, sub, color }) {
  return (
    <div style={{ background:T.surface, backdropFilter:"blur(10px)", borderRadius:T.radius, padding:"20px 16px",
      border:`1px solid ${T.border}`, textAlign:"center", flex:"1 1 0" }}>
      <div style={{ fontSize:26, fontWeight:800, color, marginBottom:2, letterSpacing:-.5 }}>{value}</div>
      <div style={{ fontSize:12, fontWeight:600, color:T.text }}>{label}</div>
      <div style={{ fontSize:10, color:T.muted, marginTop:2 }}>{sub}</div>
    </div>
  );
}

/* ═══════════════════ MAIN ═══════════════════ */
export default function TradeInSimulator() {
  const [sel, setSel]     = useState(GAMES[0]);
  const [pct, setPct]     = useState(45);
  const [info, setInfo]   = useState(false);
  const [lang, setLang]   = useState("fr");
  const [cur, setCur]     = useState("eur");

  const t   = i18n[lang];
  const sym = cur==="eur" ? "€" : "$";
  const bp  = cur==="eur" ? sel.eur : sel.usd;

  const rp  = useMemo(()=> +(bp * pct / 100).toFixed(2), [bp, pct]);
  const ss  = +(rp * .70).toFixed(2);
  const ps  = +(rp * .20).toFixed(2);
  const fs  = +(rp * .10).toFixed(2);
  const sav = +(bp - rp).toFixed(2);

  const f = useCallback(n => `${sym}${n.toFixed(0)}`, [sym]);

  const age = 2026 - sel.year;
  const ageLabel = age===0 ? t.thisYear : age===1 ? `1 ${t.oneYear}` : `${age}${t.nYears}`;

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:font, color:T.text, margin:0, padding:0, overflowX:"hidden" }}>
      <TopBar lang={lang} setLang={setLang} cur={cur} setCur={setCur} />

      {/* ── HERO ── */}
      <div style={{ padding:"80px 24px 28px", maxWidth:680, margin:"0 auto", textAlign:"center" }}>
        <div style={{ display:"inline-block", background:`linear-gradient(135deg,${T.violet},${T.cyan})`, borderRadius:40, padding:"5px 16px", marginBottom:18 }}>
          <span style={{ fontSize:11, fontWeight:700, color:"#06080f", letterSpacing:1 }}>{t.badge}</span>
        </div>
        <h1 style={{ fontSize:"clamp(28px,6vw,42px)", fontWeight:800, lineHeight:1.1, margin:"0 0 14px", letterSpacing:-.8 }}>
          {t.heroTitle1}
          <span style={{ background:`linear-gradient(135deg,${T.violet},${T.cyan})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{t.heroHighlight}</span>
          {t.heroTitle2}
        </h1>
        <p style={{ fontSize:15, color:T.muted, lineHeight:1.6, maxWidth:520, margin:"0 auto" }}>{t.heroSub}</p>
      </div>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"0 20px 56px" }}>

        {/* ── GAME CAROUSEL ── */}
        <p style={{ fontSize:13, color:T.dim, fontWeight:600, margin:"0 0 10px", letterSpacing:.2 }}>{t.pickGame}</p>
        <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:12, scrollSnapType:"x mandatory",
          WebkitOverflowScrolling:"touch", msOverflowStyle:"none", scrollbarWidth:"none" }}>
          {GAMES.map(g => <GameCard key={g.id} game={g} selected={sel.id===g.id} onClick={()=>setSel(g)} sym={sym} cur={cur} />)}
        </div>

        {/* ── SELECTED GAME + SLIDER ── */}
        <div style={{ background:T.surface, backdropFilter:"blur(12px)", borderRadius:T.radius, padding:"24px 22px",
          marginTop:20, marginBottom:24, border:`1px solid ${sel.a}22`, transition:"border-color .3s" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10, marginBottom:20 }}>
            <div style={{ display:"flex", gap:14, alignItems:"center" }}>
              <div style={{ width:44, height:60, borderRadius:8, background:sel.g, boxShadow:`0 4px 14px ${sel.a}33`, transition:"all .3s", flexShrink:0 }} />
              <div>
                <div style={{ fontSize:20, fontWeight:800, color:"#fff", letterSpacing:-.3 }}>{sel.title}</div>
                <div style={{ fontSize:12, color:T.muted, marginTop:2 }}>{sel.pub} · {ageLabel} · {sel.genre}</div>
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:11, color:T.dim }}>{t.newPrice}</div>
              <div style={{ fontSize:22, fontWeight:800, letterSpacing:-.3 }}>{sym}{bp}</div>
            </div>
          </div>

          <div style={{ marginBottom:6 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:10 }}>
              <span style={{ fontSize:13, fontWeight:600, color:T.muted }}>{t.resaleLabel}</span>
              <span style={{ fontSize:28, fontWeight:800, background:`linear-gradient(135deg,${T.violet},${T.cyan})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:-.5 }}>
                {sym}{rp.toFixed(2)} <span style={{ fontSize:13, fontWeight:500, WebkitTextFillColor:T.muted, background:"none", WebkitBackgroundClip:"unset" }}>({pct}%)</span>
              </span>
            </div>
            <div style={{ position:"relative", height:28, display:"flex", alignItems:"center" }}>
              <div style={{ position:"absolute", left:0, right:0, height:6, borderRadius:3, background:"rgba(255,255,255,.06)" }} />
              <div style={{ position:"absolute", left:0, width:`${((pct-10)/65)*100}%`, height:6, borderRadius:3,
                background:`linear-gradient(90deg,${T.violet},${T.cyan})`, transition:"width .15s" }} />
              <input type="range" min={10} max={75} value={pct} onChange={e=>setPct(+e.target.value)}
                style={{ position:"relative", width:"100%", height:28, cursor:"pointer", opacity:0 }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:T.dim, marginTop:2 }}>
              <span>10%</span><span>75%</span>
            </div>
          </div>
        </div>

        {/* ── REVENUE RINGS ── */}
        <div style={{ marginBottom:28 }}>
          <p style={{ fontSize:15, fontWeight:700, margin:"0 0 18px", letterSpacing:-.2 }}>{t.splitTitle}</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {/* Digital */}
            <div style={{ background:T.surface, backdropFilter:"blur(10px)", borderRadius:T.radius, padding:"22px 14px",
              border:`1px solid rgba(163,230,53,.12)`, textAlign:"center" }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.lime, marginBottom:14, letterSpacing:.3 }}>{t.digitalTitle}</div>
              <div style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap" }}>
                <Ring pct={70} color={T.violet} size={72} label={t.seller}    amount={ss} sym={sym} />
                <Ring pct={20} color={T.lime}   size={72} label={t.publisher} amount={ps} sym={sym} />
                <Ring pct={10} color={T.cyan}   size={72} label={t.platform}  amount={fs} sym={sym} />
              </div>
            </div>
            {/* Physical */}
            <div style={{ background:T.surface, backdropFilter:"blur(10px)", borderRadius:T.radius, padding:"22px 14px",
              border:`1px solid rgba(251,113,133,.12)`, textAlign:"center" }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.coral, marginBottom:14, letterSpacing:.3 }}>{t.physicalTitle}</div>
              <div style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap" }}>
                <Ring pct={100} color={T.muted} size={72} label={t.seller}    amount={rp} sym={sym} />
                <Ring pct={0}   color={T.coral} size={72} label={t.publisher} amount={0}  sym={sym} />
                <Ring pct={0}   color={T.coral} size={72} label={t.platform}  amount={0}  sym={sym} />
              </div>
            </div>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div style={{ display:"flex", gap:10, marginBottom:28, flexWrap:"wrap" }}>
          <StatCard value={f(ss)}              label={t.forSeller}    sub={t.sellerSub}    color={T.violet} />
          <StatCard value={f(ps)}              label={t.forPublisher} sub={t.publisherSub} color={T.lime} />
          <StatCard value={`-${sym}${sav.toFixed(0)}`} label={t.buyerSaving}  sub={`${t.buyerSubVs}${sym}${bp}${t.buyerSubPost}`} color={T.cyan} />
        </div>

        {/* ── TODAY vs TOMORROW ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:28 }}>
          <div style={{ background:"rgba(251,113,133,.06)", borderRadius:T.radius, padding:"20px 18px", border:"1px solid rgba(251,113,133,.12)" }}>
            <div style={{ fontSize:14, fontWeight:800, color:T.coral, marginBottom:6 }}>{t.today}</div>
            <p style={{ fontSize:13, color:T.muted, lineHeight:1.55, margin:0 }}>{t.zeroPublisher}</p>
          </div>
          <div style={{ background:"rgba(163,230,53,.06)", borderRadius:T.radius, padding:"20px 18px", border:"1px solid rgba(163,230,53,.12)" }}>
            <div style={{ fontSize:14, fontWeight:800, color:T.lime, marginBottom:6 }}>{t.tomorrow}</div>
            <p style={{ fontSize:13, color:T.muted, lineHeight:1.55, margin:0 }}>{t.tomorrowSub}</p>
          </div>
        </div>

        {/* ── WIN-WIN ── */}
        <div style={{ background:`linear-gradient(135deg,rgba(139,92,246,.06),rgba(34,211,238,.06))`, borderRadius:T.radius,
          padding:"26px 22px", border:`1px solid rgba(139,92,246,.15)`, marginBottom:32 }}>
          <p style={{ fontSize:16, fontWeight:700, margin:"0 0 16px", color:T.violet }}>{t.whyTitle}</p>
          {[
            { who:t.who1, why:`${t.why1a}${f(ss)}${t.why1b}` },
            { who:t.who2, why:`${t.why2a}${f(ps)}${t.why2b}` },
            { who:t.who3, why:`${t.why3a}${f(rp)}${t.why3b}${sym}${bp}${t.why3c}` },
            { who:t.who4, why:`${t.why4a}${f(fs)}${t.why4b}` },
          ].map((item,i) => (
            <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:i<3?12:0 }}>
              <span style={{ color:T.lime, fontSize:14, marginTop:1, flexShrink:0 }}>→</span>
              <p style={{ margin:0, fontSize:13, color:"#b4bfd0", lineHeight:1.55 }}>
                <strong style={{ color:T.text }}>{item.who}</strong> {item.why}
              </p>
            </div>
          ))}
        </div>

        {/* ── CONTEXT ── */}
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <button onClick={()=>setInfo(!info)} style={{
            background:T.surface, border:`1px solid ${T.border}`, borderRadius:40,
            padding:"9px 22px", color:T.muted, fontSize:12, cursor:"pointer", fontWeight:600, backdropFilter:"blur(8px)",
          }}>{info ? t.ctxBtnHide : t.ctxBtn}</button>
          {info && (
            <div style={{ marginTop:16, background:T.surface, borderRadius:T.radius, padding:"24px 20px",
              border:`1px solid ${T.border}`, textAlign:"left", backdropFilter:"blur(10px)" }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:14, marginBottom:18 }}>
                {[{n:t.stat1v,l:t.stat1l},{n:t.stat2v,l:t.stat2l},{n:t.stat3v,l:t.stat3l},{n:t.stat4v,l:t.stat4l}].map((s,i) => (
                  <div key={i} style={{ textAlign:"center" }}>
                    <div style={{ fontSize:20, fontWeight:800, color:T.violet }}>{s.n}</div>
                    <div style={{ fontSize:10, color:T.muted }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize:12, color:T.muted, lineHeight:1.6, margin:0 }}>{t.ctxP}</p>
              <p style={{ fontSize:10, color:T.dim, marginTop:10, marginBottom:0 }}>{t.ctxSrc}</p>
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <div style={{ textAlign:"center", padding:"18px 0 8px", borderTop:`1px solid ${T.border}` }}>
          <p style={{ fontSize:13, color:T.dim, margin:"0 0 4px" }}>{t.footerBy}</p>
          <p style={{ fontSize:16, fontWeight:800, margin:"0 0 6px" }}>
            <span style={{ color:T.violet }}>Trade-In</span> <span style={{ color:T.text }}>Digital</span>
          </p>
          <p style={{ fontSize:11, color:T.dim, margin:0 }}>{t.footerSub}</p>
        </div>
      </div>

      <style>{`*{box-sizing:border-box}::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}
