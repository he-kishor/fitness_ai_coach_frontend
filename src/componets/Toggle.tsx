interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle = ({
  label,
  checked,
  onChange,
}: ToggleProps) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
    }}
  >
    <span
      style={{
        fontSize: "13px",
        fontWeight: 500,
        color: "#374151",
      }}
    >
      {label}
    </span>

    <div
      onClick={() => onChange(!checked)}
      style={{
        width: "40px",
        height: "22px",
        borderRadius: "11px",
        background: checked ? "#16a34a" : "#e5e7eb",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "3px",
          left: checked ? "21px" : "3px",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "white",
          transition: "left 0.2s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        }}
      />
    </div>
  </div>
);