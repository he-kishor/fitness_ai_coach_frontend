import { useState, useEffect } from "react";
import "./intro.css";

import { Button }  from "../componets/Button";
import { FeatureCard, StatCard } from "../componets/Card";
import { Pill }  from "../componets/Pill";
import { StatusDot }  from "../componets/statusDot";
import { Label }  from "../componets/Label";
import {
  HeartIcon,
  FireIcon,
  BrainIcon,
  ZapIcon,
  ShieldIcon,
  StarIcon,
} from "../componets/icons";

// ─── Types ────────────────────────────────────────────────────────────────────

type StatChangeType = "up" | "down" | "neutral";

interface Feature {
  icon:        React.ReactNode;
  title:       string;
  description: string;
  tag:         string;
  tagColor:    "green" | "blue" | "purple" | "orange" | "teal";
  accent?:     boolean;
}

interface Stat {
  value:       string;
  label:       string;
  change:      string;
  changeType:  StatChangeType;
  icon:        React.ReactNode;
}

interface SocialUser {
  initials: string;
  bg:       string;
}

interface FloatingCard {
  emoji:    string;
  title:    string;
  sub:      string;
  position: React.CSSProperties;
}

interface StepItem {
  step:  string;
  title: string;
  desc:  string;
  color: string;
  bg:    string;
}

// ─── 2D Flat Cartoon Mascot ───────────────────────────────────────────────────

const AIMascot: React.FC<{ animate: boolean }> = ({ animate }) => (
  <svg
    width="200"
    height="260"
    viewBox="0 0 220 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`mascot-svg ${animate ? "mascot-svg--up" : ""}`}
  >
    <ellipse cx="110" cy="272" rx="52" ry="7" fill="rgba(0,0,0,0.06)" />
    <rect x="80"  y="198" width="22" height="50" rx="11" fill="#1e293b" />
    <rect x="114" y="198" width="22" height="50" rx="11" fill="#1e293b" />
    <ellipse cx="91"  cy="249" rx="15" ry="7" fill="#0f172a" />
    <ellipse cx="125" cy="249" rx="15" ry="7" fill="#0f172a" />
    <rect x="70" y="128" width="80" height="78" rx="20" fill="#4ADE80" />
    <rect x="96" y="146" width="28" height="20" rx="6" fill="white" opacity="0.92" />
    <text x="110" y="160" textAnchor="middle" fontSize="8" fontWeight="700" fill="#16a34a" fontFamily="monospace">AI</text>
    {/* Left arm — rotates when animate=true */}
    <rect
      x="34" y="130" width="20" height="56" rx="10" fill="#4ADE80"
      className={`mascot-arm ${animate ? "mascot-arm--wave" : ""}`}
    />
    <circle cx="40"  cy="188" r="10" fill="#FDDBB4" />
    <rect x="166" y="130" width="20" height="56" rx="10" fill="#4ADE80" />
    <circle cx="176" cy="188" r="10" fill="#FDDBB4" />
    <rect x="100" y="110" width="20" height="20" rx="8" fill="#FDDBB4" />
    <ellipse cx="110" cy="88" rx="44" ry="44" fill="#FDDBB4" />
    <ellipse cx="110" cy="47" rx="42" ry="16" fill="#2D2D2D" />
    <rect x="68" y="46" width="84" height="18" rx="8" fill="#2D2D2D" />
    <ellipse cx="110" cy="43" rx="12" ry="9" fill="#2D2D2D" />
    <path d="M68 76 Q110 68 152 76" stroke="#4ADE80" strokeWidth="7" strokeLinecap="round" fill="none" />
    <ellipse cx="94"  cy="88" rx="8" ry="9" fill="white" />
    <ellipse cx="126" cy="88" rx="8" ry="9" fill="white" />
    <circle cx="96"  cy="89"   r="5"   fill="#1e293b" />
    <circle cx="128" cy="89"   r="5"   fill="#1e293b" />
    <circle cx="97.5"  cy="87.5" r="1.8" fill="white" />
    <circle cx="129.5" cy="87.5" r="1.8" fill="white" />
    <path d="M86 76 Q94 72 102 76"  stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M118 76 Q126 72 134 76" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M97 104 Q110 115 123 104" stroke="#e05c2a" strokeWidth="2.8" strokeLinecap="round" fill="none" />
    <ellipse cx="84"  cy="101" rx="9" ry="5.5" fill="#FCA5A5" opacity="0.5" />
    <ellipse cx="136" cy="101" rx="9" ry="5.5" fill="#FCA5A5" opacity="0.5" />
  </svg>
);

// ─── Static Data ──────────────────────────────────────────────────────────────

const features: Feature[] = [
  { icon: <HeartIcon  />, title: "Personalized Diet Plans",    description: "AI analyzes your age, weight, goals, and local food to craft a plan that truly fits your life and culture.", tag: "Nutrition", tagColor: "green"  },
  { icon: <FireIcon   />, title: "Adaptive Training Programs", description: "Workouts that evolve with your progress, schedule, and available equipment — no gym required.",              tag: "Training",  tagColor: "orange" },
  { icon: <ShieldIcon />, title: "Injury-Aware Coaching",      description: "Tell your coach about pain mid-chat. Your plan updates instantly to keep you safe and moving forward.",         tag: "Health",    tagColor: "blue"   },
  { icon: <BrainIcon  />, title: "Multilingual AI Chat",       description: "Talk in any language. Your coach understands, responds naturally, and never loses context.",                    tag: "AI",        tagColor: "purple" },
  { icon: <ZapIcon    />, title: "Progress Tracking",          description: "Visual dashboards track every milestone. Celebrate wins and auto-adjust when life gets in the way.",            tag: "Analytics", tagColor: "teal"   },
  { icon: <StarIcon   />, title: "Custom Avatar Coach",        description: "Pick your cartoon coach persona. Fitness conversations finally feel fun, not clinical.",                        tag: "Experience",tagColor: "orange", accent: true },
];

const stats: Stat[] = [
  { value: "10+", label: "Active Users",        change: "+24% this month",   changeType: "up",      icon: <HeartIcon /> },
  { value: "40%",  label: "Goal Achievement",    change: "+3% vs last month", changeType: "up",      icon: <StarIcon  /> },
  { value: "50+",  label: "Languages Supported", change: "Always growing",    changeType: "neutral", icon: <BrainIcon /> },
  { value: "24/7", label: "AI Coach Available",  change: "Zero downtime",     changeType: "neutral", icon: <ZapIcon   /> },
];

const socialUsers: SocialUser[] = [
  { initials: "A", bg: "#f87171" },
  { initials: "B", bg: "#60a5fa" },
  { initials: "C", bg: "#fbbf24" },
  { initials: "D", bg: "#4ADE80" },
  { initials: "E", bg: "#c084fc" },
];

const floatingCards: FloatingCard[] = [
  { emoji: "💪", title: "Workout Updated", sub: "Adapted for your knee",    position: { top: "1px",   right: "-80px" } },
  { emoji: "🥗", title: "Diet Plan Ready", sub: "1,840 kcal · High protein",position: { bottom: "28px", left: "-24px"  } },
];

const steps: StepItem[] = [
  { step: "01", title: "Create your profile",  desc: "Share your age, height, weight, goals, and any injuries. Takes under 2 minutes.",                           color: "#16a34a", bg: "#f0fdf4" },
  { step: "02", title: "Meet your AI coach",   desc: "Your personalized diet and training plan is generated instantly. Pick your cartoon coach avatar.",           color: "#2563eb", bg: "#eff6ff" },
  { step: "03", title: "Chat, track & grow",   desc: "Chat daily, log progress, get plan updates. Your coach adapts as your life changes.",                       color: "#9333ea", bg: "#fdf4ff" },
];

const pillTags = [
  { label: "Nutrition",   color: "green"  as const },
  { label: "Strength",    color: "orange" as const },
  { label: "Weight Loss", color: "blue"   as const },
  { label: "Flexibility", color: "teal"   as const },
  { label: "Recovery",    color: "purple" as const },
  { label: "Injury Care", color: "orange" as const },
  { label: "Mindfulness", color: "teal"   as const },
];


// ─────────────────────────────────────────────────────────────────────────────
//  INTRO PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function IntroPage() {
  const [mascotAnimate,    setMascotAnimate]    = useState(false);
  const [heroVisible,      setHeroVisible]      = useState(false);
  const [visibleFeatures,  setVisibleFeatures]  = useState<number[]>([]);
  const [visibleStats,     setVisibleStats]     = useState<number[]>([]);

  // Mascot bounce loop
  useEffect(() => {
    const id = setInterval(() => setMascotAnimate(p => !p), 1800);
    return () => clearInterval(id);
  }, []);

  // Hero entrance
  useEffect(() => {
    const id = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(id);
  }, []);

  // Staggered feature cards
  useEffect(() => {
    const ids = features.map((_, i) =>
      setTimeout(() => setVisibleFeatures(p => [...p, i]), 900 + i * 110)
    );
    return () => ids.forEach(clearTimeout);
  }, []);

  // Staggered stat cards
  useEffect(() => {
    const ids = stats.map((_, i) =>
      setTimeout(() => setVisibleStats(p => [...p, i]), 600 + i * 100)
    );
    return () => ids.forEach(clearTimeout);
  }, []);

  return (
    <div className="intro-page">

      {/* ── NAVBAR ──────────────────────────────────────────────────── */}
      <nav className="intro-nav">

        {/* Logo */}
        <div className="intro-nav__logo">
          <div className="intro-nav__logo-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3l1.5 4h4l-3.2 2.4 1.2 3.9L9 11l-3.5 2.3 1.2-3.9L3.5 7h4z" fill="white" />
            </svg>
          </div>
          <span className="intro-nav__logo-text">
            Vital<span>Coach</span>
          </span>
        </div>

       

        {/* Auth buttons */}
        <div className="intro-nav__auth">
          <Button variant="secondary" size="sm">Sign in</Button>
          <Button variant="primary"   size="sm">Get Started Free</Button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="intro-section intro-hero">
        <div className="intro-hero__grid">

          {/* Left — text */}
          <div className="intro-hero__left">

            {/* Live badge */}
            <div className={`fade-up ${heroVisible ? "show" : ""}`} style={{ transitionDelay: "0ms" }}>
              <div className="intro-hero__badge">
                <StatusDot status="online" size="sm" pulse />
                <span className="intro-hero__badge-text">Your AI Coach is ready</span>
                <Label text="New" color="green" size="sm" />
              </div>
            </div>

            {/* Headline */}
            <div className={`fade-up ${heroVisible ? "show" : ""}`} style={{ transitionDelay: "100ms" }}>
              <h1 className="intro-hero__headline">
                Your personal
                <span className="intro-hero__headline-gradient">AI health coach</span>
                in your pocket
              </h1>
            </div>

            {/* Sub */}
            <div className={`fade-up ${heroVisible ? "show" : ""}`} style={{ transitionDelay: "200ms" }}>
              <p className="intro-hero__sub">
                Personalized diet plans, adaptive training programs, and injury-aware
                coaching — powered by AI and delivered through a friendly cartoon coach
                that speaks your language.
              </p>
            </div>

            {/* CTA buttons */}
            <div className={`fade-up ${heroVisible ? "show" : ""}`} style={{ transitionDelay: "300ms" }}>
              <div className="intro-hero__cta-row">
                <Button
                  variant="primary" size="lg"
                  rightIcon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  }
                >
                  Start Free Today
                </Button>
                <Button
                  variant="secondary" size="lg"
                  leftIcon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polygon points="10 8 16 12 10 16 10 8"/>
                    </svg>
                  }
                >
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Social proof */}
            <div className={`fade-up ${heroVisible ? "show" : ""}`} style={{ transitionDelay: "420ms" }}>
              <div className="intro-hero__social-proof">
                <div className="intro-hero__avatars">
                  {socialUsers.map((u, i) => (
                    <div
                      key={i}
                      className="intro-hero__avatar"
                      style={{ background: u.bg }}
                    >
                      {u.initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="intro-hero__stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="intro-hero__star">★</span>
                    ))}
                  </div>
                  <p className="intro-hero__review-text">
                    Loved by <strong>10+</strong> users
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — mascot */}
          <div className={`intro-hero__right fade-up ${heroVisible ? "show" : ""}`} style={{ transitionDelay: "180ms" }}>
            <div className="intro-hero__mascot-bg">
              <div className="intro-hero__mascot-wrap">
                <AIMascot animate={mascotAnimate} />
              </div>
            </div>

            {/* Floating cards */}
            {floatingCards.map((card, i) => (
              <div key={i} className="floating-card" style={card.position}>
                <span className="floating-card__emoji">{card.emoji}</span>
                <div>
                  <div className="floating-card__title">{card.title}</div>
                  <div className="floating-card__sub">{card.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILL TAGS STRIP ─────────────────────────────────────────── */}
      <section className="intro-section intro-pills">
        <div className="intro-pills__row">
          <span className="intro-pills__label">Topics:</span>
          {pillTags.map(p => (
            <Pill key={p.label} label={p.label} color={p.color} size="sm" dot />
          ))}
        </div>
      </section>

      {/* ── STATS GRID ──────────────────────────────────────────────── */}
      <section className="intro-section intro-stats">
        <div className="intro-stats__grid">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`stat-enter ${visibleStats.includes(i) ? "show" : ""}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <StatCard
                value={s.value}
                label={s.label}
                change={s.change}
                changeType={s.changeType}
                icon={s.icon}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES SECTION ────────────────────────────────────────── */}
      <section className="intro-section intro-features">
        <div className="intro-section-header">
          <div className="intro-section-header__label">
            <Label text="Everything you need" color="green" size="md" />
          </div>
          <h2 className="intro-section-header__title">One coach. Every goal.</h2>
          <p className="intro-section-header__sub">
            VitalCoach combines dietitian expertise, training science, and medical
            awareness in one conversational AI.
          </p>
        </div>

        <div className="intro-features__grid">
          {features.map((f, i) => (
            <div
              key={i}
              className={`feature-enter ${visibleFeatures.includes(i) ? "show" : ""}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <FeatureCard
                icon={f.icon}
                title={f.title}
                description={f.description}
                tag={f.tag}
                tagColor={f.tagColor}
                accent={f.accent}
                hoverable
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────── */}
      <section className="intro-section intro-how">
        <div className="intro-how__header">
          <div className="intro-how__header-label">
            <Label text="How it works" color="blue" size="md" />
          </div>
          <h2 className="intro-how__header-title">Up and running in 3 steps</h2>
        </div>

        <div className="intro-how__grid">
          {steps.map((item, i) => (
            <div key={i} className="intro-how__card">
              <div
                className="intro-how__step-icon"
                style={{ background: item.bg }}
              >
                <span
                  className="intro-how__step-number"
                  style={{ color: item.color }}
                >
                  {item.step}
                </span>
              </div>
              <h3 className="intro-how__card-title">{item.title}</h3>
              <p className="intro-how__card-desc">{item.desc}</p>
              {i < 2 && <div className="intro-how__connector" />}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────── */}
      <section className="intro-section intro-cta">
        <div className="intro-cta__card">
          {/* Glow decorations */}
          <div className="intro-cta__glow" style={{ top: "-60px",   right: "100px",  width: "280px", height: "280px" }} />
          <div className="intro-cta__glow" style={{ bottom: "-80px", right: "-40px", width: "300px", height: "300px" }} />

          {/* Left content */}
          <div className="intro-cta__content">
            <div className="intro-cta__status">
              <StatusDot status="active" size="md" label="AI Coach Online" pulse />
            </div>
            <h2 className="intro-cta__title">
              Ready to transform<br />your health journey?
            </h2>
            <p className="intro-cta__sub">No credit card required · Start in 60 seconds</p>
          </div>

          {/* Right actions */}
          <div className="intro-cta__actions">
            <Button variant="primary" size="lg">Create Free Account</Button>
            <button className="intro-cta__learn-btn">Learn More</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="intro-footer">
        <div className="intro-footer__logo">
          <div className="intro-footer__logo-icon">
            <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
              <path d="M9 3l1.5 4h4l-3.2 2.4 1.2 3.9L9 11l-3.5 2.3 1.2-3.9L3.5 7h4z" fill="white"/>
            </svg>
          </div>
          <span className="intro-footer__logo-text">
            Vital<span>Coach</span>
          </span>
        </div>

        <p className="intro-footer__copy">© 2025 VitalCoach AI. All rights reserved.</p>

        <div className="intro-footer__links">
          {["Privacy", "Terms", "Contact"].map(link => (
            <button key={link} className="nav-link" style={{ fontSize: "13px", color: "#9ca3af" }}>
              {link}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}