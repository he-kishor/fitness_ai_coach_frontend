export type ColorType =
  | "green"
  | "red"
  | "blue"
  | "yellow"
  | "gray"
  | "purple"
  | "orange"
  | "teal";


export type SizeType = "sm" | "md" | "lg";



type ColorConfig = {
  bg: string;
  color: string;
  border: string;
};
export const colorMap: Record<ColorType, ColorConfig> = {
  green: {
    bg: "#ecfdf5",
    color: "#16a34a",
    border: "#bbf7d0",
  },
  red: {
    bg: "#fef2f2",
    color: "#dc2626",
    border: "#fecaca",
  },
  blue: {
    bg: "#eff6ff",
    color: "#2563eb",
    border: "#bfdbfe",
  },
  yellow: {
    bg: "#fefce8",
    color: "#ca8a04",
    border: "#fef08a",
  },
  gray: {
    bg: "#f3f4f6",
    color: "#6b7280",
    border: "#e5e7eb",
  },
  purple: {
    bg: "#f5f3ff",
    color: "#7c3aed",
    border: "#ddd6fe",
  },
  orange: {
    bg: "#fff7ed",
    color: "#fd7e14",
    border: "#fed7aa",
  },
  teal: {
    bg: "#f0fdfa",
    color: "#14b8a6",
    border: "#99f6e4",
  }
};