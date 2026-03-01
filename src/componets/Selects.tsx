interface SelectProps<T extends string> {
  label: string;
  value: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;
  options: T[];
}

export function Selects<T extends string>({
  label,
  value,
  onChange,
  options,
}: SelectProps<T>) {
  return (
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

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        style={{
          padding: "8px 12px",
          borderRadius: "10px",
          border: "1.5px solid #e5e7eb",
          fontSize: "13px",
          cursor: "pointer",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}