import { useState, useMemo, useCallback, useEffect } from "react";

/* ═══════════════════ i18n ═══════════════════ */
const i18n = {
  fr: {
    shareLabel: "Partager",
    shareCopied: "Copié !",
    kicker: "Simulateur interactif",
    titlePart1: "Et si vous pouviez ",
    titleHighlight: "revendre",
    titlePart2: " vos jeux numériques ?",
    subtitle: "PlayStation supprime le lecteur disque dès janvier 2028. Plus de 350 000 joueurs ont déjà signé contre cette décision. Voici la solution que personne ne propose encore.",
    quote: "La valeur ne devrait jamais cesser de circuler. Elle devrait simplement changer de mains, encore et encore.",
    quoteAttribution: "— La thèse du trade-in digital",
    instructions: "Choisissez un jeu ci-dessous, puis ajustez le curseur pour simuler une revente.",
    carouselLabel: "Bibliothèque",
    carouselTitle: "Choisissez un jeu",
    newPriceLabel: "Prix neuf",
    resaleLabel: "Prix de revente",
    digitalSplitTitle: "Revente numérique",
    physicalSplitTitle: "Occasion physique",
    seller: "Vendeur",
    publisher: "Éditeur",
    platform: "Plateforme",
    proofText: "Un petit changement. Tout le monde y gagne.",
    proofStat1Value: "5,86 Md€",
    proofStat1Label: "Marché du jeu vidéo en France, 2025",
    proofStat2Value: "68 %",
    proofStat2Label: "Part du numérique dans les ventes en Europe",
    proofStat3Value: "350K+",
    proofStat3Label: "Signataires de la pétition anti-disc kill",
    todayLabel: "Aujourd'hui",
    tomorrowLabel: "Demain",
    ewEyebrow: "Comment ça marche",
    ewHeading: "Tout le monde y gagne",
    ewSub: "Un modèle de commission simple qui transforme une revente sans valeur en revenu partagé.",
    ew1who: "Le vendeur", ew1a: "récupère ", ew1b: " sur un jeu qui dormait dans sa bibliothèque.",
    ew2who: "L'éditeur", ew2a: "touche ", ew2b: " par revente — contre 0 € aujourd'hui en occasion physique.",
    ew3who: "L'acheteur", ew3a: "accède au jeu pour ", ew3b: " au lieu de ", ew3c: ".",
    ew4who: "La plateforme", ew4a: "encaisse ", ew4b: " sur une transaction qui n'existait pas hier.",
    ctxShow: "Contexte & sources",
    ctxHide: "Masquer",
    ctxStat1Value: "5,86 Md€", ctxStat1Label: "Marché FR 2025",
    ctxStat2Value: "68 %", ctxStat2Label: "Ventes numériques UE",
    ctxStat3Value: "350K+", ctxStat3Label: "Pétition anti-disc kill",
    ctxStat4Value: "0 €", ctxStat4Label: "Part éditeur sur l'occasion",
    ctxParagraph: "Le 1ᵉʳ juillet 2026, PlayStation a annoncé la fin des disques physiques à partir de janvier 2028. Les joueurs perdent leur dernier levier de revente. L'arrêt de la Cour de cassation (octobre 2024, UFC-Que Choisir c/ Valve) confirme qu'aucun droit de revente numérique n'existe aujourd'hui en France. Pourtant la technologie est prête : ce simulateur montre qu'un modèle de trade-in digital avec commission éditeur est non seulement viable, mais plus rentable pour toute l'industrie que l'occasion physique.",
    ctxSources: "Sources : SELL 2025 · Newzoo · Panel GSD · Cour de cassation, oct. 2024 · PlayStation Blog, 1ᵉʳ juil. 2026",
    footerBy: "Un concept de",
    footerTagline: "Repenser la seconde vie du jeu vidéo.",
    ctaHeading: "Vous voulez en discuter ?",
    ctaSubtitle: "Ce modèle vous intéresse ? Contactez-moi.",
    ctaButton: "Me contacter sur LinkedIn",
  },
  en: {
    shareLabel: "Share",
    shareCopied: "Copied!",
    kicker: "Interactive simulator",
    titlePart1: "What if you could ",
    titleHighlight: "resell",
    titlePart2: " your digital games?",
    subtitle: "PlayStation is killing the disc drive starting January 2028. Over 350,000 gamers have already signed against it. Here's the solution no one is offering yet.",
    quote: "Value should never stop moving. It should simply change hands, again and again.",
    quoteAttribution: "— The trade-in digital thesis",
    instructions: "Pick a game below, then adjust the slider to simulate a resale.",
    carouselLabel: "Library",
    carouselTitle: "Pick a game",
    newPriceLabel: "Retail price",
    resaleLabel: "Resale price",
    digitalSplitTitle: "Digital resale",
    physicalSplitTitle: "Physical second-hand",
    seller: "Seller",
    publisher: "Publisher",
    platform: "Platform",
    proofText: "One small change. Everybody wins.",
    proofStat1Value: "$6.4B",
    proofStat1Label: "French video game market, 2025",
    proofStat2Value: "68%",
    proofStat2Label: "Share of digital sales in Europe",
    proofStat3Value: "350K+",
    proofStat3Label: "Signatures against killing the disc",
    todayLabel: "Today",
    tomorrowLabel: "Tomorrow",
    ewEyebrow: "How it works",
    ewHeading: "Everybody wins",
    ewSub: "A simple commission model that turns a worthless resale into shared revenue.",
    ew1who: "The seller", ew1a: "recovers ", ew1b: " from a game gathering dust in their library.",
    ew2who: "The publisher", ew2a: "earns ", ew2b: " per resale — versus $0 today in physical second-hand.",
    ew3who: "The buyer", ew3a: "gets the game for ", ew3b: " instead of ", ew3c: ".",
    ew4who: "The platform", ew4a: "collects ", ew4b: " on a transaction that didn't exist yesterday.",
    ctxShow: "Context & sources",
    ctxHide: "Hide",
    ctxStat1Value: "$6.4B", ctxStat1Label: "French market 2025",
    ctxStat2Value: "68%", ctxStat2Label: "Digital sales in the EU",
    ctxStat3Value: "350K+", ctxStat3Label: "Anti-disc-kill petition",
    ctxStat4Value: "$0", ctxStat4Label: "Publisher cut on second-hand",
    ctxParagraph: "On July 1, 2026, PlayStation announced the end of physical discs starting January 2028. Gamers are losing their last resale lever. A French Supreme Court ruling (October 2024, UFC-Que Choisir v. Valve) confirms no digital resale right currently exists in France. Yet the technology is ready: this simulator shows that a digital trade-in model with a publisher commission is not only viable, but more profitable for the whole industry than physical second-hand.",
    ctxSources: "Sources: SELL 2025 · Newzoo · GSD Panel · French Supreme Court, Oct. 2024 · PlayStation Blog, Jul. 1 2026",
    footerBy: "A concept by",
    footerTagline: "Reimagining the second life of video games.",
    ctaHeading: "Want to discuss?",
    ctaSubtitle: "Interested in this model? Let's talk.",
    ctaButton: "Contact me on LinkedIn",
  },
};

/* ═══════════════════ GAMES ═══════════════════ */
const GAMES = [
  { id: 1, title: "GTA VI", publisher: "Rockstar", eur: 79.99, usd: 69.99, year: 2026, from: "#78a83d", to: "#e7b94c" },
  { id: 2, title: "Assassin's Creed Shadows", publisher: "Ubisoft", eur: 69.99, usd: 69.99, year: 2025, from: "#1d2947", to: "#cc5960" },
  { id: 3, title: "EA Sports FC 26", publisher: "EA", eur: 69.99, usd: 69.99, year: 2025, from: "#35a981", to: "#0e4165" },
  { id: 4, title: "Resident Evil Requiem", publisher: "Capcom", eur: 69.99, usd: 69.99, year: 2026, from: "#591f2d", to: "#b5473d" },
  { id: 5, title: "Final Fantasy VII Rebirth", publisher: "Square Enix", eur: 69.99, usd: 69.99, year: 2024, from: "#3586c4", to: "#9dd8e2" },
  { id: 6, title: "Elden Ring", publisher: "Bandai Namco", eur: 59.99, usd: 59.99, year: 2022, from: "#98772b", to: "#d8bc64" },
  { id: 7, title: "Spider-Man 2", publisher: "Sony", eur: 69.99, usd: 69.99, year: 2023, from: "#c73b46", to: "#273b89" },
  { id: 8, title: "Hogwarts Legacy", publisher: "Warner Bros.", eur: 59.99, usd: 59.99, year: 2023, from: "#263b69", to: "#ae7d34" },
  { id: 9, title: "Star Wars Outlaws", publisher: "Ubisoft", eur: 69.99, usd: 69.99, year: 2024, from: "#141c3a", to: "#e4a746" },
  { id: 10, title: "Astro Bot", publisher: "Sony", eur: 69.99, usd: 59.99, year: 2024, from: "#2f9dc2", to: "#e6c951" },
  { id: 11, title: "Call of Duty: Black Ops 6", publisher: "Activision", eur: 69.99, usd: 69.99, year: 2024, from: "#b55b31", to: "#292f38" },
  { id: 12, title: "Phantom Blade Zero", publisher: "S-Game", eur: 69.99, usd: 69.99, year: 2026, from: "#251d39", to: "#cc5b68" },
];

const SPLIT = { seller: 0.7, publisher: 0.2, platform: 0.1 };

function formatMoney(value, currency) {
  const locale = currency === "EUR" ? "fr-FR" : "en-US";
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
}

function pad(n) {
  return String(n).padStart(2, "0");
}

/* ═══════════════════ SMALL COMPONENTS ═══════════════════ */

function ToggleGroup({ options, value, onChange }) {
  return (
    <div className="toggle-group">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`toggle-btn${value === opt.value ? " active" : ""}`}
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function TopBar({ lang, setLang, currency, setCurrency, t }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const handleShare = useCallback(() => {
    navigator.clipboard
      ?.writeText(window.location.href)
      .then(() => setCopied(true))
      .catch(() => {});
  }, []);

  const handleLinkedInShare = useCallback(() => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <header className="topbar">
      <div className="logo">
        <span className="logo-icon" aria-hidden="true">
          <span className="logo-arrow">↗</span>
        </span>
        <span className="logo-text">
          <span className="coral-text">trade-in</span>
          <span className="logo-digital">digital</span>
        </span>
      </div>
      <div className="topbar-right">
        <ToggleGroup
          options={[{ value: "fr", label: "FR" }, { value: "en", label: "EN" }]}
          value={lang}
          onChange={setLang}
        />
        <ToggleGroup
          options={[{ value: "EUR", label: "€" }, { value: "USD", label: "$" }]}
          value={currency}
          onChange={setCurrency}
        />
        <button className="share-btn mono" onClick={handleShare}>
          {copied ? t.shareCopied : t.shareLabel}
        </button>
        <button className="linkedin-btn" onClick={handleLinkedInShare} aria-label="Share on LinkedIn" title="LinkedIn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </button>
      </div>
    </header>
  );
}

function Hero({ t, lang }) {
  const quoteMarks = lang === "fr" ? ["« ", " »"] : ["“", "”"];
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="kicker">
          <span className="kicker-line" aria-hidden="true" />
          <span className="coral-text">{t.kicker}</span>
        </div>
        <h1 className="display hero-title">
          {t.titlePart1}
          <span className="coral-text">{t.titleHighlight}</span>
          {t.titlePart2}
        </h1>
        <p className="hero-subtitle">{t.subtitle}</p>
      </div>
      <div className="hero-right">
        <div className="quote-card">
          <blockquote className="quote">{quoteMarks[0]}{t.quote}{quoteMarks[1]}</blockquote>
          <div className="quote-attribution mono">{t.quoteAttribution}</div>
          <div className="quote-instructions">
            <span className="live-dot" aria-hidden="true" />
            <span>{t.instructions}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function GameCard({ game, index, selected, onClick, currency }) {
  const price = currency === "EUR" ? game.eur : game.usd;
  return (
    <button
      className={`game-card${selected ? " selected" : ""}`}
      style={{ "--from": game.from, "--to": game.to }}
      onClick={onClick}
      aria-pressed={selected}
    >
      <div className="game-cover">
        <span className="game-tid mono">TID-{pad(index + 1)}</span>
        <span className="game-title">{game.title}</span>
      </div>
      <div className="game-meta">
        <span className="game-pub">{game.publisher} · {game.year}</span>
        <span className="game-price mono">{formatMoney(price, currency)}</span>
      </div>
    </button>
  );
}

function DonutChart({ title, segments, currency }) {
  let cursor = 0;
  const stops = segments
    .map((s) => {
      const start = cursor;
      cursor += s.pct;
      return `${s.color} ${start}% ${cursor}%`;
    })
    .join(", ");

  return (
    <div className="donut-chart">
      <span className="donut-chart-title">{title}</span>
      <div className="donut-body">
        <div className="donut-ring" style={{ background: `conic-gradient(${stops})` }}>
          <div className="donut-hole" />
        </div>
        <ul className="donut-legend">
          {segments.map((s) => (
            <li key={s.label}>
              <span className="legend-dot" style={{ background: s.color }} aria-hidden="true" />
              <span className="legend-label">{s.label}</span>
              <span className="legend-amount mono">{formatMoney(s.amount, currency)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ═══════════════════ MAIN ═══════════════════ */
export default function App() {
  const [lang, setLang] = useState("fr");
  const [currency, setCurrency] = useState("EUR");
  const [selectedGame, setSelectedGame] = useState(GAMES[0]);
  const [resalePct, setResalePct] = useState(45);
  const [ctxOpen, setCtxOpen] = useState(false);

  const t = i18n[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const basePrice = currency === "EUR" ? selectedGame.eur : selectedGame.usd;
  const resalePrice = useMemo(() => basePrice * (resalePct / 100), [basePrice, resalePct]);

  const sellerDigital = resalePrice * SPLIT.seller;
  const publisherDigital = resalePrice * SPLIT.publisher;
  const platformDigital = resalePrice * SPLIT.platform;
  const buyerSaving = basePrice - resalePrice;

  const ewItems = [
    { who: t.ew1who, text: <>{t.ew1a}<strong className="mono">{formatMoney(sellerDigital, currency)}</strong>{t.ew1b}</> },
    { who: t.ew2who, text: <>{t.ew2a}<strong className="mono">{formatMoney(publisherDigital, currency)}</strong>{t.ew2b}</> },
    { who: t.ew3who, text: <>{t.ew3a}<strong className="mono">{formatMoney(resalePrice, currency)}</strong>{t.ew3b}<strong className="mono">{formatMoney(basePrice, currency)}</strong>{t.ew3c}</> },
    { who: t.ew4who, text: <>{t.ew4a}<strong className="mono">{formatMoney(platformDigital, currency)}</strong>{t.ew4b}</> },
  ];

  return (
    <div className="page">
      <TopBar lang={lang} setLang={setLang} currency={currency} setCurrency={setCurrency} t={t} />

      <main>
        <Hero t={t} lang={lang} />

        <section className="carousel-section">
          <div className="carousel-header">
            <span className="eyebrow">{t.carouselLabel}</span>
            <h2 className="display">{t.carouselTitle}</h2>
          </div>
          <div className="carousel-track">
            {GAMES.map((game, i) => (
              <GameCard
                key={game.id}
                game={game}
                index={i}
                selected={selectedGame.id === game.id}
                onClick={() => setSelectedGame(game)}
                currency={currency}
              />
            ))}
          </div>
        </section>

        <section className="simulator-panel">
          <div className="simulator-left">
            <div className="sim-game-info">
              <div className="sim-cover" style={{ background: `linear-gradient(145deg, ${selectedGame.from}, ${selectedGame.to})` }} />
              <div>
                <div className="sim-game-title">{selectedGame.title}</div>
                <div className="sim-game-sub">{selectedGame.publisher} · {selectedGame.year}</div>
              </div>
            </div>

            <div className="sim-price-row">
              <span className="sim-label">{t.newPriceLabel}</span>
              <span className="sim-base-price mono">{formatMoney(basePrice, currency)}</span>
            </div>

            <div className="sim-resale">
              <div className="sim-resale-head">
                <span className="sim-label">{t.resaleLabel}</span>
                <span className="sim-resale-price mono">
                  {formatMoney(resalePrice, currency)} <small>({resalePct}%)</small>
                </span>
              </div>
              <input
                type="range"
                className="gold-slider"
                min={10}
                max={75}
                value={resalePct}
                onChange={(e) => setResalePct(+e.target.value)}
                aria-label={t.resaleLabel}
              />
              <div className="slider-scale">
                <span>10%</span>
                <span>75%</span>
              </div>
            </div>
          </div>

          <div className="simulator-right">
            <DonutChart
              title={t.digitalSplitTitle}
              currency={currency}
              segments={[
                { pct: 70, color: "var(--purple)", label: t.seller, amount: sellerDigital },
                { pct: 20, color: "var(--teal)", label: t.publisher, amount: publisherDigital },
                { pct: 10, color: "var(--gold)", label: t.platform, amount: platformDigital },
              ]}
            />
            <DonutChart
              title={t.physicalSplitTitle}
              currency={currency}
              segments={[
                { pct: 100, color: "var(--panel-muted)", label: t.seller, amount: resalePrice },
                { pct: 0, color: "var(--panel-muted)", label: t.publisher, amount: 0 },
                { pct: 0, color: "var(--panel-muted)", label: t.platform, amount: 0 },
              ]}
            />
          </div>
        </section>

        <section className="proof">
          <p className="display proof-text coral-text">{t.proofText}</p>
          <div className="proof-stats">
            <div className="proof-stat featured">
              <span className="stat-value mono">{t.proofStat1Value}</span>
              <span className="stat-label">{t.proofStat1Label}</span>
            </div>
            <div className="proof-stat">
              <span className="stat-value mono">{t.proofStat2Value}</span>
              <span className="stat-label">{t.proofStat2Label}</span>
            </div>
            <div className="proof-stat">
              <span className="stat-value mono">{t.proofStat3Value}</span>
              <span className="stat-label">{t.proofStat3Label}</span>
            </div>
          </div>
        </section>

        <section className="today-tomorrow">
          <div className="tt-card today">
            <h3 className="tt-heading">{t.todayLabel}</h3>
            <div className="tt-row"><span>{t.seller}</span><span className="mono">{formatMoney(resalePrice, currency)}</span></div>
            <div className="tt-row"><span>{t.publisher}</span><span className="mono">{formatMoney(0, currency)}</span></div>
            <div className="tt-row"><span>{t.platform}</span><span className="mono">{formatMoney(0, currency)}</span></div>
          </div>
          <div className="tt-card tomorrow">
            <h3 className="tt-heading">{t.tomorrowLabel}</h3>
            <div className="tt-row"><span>{t.seller}</span><span className="mono">{formatMoney(sellerDigital, currency)}</span></div>
            <div className="tt-row"><span>{t.publisher}</span><span className="mono">{formatMoney(publisherDigital, currency)}</span></div>
            <div className="tt-row"><span>{t.platform}</span><span className="mono">{formatMoney(platformDigital, currency)}</span></div>
          </div>
        </section>

        <section className="everybody-wins">
          <div className="ew-left">
            <span className="eyebrow teal-text">{t.ewEyebrow}</span>
            <h2 className="display ew-heading teal-text">{t.ewHeading}</h2>
            <p className="ew-sub">{t.ewSub}</p>
          </div>
          <ul className="ew-list">
            {ewItems.map((item, i) => (
              <li key={i}>
                <span className="ew-circle">{i + 1}</span>
                <p><strong>{item.who}</strong> {item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="contact-cta">
          <h2 className="display cta-heading">{t.ctaHeading}</h2>
          <p className="cta-subtitle">{t.ctaSubtitle}</p>
          <a
            className="cta-button"
            href="https://www.linkedin.com/in/dwayndalmeida/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.ctaButton}
          </a>
        </section>

        <section className="context">
          <button className="context-toggle mono" onClick={() => setCtxOpen(!ctxOpen)} aria-expanded={ctxOpen}>
            {ctxOpen ? t.ctxHide : t.ctxShow}
            <span className={`chevron${ctxOpen ? " open" : ""}`} aria-hidden="true">⌄</span>
          </button>
          {ctxOpen && (
            <div className="context-body">
              <div className="context-stats">
                <div><span className="stat-value mono">{t.ctxStat1Value}</span><span className="stat-label">{t.ctxStat1Label}</span></div>
                <div><span className="stat-value mono">{t.ctxStat2Value}</span><span className="stat-label">{t.ctxStat2Label}</span></div>
                <div><span className="stat-value mono">{t.ctxStat3Value}</span><span className="stat-label">{t.ctxStat3Label}</span></div>
                <div><span className="stat-value mono">{t.ctxStat4Value}</span><span className="stat-label">{t.ctxStat4Label}</span></div>
              </div>
              <p className="context-p">{t.ctxParagraph}</p>
              <p className="context-sources mono">{t.ctxSources}</p>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-credits">
          <span>{t.footerBy}</span>
          <strong>Trade-In Digital</strong>
        </div>
        <div className="footer-tagline coral-text">{t.footerTagline}</div>
      </footer>
    </div>
  );
}
