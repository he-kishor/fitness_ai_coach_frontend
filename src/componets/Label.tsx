
import { colorMap } from "../constant/colorMap";
export type ColorType =
  | "green"
  | "red"
  | "blue"
  | "yellow"
  | "gray"
  | "purple"
  | "orange"
  | "teal";

type SizeType = "sm" | "md" | "lg";

interface LabelProps {
  text: string;
  color?: ColorType;
  size?: SizeType;
  uppercase?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  text,
  color = "gray",
  size = "md",
  uppercase = true,
}) => {
  const c = colorMap[color];

  const sizeMap: Record<
    SizeType,
    { padding: string; fontSize: string }
  > = {
    sm: { padding: "2px 10px", fontSize: "11px" },
    md: { padding: "4px 12px", fontSize: "12px" },
    lg: { padding: "6px 16px", fontSize: "13px" },
  };

  const s = sizeMap[size];

  return (
    <span
      style={{
        display: "inline-block",
        padding: s.padding,
        borderRadius: "6px",
        fontSize: s.fontSize,
        fontWeight: 700,
        fontFamily: "'Outfit',sans-serif",
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
        textTransform: uppercase ? "uppercase" : "none",
        letterSpacing: uppercase ? "0.07em" : "0.02em",
        lineHeight: 1,
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {text}
    </span>
  );
};