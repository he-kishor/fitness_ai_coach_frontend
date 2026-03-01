interface SectionTitleProps {
  title: string;
  file: string;
}

export const SectionTitle = ({
  title,
  file,
}: SectionTitleProps) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "24px",
    }}
  >
    <div
      style={{
        height: "3px",
        width: "28px",
        borderRadius: "2px",
        background: "linear-gradient(135deg,#16a34a,#4ADE80)",
      }}
    />
    <h2
      style={{
        fontSize: "20px",
        fontWeight: 800,
        color: "#0f172a",
        letterSpacing: "-0.02em",
      }}
    >
      {title}
    </h2>
    <span
      style={{
        fontSize: "13px",
        color: "#9ca3af",
        fontWeight: 500,
      }}
    >
      {file}
    </span>
  </div>
);