import { colorMap } from "../constant/colorMap";
type ColorType =
  | "green"
  | "red"
  | "blue"
  | "yellow"
  | "gray"
  | "purple"
  | "orange"
  | "teal";


 type SizeType = "sm" | "md" | "lg";


interface PillProps {
  label: string;
  color?: ColorType;
  size?: SizeType;
  dot?: boolean;
  onRemove?: () => void;
}

export const Pill: React.FC<PillProps> = ({
  label,
  color = "green",
  size = "md",
  dot = false,
  onRemove,
}) => {
  const c = colorMap[color];

  const sizeMap: Record<
    SizeType,
    { padding: string; fontSize: string; dotSize: string }
  > = {
    sm: { padding: "2px 10px", fontSize: "11px", dotSize: "6px" },
    md: { padding: "4px 12px", fontSize: "12px", dotSize: "7px" },
    lg: { padding: "6px 16px", fontSize: "13px", dotSize: "8px" },
  };

  const s = sizeMap[size];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: s.padding,
        borderRadius: "100px",
        fontSize: s.fontSize,
        fontWeight: 600,
        fontFamily: "'Outfit',sans-serif",
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {dot && (
        <span
          style={{
            width: s.dotSize,
            height: s.dotSize,
            borderRadius: "50%",
            background: c.color,
            flexShrink: 0,
          }}
        />
      )}

      {label}

      {onRemove && (
        <button
          type="button"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: c.color,
            opacity: 0.65,
            padding: 0,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.opacity = "1")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.opacity = "0.65")
          }
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M9 3L3 9M3 3l6 6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
};