import React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type InputSize = "sm" | "md" | "lg";
type InputState = "default" | "error" | "success" | "disabled";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}


interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  inputSize?: InputSize;
  state?: InputState;
  fullWidth?: boolean;
}

interface PasswordInputProps extends Omit<InputProps, "type" | "rightElement"> {}

// ─── Style Maps ──────────────────────────────────────────────────────────────

const sizeMap: Record<InputSize, { padding: string; fontSize: string; height: string; iconSize: number }> = {
  sm: { padding: "0 14px",      fontSize: "13px", height: "36px", iconSize: 15 },
  md: { padding: "0 16px",      fontSize: "15px", height: "44px", iconSize: 17 },
  lg: { padding: "0 20px",      fontSize: "16px", height: "52px", iconSize: 19 },
};

const stateStyles: Record<InputState, { border: string; shadow?: string; bg?: string }> = {
  default:  { border: "1.5px solid #e5e7eb" },
  error:    { border: "1.5px solid #f87171", shadow: "0 0 0 3px rgba(248,113,113,0.12)" },
  success:  { border: "1.5px solid #4ADE80", shadow: "0 0 0 3px rgba(74,222,128,0.12)" },
  disabled: { border: "1.5px solid #f3f4f6", bg: "#fafafa" },
};

// ─── Eye icons ────────────────────────────────────────────────────────────────

const EyeOpen = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

// ─── CheckIcon & AlertIcon ────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" fill="#4ADE80" opacity="0.2" />
    <path d="M5 8l2 2 4-4" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" fill="#f87171" opacity="0.2" />
    <path d="M8 5v4" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.8" fill="#dc2626" />
  </svg>
);

// ─── Base Input ───────────────────────────────────────────────────────────────

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      success,
      leftIcon,
      rightElement,
      inputSize = "md",
      state,
      fullWidth = false,
      disabled,
      style,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = React.useState(false);

    // Derive effective state
    const effectiveState: InputState = disabled
      ? "disabled"
      : state ?? (error ? "error" : success ? "success" : "default");

    const sz = sizeMap[inputSize];
    const st = stateStyles[effectiveState];
    const leftPad = leftIcon ? `calc(${sz.padding.split(" ")[1]} + ${sz.iconSize + 10}px)` : sz.padding.split(" ")[1];
    const rightPad = rightElement ? `calc(${sz.padding.split(" ")[1]} + 36px)` : sz.padding.split(" ")[1];

    const focusBorder = effectiveState === "error"
      ? "1.5px solid #f87171"
      : effectiveState === "success"
      ? "1.5px solid #16a34a"
      : "1.5px solid #16a34a";

    const focusShadow = effectiveState === "error"
      ? "0 0 0 3px rgba(248,113,113,0.15)"
      : "0 0 0 3px rgba(22,163,74,0.12)";

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: fullWidth ? "100%" : "auto", fontFamily: "'Outfit','DM Sans',sans-serif" }}>
        {/* Label */}
        {label && (
          <label
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#374151",
              letterSpacing: "0.01em",
            }}
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          {/* Left icon */}
          {leftIcon && (
            <span
              style={{
                position: "absolute",
                left: sz.padding.split(" ")[1],
                color: focused ? "#16a34a" : "#9ca3af",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
                transition: "color 0.2s",
                zIndex: 1,
              }}
            >
              {leftIcon}
            </span>
          )}

          {/* Input element */}
          <input
            ref={ref}
            disabled={disabled}
            style={{
              width: fullWidth ? "100%" : "auto",
              height: sz.height,
              paddingLeft: leftPad,
              paddingRight: rightPad,
              fontSize: sz.fontSize,
              fontFamily: "'Outfit','DM Sans',sans-serif",
              fontWeight: 400,
              color: "#111827",
              background: st.bg ?? "white",
              border: focused ? focusBorder : st.border,
              borderRadius: "12px",
              outline: "none",
              boxShadow: focused ? focusShadow : st.shadow ?? "none",
              transition: "all 0.2s ease",
              caretColor: "#16a34a",
              ...style,
            }}
            onFocus={(e) => { setFocused(true); onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); onBlur?.(e); }}
            {...rest}
          />

          {/* Right element */}
          {rightElement && (
            <span
              style={{
                position: "absolute",
                right: "12px",
                display: "flex",
                alignItems: "center",
                color: "#9ca3af",
              }}
            >
              {rightElement}
            </span>
          )}

          {/* Auto state icon */}
          {!rightElement && effectiveState === "success" && (
            <span style={{ position: "absolute", right: "12px" }}><CheckIcon /></span>
          )}
          {!rightElement && effectiveState === "error" && (
            <span style={{ position: "absolute", right: "12px" }}><AlertIcon /></span>
          )}
        </div>

        {/* Hint / Error / Success message */}
        {(hint || error || success) && (
          <p
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: error ? "#dc2626" : success ? "#16a34a" : "#9ca3af",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {error || success || hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ─── Password Input ───────────────────────────────────────────────────────────

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ ...props }, ref) => {
    const [show, setShow] = React.useState(false);

    return (
      <Input
        ref={ref}
        type={show ? "text" : "password"}
        rightElement={
          <button
            type="button"
            onClick={() => setShow((p) => !p)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9ca3af",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              transition: "color 0.2s",
              borderRadius: "6px",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#16a34a")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#9ca3af")}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff /> : <EyeOpen />}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

// ─── Email Input (pre-configured) ────────────────────────────────────────────


export const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
}: TextInputProps) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
    <label
      style={{
        fontSize: "11px",
        fontWeight: 700,
        color: "#6b7280",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
      }}
    >
      {label}
    </label>

    <input
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      placeholder={placeholder}
      style={{
        padding: "8px 12px",
        borderRadius: "10px",
        border: "1.5px solid #e5e7eb",
        fontSize: "13px",
        fontFamily: "'Outfit',sans-serif",
        color: "#374151",
        outline: "none",
      }}
    />
  </div>
);

export const EmailInput = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  ({ leftIcon, ...props }, ref) => (
    <Input
      ref={ref}
      type="email"
      leftIcon={
        leftIcon ?? (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        )
      }
      {...props}
    />
  )
);



EmailInput.displayName = "EmailInput";

export default Input;