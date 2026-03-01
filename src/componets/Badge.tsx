import React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type BadgeColor = "green" | "blue" | "purple" | "orange" | "teal" | "yellow" | "red" | "gray";
type BadgeSize  = "sm" | "md" | "lg";

interface PillProps {
  label: string;
  color?: BadgeColor;
  size?: BadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
  onRemove?: () => void;
  style?: React.CSSProperties;
}

interface StatusDotProps {
  status: "online" | "offline" | "busy" | "idle" | "active";
  label?: string;
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
  pulse?: boolean;
}

interface LabelProps {
  text: string;
  color?: BadgeColor;
  size?: BadgeSize;
  uppercase?: boolean;
  bold?: boolean;
  style?: React.CSSProperties;
}

// ─── Color Map ────────────────────────────────────────────────────────────────

const colorMap: Record<BadgeColor, { bg: string; color: string; border: string }> = {
  green:  { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  blue:   { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  purple: { bg: "#fdf4ff", color: "#9333ea", border: "#e9d5ff" },
  orange: { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
  teal:   { bg: "#f0fdfa", color: "#0d9488", border: "#99f6e4" },
  yellow: { bg: "#fefce8", color: "#ca8a04", border: "#fef08a" },
  red:    { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
  gray:   { bg: "#f9fafb", color: "#6b7280", border: "#e5e7eb" },
};

const statusMap: Record<StatusDotProps["status"], { color: string; label: string }> = {
  online:  { color: "#4ADE80", label: "Online" },
  offline: { color: "#9ca3af", label: "Offline" },
  busy:    { color: "#f87171", label: "Busy" },
  idle:    { color: "#fbbf24", label: "Idle" },
  active:  { color: "#60a5fa", label: "Active" },
};

const sizeMap: Record<BadgeSize, { padding: string; fontSize: string; gap: string; iconSize: string }> = {
  sm: { padding: "2px 10px",  fontSize: "11px", gap: "4px",  iconSize: "10px" },
  md: { padding: "4px 12px",  fontSize: "12px", gap: "5px",  iconSize: "12px" },
  lg: { padding: "6px 16px",  fontSize: "13px", gap: "6px",  iconSize: "13px" },
};

const dotSizeMap = {
  sm: 7,
  md: 9,
  lg: 11,
};

// ─── Pill ─────────────────────────────────────────────────────────────────────

export const Pill: React.FC<PillProps> = ({
  label, color = "green", size = "md", dot = false, icon, onRemove, style,
}) => {
  const c = colorMap[color];
  const s = sizeMap[size];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: s.gap,
        padding: s.padding,
        borderRadius: "100px",
        fontSize: s.fontSize,
        fontWeight: 600,
        fontFamily: "'Outfit','DM Sans',sans-serif",
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
        letterSpacing: "0.02em",
        lineHeight: 1,
        whiteSpace: "nowrap",
        userSelect: "none",
        ...style,
      }}
    >
      {/* Dot indicator */}
      {dot && !icon && (
        <span
          style={{
            width: dotSizeMap[size] - 2 + "px",
            height: dotSizeMap[size] - 2 + "px",
            borderRadius: "50%",
            background: c.color,
            flexShrink: 0,
          }}
        />
      )}

      {/* Custom icon */}
      {icon && (
        <span style={{ display: "flex", alignItems: "center", fontSize: s.iconSize }}>
          {icon}
        </span>
      )}

      {label}

      {/* Remove button */}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          aria-label={`Remove ${label}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: c.color,
            opacity: 0.7,
            padding: 0,
            marginLeft: "2px",
            lineHeight: 1,
            fontSize: s.iconSize,
            fontFamily: "inherit",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.7")}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
};

// ─── StatusDot ────────────────────────────────────────────────────────────────

export const StatusDot: React.FC<StatusDotProps> = ({
  status, label, size = "md", style, pulse = true,
}) => {
  const s = statusMap[status];
  const dotSize = dotSizeMap[size];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        fontFamily: "'Outfit','DM Sans',sans-serif",
        ...style,
      }}
    >
      <style>{`
        @keyframes vc-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.8); }
        }
      `}</style>
      <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Outer pulse ring */}
        {pulse && status !== "offline" && (
          <span
            style={{
              position: "absolute",
              width: dotSize + 6 + "px",
              height: dotSize + 6 + "px",
              borderRadius: "50%",
              background: s.color,
              opacity: 0.2,
              animation: "vc-pulse-dot 2s ease-in-out infinite",
            }}
          />
        )}
        {/* Core dot */}
        <span
          style={{
            width: dotSize + "px",
            height: dotSize + "px",
            borderRadius: "50%",
            background: s.color,
            display: "block",
            flexShrink: 0,
          }}
        />
      </span>

      {/* Label */}
      {(label !== undefined ? label : s.label) && (
        <span
          style={{
            fontSize: size === "sm" ? "12px" : size === "lg" ? "14px" : "13px",
            fontWeight: 500,
            color: "#6b7280",
          }}
        >
          {label ?? s.label}
        </span>
      )}
    </span>
  );
};

// ─── Label ────────────────────────────────────────────────────────────────────

export const Label: React.FC<LabelProps> = ({
  text, color = "gray", size = "md", uppercase = true, bold = true, style,
}) => {
  const c = colorMap[color];
  const s = sizeMap[size];

  return (
    <span
      style={{
        display: "inline-block",
        padding: s.padding,
        borderRadius: "6px",
        fontSize: s.fontSize,
        fontWeight: bold ? 700 : 500,
        fontFamily: "'Outfit','DM Sans',sans-serif",
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
        textTransform: uppercase ? "uppercase" : "none",
        letterSpacing: uppercase ? "0.07em" : "0.02em",
        lineHeight: 1,
        whiteSpace: "nowrap",
        userSelect: "none",
        ...style,
      }}
    >
      {text}
    </span>
  );
};

export default Pill;