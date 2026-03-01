import React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BaseCardProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

interface FeatureCardProps extends BaseCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
  tagColor?: "green" | "blue" | "purple" | "orange" | "teal" | "yellow"| "red";
  accent?: boolean;
}

interface StatCardProps extends BaseCardProps {
  value: string | number;
  label: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  compact?: boolean;
}

interface ProfileCardProps extends BaseCardProps {
  name: string;
  role?: string;
  avatar?: string;
  avatarFallback?: string;
  stats?: { label: string; value: string }[];
  badge?: string;
  actions?: React.ReactNode;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const tagColors: Record<string, { bg: string; color: string; border: string }> = {
  green:  { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  blue:   { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  purple: { bg: "#fdf4ff", color: "#9333ea", border: "#e9d5ff" },
  orange: { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
  teal:   { bg: "#f0fdfa", color: "#0d9488", border: "#99f6e4" },
  yellow: { bg: "#fefce8", color: "#ca8a04", border: "#fef08a" },
};

const cardBase: React.CSSProperties = {
  background: "white",
  borderRadius: "20px",
  border: "1px solid #f3f4f6",
  fontFamily: "'Outfit', 'DM Sans', sans-serif",
  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
  position: "relative",
  overflow: "hidden",
};

const hoverStyle: React.CSSProperties = {
  transform: "translateY(-4px)",
  boxShadow: "0 16px 48px rgba(0,0,0,0.08)",
  borderColor: "#d1fae5",
};

// ─── Base Card ────────────────────────────────────────────────────────────────

export const Card: React.FC<BaseCardProps & { padding?: string }> = ({
  children, style, onClick, hoverable = false, padding = "28px",
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{
        ...cardBase,
        padding,
        cursor: onClick || hoverable ? "pointer" : "default",
        ...(hovered && (onClick || hoverable) ? hoverStyle : {}),
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
};

// ─── Feature Card ─────────────────────────────────────────────────────────────

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon, title, description, tag, tagColor = "green", accent = false, style, onClick, hoverable = true,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const tc = tagColors[tagColor];

  return (
    <div
      style={{
        ...cardBase,
        padding: "28px",
        cursor: onClick || hoverable ? "pointer" : "default",
        ...(hovered ? hoverStyle : {}),
        ...(accent
          ? {
              background: "linear-gradient(135deg, #0f172a 0%, #1e3a2f 100%)",
              border: "1px solid #1e3a2f",
              color: "white",
            }
          : {}),
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Decorative circle for accent */}
      {accent && (
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(74,222,128,0.15), transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Icon */}
      {icon && (
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: accent ? "rgba(255,255,255,0.08)" : "#f9fafb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "18px",
            border: accent ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f3f4f6",
          }}
        >
          {icon}
        </div>
      )}

      {/* Tag */}
      {tag && (
        <div
          style={{
            display: "inline-block",
            padding: "3px 12px",
            borderRadius: "100px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "12px",
            background: accent ? "rgba(74,222,128,0.15)" : tc.bg,
            color: accent ? "#4ADE80" : tc.color,
            border: `1px solid ${accent ? "rgba(74,222,128,0.3)" : tc.border}`,
          }}
        >
          {tag}
        </div>
      )}

      {/* Title */}
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 700,
          color: accent ? "white" : "#0f172a",
          marginBottom: "10px",
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "14px",
          color: accent ? "rgba(255,255,255,0.6)" : "#6b7280",
          lineHeight: 1.65,
          margin: 0,
          fontWeight: 400,
        }}
      >
        {description}
      </p>
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

const ArrowUp = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M6.5 10V3M3 6.5l3.5-3.5 3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowDown = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M6.5 3v7M10 6.5L6.5 10 3 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StatCard: React.FC<StatCardProps> = ({
  value, label, change, changeType = "neutral", icon, compact = false, style, onClick, hoverable = false,
}) => {
  const [hovered, setHovered] = React.useState(false);

  const changeColors = {
    up:      { color: "#16a34a", bg: "#f0fdf4" },
    down:    { color: "#dc2626", bg: "#fef2f2" },
    neutral: { color: "#6b7280", bg: "#f9fafb" },
  };
  const cc = changeColors[changeType];

  return (
    <div
      style={{
        ...cardBase,
        padding: compact ? "20px 24px" : "28px",
        cursor: onClick || hoverable ? "pointer" : "default",
        ...(hovered && (onClick || hoverable) ? hoverStyle : {}),
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: compact ? "8px" : "16px" }}>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#9ca3af",
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </p>
        {icon && (
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "#f0fdf4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#16a34a",
            }}
          >
            {icon}
          </div>
        )}
      </div>

      <p
        style={{
          fontSize: compact ? "28px" : "36px",
          fontWeight: 800,
          color: "#0f172a",
          margin: 0,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          marginBottom: change ? "12px" : "0",
        }}
      >
        {value}
      </p>

      {change && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "3px 10px",
            borderRadius: "100px",
            background: cc.bg,
            color: cc.color,
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {changeType === "up" && <ArrowUp />}
          {changeType === "down" && <ArrowDown />}
          {change}
        </div>
      )}
    </div>
  );
};

// ─── Profile Card ─────────────────────────────────────────────────────────────

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name, role, avatar, avatarFallback, stats, badge, actions, style, onClick, hoverable = false,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const initials = avatarFallback ?? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div
      style={{
        ...cardBase,
        padding: "28px",
        cursor: onClick || hoverable ? "pointer" : "default",
        ...(hovered && (onClick || hoverable) ? hoverStyle : {}),
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: stats?.length ? "24px" : "0" }}>
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              style={{ width: "56px", height: "56px", borderRadius: "16px", objectFit: "cover", border: "2px solid #f3f4f6" }}
            />
          ) : (
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #4ADE80, #16a34a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              {initials}
            </div>
          )}
          {/* Online dot */}
          <div
            style={{
              position: "absolute",
              bottom: "2px",
              right: "2px",
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              background: "#4ADE80",
              border: "2px solid white",
            }}
          />
        </div>

        {/* Name + role */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </h3>
            {badge && (
              <span
                style={{
                  display: "inline-block",
                  padding: "2px 10px",
                  borderRadius: "100px",
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  background: "#f0fdf4",
                  color: "#16a34a",
                  border: "1px solid #bbf7d0",
                  flexShrink: 0,
                }}
              >
                {badge}
              </span>
            )}
          </div>
          {role && (
            <p style={{ fontSize: "13px", color: "#9ca3af", margin: "3px 0 0", fontWeight: 500 }}>
              {role}
            </p>
          )}
        </div>
      </div>

      {/* Stats row */}
      {stats && stats.length > 0 && (
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #f3f4f6",
            paddingTop: "20px",
            gap: "0",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                textAlign: "center",
                borderRight: i < stats.length - 1 ? "1px solid #f3f4f6" : "none",
                padding: "0 8px",
              }}
            >
              <div style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em" }}>
                {s.value}
              </div>
              <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 500, marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      {actions && (
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          {actions}
        </div>
      )}
    </div>
  );
};

export default Card;