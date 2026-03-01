import React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  label: string; // aria-label required for icon-only buttons
}

// ─── Style Maps ──────────────────────────────────────────────────────────────

const base: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  fontFamily: "'Outfit', 'DM Sans', sans-serif",
  fontWeight: 600,
  border: "none",
  borderRadius: "100px",
  cursor: "pointer",
  transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)",
  letterSpacing: "0.01em",
  outline: "none",
  position: "relative",
  overflow: "hidden",
  whiteSpace: "nowrap",
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #16a34a, #4ADE80)",
    color: "white",
    boxShadow: "0 2px 12px rgba(22,163,74,0.25)",
  },
  secondary: {
    background: "white",
    color: "#374151",
    border: "1.5px solid #e5e7eb",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  ghost: {
    background: "transparent",
    color: "#16a34a",
    border: "1.5px solid transparent",
  },
  danger: {
    background: "linear-gradient(135deg, #dc2626, #f87171)",
    color: "white",
    boxShadow: "0 2px 12px rgba(220,38,38,0.22)",
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: "8px 18px", fontSize: "13px", height: "34px" },
  md: { padding: "11px 24px", fontSize: "15px", height: "42px" },
  lg: { padding: "14px 32px", fontSize: "16px", height: "50px" },
};

const iconSizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { width: "34px", height: "34px", padding: "0", fontSize: "14px" },
  md: { width: "42px", height: "42px", padding: "0", fontSize: "16px" },
  lg: { width: "50px", height: "50px", padding: "0", fontSize: "18px" },
};

// ─── Spinner ─────────────────────────────────────────────────────────────────

const Spinner = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{ animation: "vc-spin 0.75s linear infinite" }}
  >
    <style>{`@keyframes vc-spin { to { transform: rotate(360deg); } }`}</style>
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round" opacity="0.4" />
    <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ─── Button ──────────────────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      style,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref
  ) => {
    const [hovered, setHovered] = React.useState(false);

    const hoverOverlay: Record<ButtonVariant, React.CSSProperties> = {
      primary:   { filter: "brightness(1.08)", transform: "translateY(-1px)", boxShadow: "0 6px 20px rgba(22,163,74,0.35)" },
      secondary: { borderColor: "#16a34a", color: "#16a34a", transform: "translateY(-1px)", boxShadow: "0 4px 14px rgba(0,0,0,0.09)" },
      ghost:     { background: "#f0fdf4", borderColor: "#bbf7d0" },
      danger:    { filter: "brightness(1.08)", transform: "translateY(-1px)", boxShadow: "0 6px 20px rgba(220,38,38,0.32)" },
    };

    const composed: React.CSSProperties = {
      ...base,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...(fullWidth ? { width: "100%" } : {}),
      ...(hovered && !disabled && !loading ? hoverOverlay[variant] : {}),
      ...(disabled || loading ? { opacity: 0.55, cursor: "not-allowed", transform: "none", filter: "none" } : {}),
      ...style,
    };

    return (
      <button
        ref={ref}
        style={composed}
        disabled={disabled || loading}
        onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
        onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
        {...rest}
      >
        {loading ? <Spinner /> : leftIcon}
        {children && <span>{children}</span>}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

// ─── IconButton ──────────────────────────────────────────────────────────────

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = "md", variant = "secondary", label, style, onMouseEnter, onMouseLeave, disabled, ...rest }, ref) => {
    const [hovered, setHovered] = React.useState(false);

    const hoverOverlay: Record<ButtonVariant, React.CSSProperties> = {
      primary:   { filter: "brightness(1.08)", boxShadow: "0 6px 20px rgba(22,163,74,0.35)" },
      secondary: { borderColor: "#16a34a", color: "#16a34a", boxShadow: "0 4px 14px rgba(0,0,0,0.09)" },
      ghost:     { background: "#f0fdf4" },
      danger:    { filter: "brightness(1.08)" },
    };

    const composed: React.CSSProperties = {
      ...base,
      ...variantStyles[variant],
      ...iconSizeStyles[size],
      borderRadius: "12px",
      ...(hovered && !disabled ? hoverOverlay[variant] : {}),
      ...(disabled ? { opacity: 0.55, cursor: "not-allowed" } : {}),
      ...style,
    };

    return (
      <button
        ref={ref}
        style={composed}
        aria-label={label}
        disabled={disabled}
        onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
        onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
        {...rest}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default Button;