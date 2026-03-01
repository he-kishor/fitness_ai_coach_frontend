
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

type StatusType =
  | "online"
  | "offline"
  | "busy"
  | "idle"
  | "active";

interface StatusDotProps {
  status: StatusType;
  label?: string;
  size?: SizeType;
  pulse?: boolean;
}

export const StatusDot: React.FC<StatusDotProps> = ({
  status,
  label,
  size = "md",
  pulse = true,
}) => {
  const statusMap: Record<
    StatusType,
    { color: string; label: string }
  > = {
    online: { color: "#4ADE80", label: "Online" },
    offline: { color: "#9ca3af", label: "Offline" },
    busy: { color: "#f87171", label: "Busy" },
    idle: { color: "#fbbf24", label: "Idle" },
    active: { color: "#60a5fa", label: "Active" },
  };

  const s = statusMap[status];

  const dotSizeMap: Record<SizeType, number> = {
    sm: 7,
    md: 9,
    lg: 11,
  };

  const ds = dotSizeMap[size];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "'Outfit',sans-serif",
      }}
    >
      <style>
        {`@keyframes sdpulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}`}
      </style>

      <span
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {pulse && status !== "offline" && (
          <span
            style={{
              position: "absolute",
              width: ds + 6,
              height: ds + 6,
              borderRadius: "50%",
              background: s.color,
              opacity: 0.2,
              animation: "sdpulse 2s ease-in-out infinite",
            }}
          />
        )}

        <span
          style={{
            width: ds,
            height: ds,
            borderRadius: "50%",
            background: s.color,
            display: "block",
          }}
        />
      </span>

      <span
        style={{
          fontSize:
            size === "sm"
              ? "12px"
              : size === "lg"
              ? "14px"
              : "13px",
          fontWeight: 500,
          color: "#6b7280",
        }}
      >
        {label ?? s.label}
      </span>
    </span>
  );
};