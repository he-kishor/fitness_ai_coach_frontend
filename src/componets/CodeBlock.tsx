type CodeBlockProps = {
  code: {
    imports: string;
    usage: string;
    activeBadge?: "pill" | "dot" | "label";
  };
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => (
  <pre style={{ background: "#0f172a", color: "#4ADE80", padding: "16px 20px", borderRadius: "12px", fontSize: "12px", lineHeight: 1.7, overflow: "auto", fontFamily: "'JetBrains Mono','Fira Code',monospace", margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
    <span style={{ color: "#94a3b8" }}>// import in your file:{"\n"}</span>
    <span style={{ color: "#60a5fa" }}>import</span>{" { "}
    <span style={{ color: "#fbbf24" }}>{code.imports}</span>
    {" } "}
    <span style={{ color: "#60a5fa" }}>from</span>{" "}
    <span style={{ color: "#f87171" }}>'@/components/ui'</span>
    {"\n\n"}
    <span style={{ color: "#94a3b8" }}>// usage:{"\n"}</span>
    <span style={{ color: "#e2e8f0" }}>{code.usage}</span>
  </pre>
);

export default CodeBlock;