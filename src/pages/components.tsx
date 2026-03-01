

import { useState } from "react";
import {Button } from "../componets/Button";
import { FeatureCard, StatCard, ProfileCard } from "../componets/Card";
import {TextInput, PasswordInput, Input} from "../componets/Input";
import {Selects} from "../componets/Selects";
import {Toggle} from "../componets/Toggle";
import {Label} from "../componets/Label";
import {Pill} from "../componets/Pill";
import {StatusDot} from "../componets/statusDot";
import {colorMap} from "../constant/colorMap";
import {
    HeartIcon, 
    FireIcon, 
    BrainIcon, 
    ZapIcon,
     SendIcon, 
     PlusIcon,
        SearchIcon,
        UserIcon,
        MailIcon,
        PhoneIcon
} from "../componets/icons";
import CodeBlock from "../componets/CodeBlock";
import {SectionTitle} from "../componets/SectionTitle";


type ButtonSize = "sm" | "md" | "lg";
type InputSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type TGColor = "green" | "blue" | "purple" | "orange" | "teal" | "yellow" | "red";
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
type StatusType =
  | "online"
  | "offline"
  | "busy"
  | "idle"
  | "active";

type CodeConfig = {
  imports: string;
  usage: string;
};




export default function Playground() {
  // Button state
  const [btnVariant,  setBtnVariant]  = useState<ButtonVariant>("primary");
  const [btnSize, setBtnSize] = useState<ButtonSize>("md");
  const [btnLabel,    setBtnLabel]    = useState("Start Workout");
  const [btnLoading,  setBtnLoading]  = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnFullW,    setBtnFullW]    = useState(false);
  const [btnLeftIcon, setBtnLeftIcon] = useState(false);
  const [btnRightIcon,setBtnRightIcon]= useState(false);
  const [loadingDemo, setLoadingDemo] = useState(false);

  // Card state
  const [activeCard,  setActiveCard]  = useState("feature");
  // FeatureCard
  const [fcTitle, setFcTitle]     = useState("Smart Diet Planner");
  const [fcDesc, setFcDesc]      = useState("AI crafts your perfect meal plan based on your goals, local food, and health data.");
  const [fcTag, setFcTag]       = useState("Nutrition");
  const [fcTagColor, setFcTagColor]  = useState<TGColor>("green");
  const [fcAccent,    setFcAccent]    = useState(false);
  const [fcHoverable, setFcHoverable] = useState(true);
  // StatCard
  const [scValue,     setScValue]     = useState("2,450");
  const [scLabel,     setScLabel]     = useState("Calories Burned");
  const [scChange,    setScChange]    = useState("+12% this week");
  const [scType,      setScType]      = useState<"up" | "down" | "neutral">("up");

  // ProfileCard
  const [pcName,      setPcName]      = useState("Sarah Chen");
  const [pcRole,      setPcRole]      = useState("Goal: Lose 5kg by March");
  const [pcBadge,     setPcBadge]     = useState("Pro");
  const [activeInput, setActiveInput]   = useState("text");
  const [inLabel,     setInLabel]       = useState("Full Name");
  const [inPlaceholder,setInPlaceholder]= useState("e.g. Alex Johnson");
  const [inSize,      setInSize]        = useState<InputSize>("md");
  const [inHint,      setInHint]        = useState("");
  const [inError,     setInError]       = useState("");
  const [inSuccess,   setInSuccess]     = useState("");
  const [inLeftIcon,  setInLeftIcon]    = useState(false);
  const [inDisabled,  setInDisabled]    = useState(false);
  const [inFullWidth, setInFullWidth]   = useState(true);
  const [inValue,     setInValue]       = useState("");

  // ── Badge / Pill state ──
  type BadgeType = "pill" | "dot" | "label";

const [activeBadge, setActiveBadge] =
  useState<BadgeType>("pill");
  // Pill
  const [pillLabel,    setPillLabel]    = useState("Nutrition");
  const [pillColor,    setPillColor]    = useState<ColorType>("green");
  const [pillSize,     setPillSize]     = useState<SizeType>("md");
  const [pillDot,      setPillDot]      = useState(true);
  const [pillRemovable,setPillRemovable]= useState(true);
  const [pillRemoved,  setPillRemoved]  = useState(false);
  // StatusDot
  const [dotStatus,    setDotStatus]    = useState<StatusType>("online");
  const [dotSize,      setDotSize]      = useState<SizeType>("md");
  const [dotPulse,     setDotPulse]     = useState(true);
  const [dotLabel,     setDotLabel]     = useState("");
  // Label
  const [lblText,      setLblText]      = useState("Nutrition");
  const [lblColor,     setLblColor]     = useState<ColorType>("green");
  const [lblSize,      setLblSize]      = useState<SizeType>("md");
  const [lblUpper,     setLblUpper]     = useState(true);

  const iconOptions = { search: <SearchIcon/>, user: <UserIcon/>, mail: <MailIcon/>, phone: <PhoneIcon/>, none: null };
  type ISelectedIcon = keyof typeof iconOptions;
  const [selectedIcon, setSelectedIcon] = useState<ISelectedIcon>("user");
  
  const badgeCode = activeBadge === "pill" ? Pill : activeBadge === "dot" ? StatusDot: Label;

  const colors:ColorType[] = ["green","blue","purple","orange","teal","yellow","red"];

  // ── Generated code ──
  const inputTypeMap = { text: "Input", password: "PasswordInput", email: "Input" };
  const inputImport  = activeInput === "password" ? "PasswordInput" : "Input";
  
  

  const iconMap = { heart: <HeartIcon/>, fire: <FireIcon/>, brain: <BrainIcon/>, zap: <ZapIcon/>, none: null };
  const inputCode = {
    imports: inputImport,
    usage: `<${inputImport}\n  label="${inLabel}"\n  placeholder="${inPlaceholder}"\n  inputSize="${inSize}"${inLeftIcon && activeInput !== "password" ? `\n  leftIcon={<${selectedIcon.charAt(0).toUpperCase()+selectedIcon.slice(1)}Icon/>}` : ""}${inHint ? `\n  hint="${inHint}"` : ""}${inError ? `\n  error="${inError}"` : ""}${inSuccess ? `\n  success="${inSuccess}"` : ""}${inDisabled ? "\n  disabled" : ""}${inFullWidth ? "\n  fullWidth" : ""}\n/>`
  };
  type IconType = keyof typeof iconMap;
 
  const [fcIcon, setFcIcon] = useState<IconType>("heart");
    const [scIcon,setScIcon] = useState<IconType>("fire");

  const handleLoadingDemo = () => {
    setLoadingDemo(true);
    setTimeout(() => setLoadingDemo(false), 2000);
  };
  
  interface CodeSnippet {
  imports: string;
  usage: string;
}
 
 {activeBadge === "pill" && (
  <Pill
    label={pillLabel}
    color={pillColor}
    size={pillSize}
    dot={pillDot}
    onRemove={pillRemovable ? () => setPillRemoved(true) : undefined}
  />
)}

{activeBadge === "dot" && (
  <StatusDot
    status={dotStatus}
    size={dotSize}
    pulse={dotPulse}
    label={dotLabel || undefined}
  />
)}

{activeBadge === "label" && (
  <Label
    text={lblText}
    color={lblColor}
    size={lblSize}
    uppercase={lblUpper}
  />
)}
  // ── Generated code strings ──
  const btnCode = {
    imports: "Button",
    usage: `<Button\n  variant="${btnVariant}"\n  size="${btnSize}"${btnDisabled ? "\n  disabled" : ""}${btnLoading ? "\n  loading" : ""}${btnFullW ? "\n  fullWidth" : ""}${btnLeftIcon ? "\n  leftIcon={<HeartIcon/>}" : ""}${btnRightIcon ? "\n  rightIcon={<SendIcon/>}" : ""}\n>\n  ${btnLabel}\n</Button>`
  };

  const fcCode = {
    imports: "FeatureCard",
    usage: `<FeatureCard\n  title="${fcTitle}"\n  description="${fcDesc.slice(0,40)}..."\n  tag="${fcTag}"\n  tagColor="${fcTagColor}"\n  icon={<${fcIcon === "none" ? "null" : fcIcon.charAt(0).toUpperCase() + fcIcon.slice(1) + "Icon"}/>}${fcAccent ? "\n  accent" : ""}${!fcHoverable ? "\n  hoverable={false}" : ""}\n/>`
  };
  const scCode = {
    imports: "StatCard",
    usage: `<StatCard\n  value="${scValue}"\n  label="${scLabel}"\n  change="${scChange}"\n  changeType="${scType}"\n  icon={<${scIcon.charAt(0).toUpperCase() + scIcon.slice(1)}Icon/>}\n/>`
  };
  const pcCode = {
    imports: "ProfileCard",
    usage: `<ProfileCard\n  name="${pcName}"\n  role="${pcRole}"\n  badge="${pcBadge}"\n  stats={[\n    {label:"Workouts", value:"32"},\n    {label:"Streak",   value:"14d"},\n  ]}\n  actions={<Button size="sm">View Plan</Button>}\n/>`
  };

  const cardCode = activeCard === "feature" ? fcCode : activeCard === "stat" ? scCode : pcCode;
  const pillCode: CodeConfig = {
  imports: "Pill",
  usage: `<Pill
  label="${pillLabel}"
  color="${pillColor}"
  size="${pillSize}"${pillDot ? "\n  dot" : ""}${
    pillRemovable ? "\n  onRemove={() => handleRemove()}" : ""
  }
/>`,
};

const dotCode: CodeConfig = {
  imports: "StatusDot",
  usage: `<StatusDot
  status="${dotStatus}"
  size="${dotSize}"${
    dotLabel ? `\n  label="${dotLabel}"` : ""
  }${!dotPulse ? "\n  pulse={false}" : ""}
/>`,
};

const labelCode: CodeConfig = {
  imports: "Label",
  usage: `<Label
  text="${lblText}"
  color="${lblColor}"
  size="${lblSize}"${
    !lblUpper ? "\n  uppercase={false}" : ""
  }
/>`,
};

  const badgeCodeMap: Record<BadgeType, CodeConfig> = {
  pill: pillCode,
  dot: dotCode,
  label: labelCode,
  }
  const badgeOptions: [BadgeType, string][] = [
  ["pill", "Pill"],
  ["dot", "StatusDot"],
  ["label", "Label"],
];

  return (
    <div style={{ fontFamily: "'Outfit','DM Sans',sans-serif", background: "#f9fafb", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      `}</style>

      {/* Top bar */}
      <div style={{ background: "white", borderBottom: "1px solid #f3f4f6", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg,#4ADE80,#16a34a)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M9 3l1.5 4h4l-3.2 2.4 1.2 3.9L9 11l-3.5 2.3 1.2-3.9L3.5 7h4z" fill="white"/></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: "16px", letterSpacing: "-0.02em" }}>Vital<span style={{ color: "#16a34a" }}>Coach</span></span>
          <span style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", padding: "2px 10px", borderRadius: "100px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Component Playground</span>
        </div>
        <p style={{ fontSize: "12px", color: "#9ca3af" }}>Modify props → see live preview → copy the code</p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px 64px" }}>

        {/* ══════════════════════════════════════
            BUTTON PLAYGROUND
        ══════════════════════════════════════ */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ height: "3px", width: "28px", borderRadius: "2px", background: "linear-gradient(135deg,#16a34a,#4ADE80)" }} />
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>Button</h2>
            <span style={{ fontSize: "13px", color: "#9ca3af", fontWeight: 500 }}>Button.tsx</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "20px" }}>
            {/* Preview + Code */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Live preview */}
              <div style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: "20px", padding: "48px 32px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "160px" }}>
                <Button
                  variant={btnVariant} size={btnSize}
                  loading={loadingDemo || btnLoading}
                  disabled={btnDisabled} fullWidth={btnFullW}
                  leftIcon={btnLeftIcon ? <HeartIcon/> : undefined}
                  rightIcon={btnRightIcon ? <SendIcon/> : undefined}
                  onClick={handleLoadingDemo}
                >
                  {btnLabel}
                </Button>
              </div>
              {/* Code */}
              <CodeBlock code={btnCode} />
            </div>

            {/* Controls */}
            <div style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Props</p>
              <TextInput label="Label (children)" value={btnLabel} onChange={setBtnLabel} placeholder="Button text" />
              <Selects label="variant" value={btnVariant} onChange={setBtnVariant} options={["primary","secondary","ghost","danger"]} />
              <Selects label="size" value={btnSize} onChange={setBtnSize} options={["sm","md","lg"]} />
              <div style={{ height: "1px", background: "#f3f4f6" }} />
              <Toggle label="loading" checked={btnLoading} onChange={setBtnLoading} />
              <Toggle label="disabled" checked={btnDisabled} onChange={setBtnDisabled} />
              <Toggle label="fullWidth" checked={btnFullW} onChange={setBtnFullW} />
              <Toggle label="leftIcon (HeartIcon)" checked={btnLeftIcon} onChange={setBtnLeftIcon} />
              <Toggle label="rightIcon (SendIcon)" checked={btnRightIcon} onChange={setBtnRightIcon} />
              <div style={{ height: "1px", background: "#f3f4f6" }} />
              <p style={{ fontSize: "11px", color: "#9ca3af", lineHeight: 1.6 }}>💡 Click the button to see the loading demo in action</p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            CARD PLAYGROUND
        ══════════════════════════════════════ */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ height: "3px", width: "28px", borderRadius: "2px", background: "linear-gradient(135deg,#16a34a,#4ADE80)" }} />
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>Cards</h2>
            <span style={{ fontSize: "13px", color: "#9ca3af", fontWeight: 500 }}>Card.tsx</span>
          </div>

          {/* Card type tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            {["feature","stat","profile"].map(t => (
              <button
                key={t} onClick={() => setActiveCard(t)}
                style={{ padding: "8px 20px", borderRadius: "100px", border: "1.5px solid", borderColor: activeCard === t ? "#16a34a" : "#e5e7eb", background: activeCard === t ? "#f0fdf4" : "white", color: activeCard === t ? "#16a34a" : "#6b7280", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.15s", fontFamily: "'Outfit',sans-serif", textTransform: "capitalize" }}
              >
                {t === "feature" ? "FeatureCard" : t === "stat" ? "StatCard" : "ProfileCard"}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "20px" }}>
            {/* Preview + Code */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: "20px", padding: "48px 32px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "220px" }}>
                <div style={{ width: "100%", maxWidth: "360px" }}>
                  {activeCard === "feature" && (
                    <FeatureCard
                      title={fcTitle} description={fcDesc} tag={fcTag}
                      tagColor={fcTagColor} accent={fcAccent} hoverable={fcHoverable}
                      icon={iconMap[fcIcon]}
                    />
                  )}
                  {activeCard === "stat" && (
                    <StatCard
                      value={scValue} label={scLabel} change={scChange}
                      changeType={scType} icon={iconMap[scIcon]}
                    />
                  )}
                  {activeCard === "profile" && (
                    <ProfileCard
                      name={pcName} role={pcRole} badge={pcBadge}
                      stats={[{ label: "Workouts", value: "32" }, { label: "Streak", value: "14d" }, { label: "Points", value: "2.4k" }]}
                      actions={<><Button variant="primary" size="sm">View Plan</Button><Button variant="secondary" size="sm">Message</Button></>}
                    />
                  )}
                </div>
              </div>
              <CodeBlock code={cardCode} />
            </div>

            {/* Controls per card type */}
            <div style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", gap: "18px", alignSelf: "start" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Props — {activeCard === "feature" ? "FeatureCard" : activeCard === "stat" ? "StatCard" : "ProfileCard"}</p>

              {activeCard === "feature" && <>
                <TextInput label="title" value={fcTitle} onChange={setFcTitle} placeholder="Card title" />
                <TextInput label="description" value={fcDesc} onChange={setFcDesc} placeholder="Card description" />
                <TextInput label="tag" value={fcTag} onChange={setFcTag} placeholder="Tag label" />
                <Selects label="tagColor" value={fcTagColor} onChange={setFcTagColor} options={["green","blue","purple","orange","teal","red"]} />
                <Selects label="icon" value={fcIcon} onChange={setFcIcon} options={["heart","fire","brain","zap","none"]} />
                <div style={{ height: "1px", background: "#f3f4f6" }} />
                <Toggle label="accent (dark mode)" checked={fcAccent} onChange={setFcAccent} />
                <Toggle label="hoverable" checked={fcHoverable} onChange={setFcHoverable} />
              </>}

              {activeCard === "stat" && <>
                <TextInput label="value" value={scValue} onChange={setScValue} placeholder="e.g. 2,450" />
                <TextInput label="label" value={scLabel} onChange={setScLabel} placeholder="Metric name" />
                <TextInput label="change" value={scChange} onChange={setScChange} placeholder="e.g. +12% this week" />
                <Selects label="changeType" value={scType} onChange={setScType} options={["up","down","neutral"]} />
                <Selects label="icon" value={scIcon} onChange={setScIcon} options={["fire","heart","brain","zap","none"]} />
              </>}

              {activeCard === "profile" && <>
                <TextInput label="name" value={pcName} onChange={setPcName} placeholder="Full name" />
                <TextInput label="role" value={pcRole} onChange={setPcRole} placeholder="Role or goal" />
                <TextInput label="badge" value={pcBadge} onChange={setPcBadge} placeholder="e.g. Pro" />
                <p style={{ fontSize: "12px", color: "#9ca3af", lineHeight: 1.6 }}>💡 Stats and actions are pre-set. In your app, pass them as props arrays.</p>
              </>}
            </div>
          </div>
        </div>

    {/* ══════════════════════════════════════
    INPUT PLAYGROUND
══════════════════════════════════════ */}
        <div style={{ marginBottom: "56px" }}>
          <SectionTitle title="Input" file="Input.tsx" />

          {/* Tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            {[["text","Input (Text)"],["password","PasswordInput"],["email","Input (Email)"]].map(([val, lbl]) => (
              <button key={val} onClick={() => { setActiveInput(val); setInLeftIcon(val === "email"); setSelectedIcon(val === "email" ? "mail" : "user"); }}
                style={{ padding: "8px 20px", borderRadius: "100px", border: "1.5px solid", borderColor: activeInput === val ? "#16a34a" : "#e5e7eb", background: activeInput === val ? "#f0fdf4" : "white", color: activeInput === val ? "#16a34a" : "#6b7280", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.15s", fontFamily: "'Outfit',sans-serif" }}>
                {lbl}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "20px" }}>
            {/* Preview + code */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: "20px", padding: "48px 40px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "160px" }}>
                <div style={{ width: "100%", maxWidth: "420px" }}>
                  {activeInput === "password" ? (
                    <PasswordInput label={inLabel} placeholder={inPlaceholder} inputSize={inSize} hint={inHint || undefined} error={inError || undefined} success={inSuccess || undefined} disabled={inDisabled} fullWidth={inFullWidth} value={inValue} onChange={e => setInValue(e.target.value)} />
                  ) : (
                    <Input
                      type={activeInput === "email" ? "email" : "text"}
                      label={inLabel} placeholder={inPlaceholder} inputSize={inSize}
                      hint={inHint || undefined} error={inError || undefined} success={inSuccess || undefined}
                      leftIcon={inLeftIcon && selectedIcon !== "none" ? iconOptions[selectedIcon] : undefined}
                      disabled={inDisabled} fullWidth={inFullWidth}
                      value={inValue} onChange={e => setInValue(e.target.value)}
                    />
                  )}
                </div>
              </div>
              <CodeBlock code={inputCode} />
            </div>

            {/* Controls */}
            <div style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", gap: "16px", alignSelf: "start" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Props</p>
              <TextInput label="label" value={inLabel} onChange={setInLabel} placeholder="Input label" />
              <TextInput label="placeholder" value={inPlaceholder} onChange={setInPlaceholder} placeholder="Placeholder text" />
              <Selects label="inputSize" value={inSize} onChange={setInSize} options={["sm","md","lg"]} />
              <div style={{ height: "1px", background: "#f3f4f6" }} />
              <TextInput label="hint" value={inHint} onChange={v => { setInHint(v); if(v){ setInError(""); setInSuccess(""); } }} placeholder="Hint message" />
              <TextInput label="error" value={inError} onChange={v => { setInError(v); if(v){ setInHint(""); setInSuccess(""); } }} placeholder="Error message" />
              <TextInput label="success" value={inSuccess} onChange={v => { setInSuccess(v); if(v){ setInHint(""); setInError(""); } }} placeholder="Success message" />
              <div style={{ height: "1px", background: "#f3f4f6" }} />
              {activeInput !== "password" && (
                <>
                  <Toggle label="leftIcon" checked={inLeftIcon} onChange={setInLeftIcon} />
                  {inLeftIcon && <Selects label="Icon type" value={selectedIcon} onChange={setSelectedIcon} options={["user","search","mail","phone"]} />}
                </>
              )}
              <Toggle label="disabled" checked={inDisabled} onChange={setInDisabled} />
              <Toggle label="fullWidth" checked={inFullWidth} onChange={setInFullWidth} />
              <div style={{ height: "1px", background: "#f3f4f6" }} />
              <p style={{ fontSize: "11px", color: "#9ca3af", lineHeight: 1.6 }}>💡 Only one of hint / error / success shows at a time</p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            BADGE PLAYGROUND
        ══════════════════════════════════════ */}
        <div>
          <SectionTitle title="Badges & Tags" file="Badge.tsx" />

          {/* Tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                    {badgeOptions.map(([val, lbl]) => (
            <button
              key={val}
              onClick={() => setActiveBadge(val)}
              style={{
                padding: "8px 20px",
                borderRadius: "100px",
                border: "1.5px solid",
                borderColor:
                  activeBadge === val ? "#16a34a" : "#e5e7eb",
                background:
                  activeBadge === val ? "#f0fdf4" : "white",
                color:
                  activeBadge === val ? "#16a34a" : "#6b7280",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              {lbl}
            </button>
          ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "20px" }}>
            {/* Preview + code */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Live preview */}
              <div style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: "20px", padding: "48px 40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "180px", gap: "24px" }}>
               {activeBadge === "pill" && (
  pillRemoved ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <p style={{ fontSize: "14px", color: "#9ca3af" }}>
        Pill removed!
      </p>

      <button
        onClick={() => setPillRemoved(false)}
        style={{
          padding: "8px 20px",
          borderRadius: "100px",
          border: "1.5px solid #e5e7eb",
          background: "white",
          fontSize: "13px",
          fontWeight: 600,
          cursor: "pointer",
          color: "#374151",
          fontFamily: "'Outfit',sans-serif",
        }}
      >
        Reset
      </button>
    </div>
  ) : (
    <Pill
      label={pillLabel}
      color={pillColor}
      size={pillSize}
      dot={pillDot}
      onRemove={
        pillRemovable
          ? () => setPillRemoved(true)
          : undefined
      }
    />
  )
)}

{activeBadge === "dot" && (
  <StatusDot
    status={dotStatus}
    size={dotSize}
    pulse={dotPulse}
    label={dotLabel || undefined}
  />
)}

{activeBadge === "label" && (
  <Label
    text={lblText}
    color={lblColor}
    size={lblSize}
    uppercase={lblUpper}
  />
)}

{(activeBadge === "pill" ||
  activeBadge === "label") && (
  <div
    style={{
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    {colors.map((c:ColorType) => (
      <div
        key={c}
        onClick={() =>
          activeBadge === "pill"
            ? setPillColor(c)
            : setLblColor(c)
        }
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: colorMap[c].color,
          cursor: "pointer",
          border: `2.5px solid ${
            (activeBadge === "pill"
              ? pillColor
              : lblColor) === c
              ? "#0f172a"
              : "transparent"
          }`,
          transition: "border 0.15s",
          flexShrink: 0,
        }}
        title={c}
      />
    ))}
  </div>
)}
              </div>
              <CodeBlock code={badgeCodeMap[activeBadge]} />
            </div>

            {/* Controls per badge type */}
            <div style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", gap: "16px", alignSelf: "start" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Props — {activeBadge === "pill" ? "Pill" : activeBadge === "dot" ? "StatusDot" : "Label"}</p>

              {activeBadge === "pill" && <>
                <TextInput label="label" value={pillLabel} onChange={setPillLabel} placeholder="Pill text" />
                <Selects label="color" value={pillColor} onChange={setPillColor} options={colors} />
                <Selects label="size" value={pillSize} onChange={setPillSize} options={["sm","md","lg"]} />
                <div style={{ height: "1px", background: "#f3f4f6" }} />
                <Toggle label="dot" checked={pillDot} onChange={setPillDot} />
                <Toggle label="onRemove (removable)" checked={pillRemovable} onChange={v => { setPillRemovable(v); setPillRemoved(false); }} />
                {pillRemoved && (
                  <button onClick={() => setPillRemoved(false)} style={{ padding: "8px", borderRadius: "8px", border: "1.5px solid #e5e7eb", background: "white", fontSize: "12px", fontWeight: 600, cursor: "pointer", color: "#16a34a", fontFamily: "'Outfit',sans-serif" }}>↩ Reset removed pill</button>
                )}
                <div style={{ height: "1px", background: "#f3f4f6" }} />
                <p style={{ fontSize: "11px", color: "#9ca3af", lineHeight: 1.6 }}>💡 Click the × on the pill preview to see onRemove in action</p>
              </>}

              {activeBadge === "dot" && <>
                <Selects label="status" value={dotStatus} onChange={setDotStatus} options={["online","offline","busy","idle","active"]} />
                <Selects label="size" value={dotSize} onChange={setDotSize} options={["sm","md","lg"]} />
                <TextInput label="label (override)" value={dotLabel} onChange={setDotLabel} placeholder="Leave empty for default" />
                <div style={{ height: "1px", background: "#f3f4f6" }} />
                <Toggle label="pulse animation" checked={dotPulse} onChange={setDotPulse} />
                <div style={{ height: "1px", background: "#f3f4f6" }} />
                <p style={{ fontSize: "11px", color: "#9ca3af", lineHeight: 1.6 }}>💡 Use this on profile cards, chat lists, and AI coach status indicators</p>
              </>}

              {activeBadge === "label" && <>
                <TextInput label="text" value={lblText} onChange={setLblText} placeholder="Label text" />
                <Selects label="color" value={lblColor} onChange={setLblColor} options={colors} />
                <Selects label="size" value={lblSize} onChange={setLblSize} options={["sm","md","lg"]} />
                <div style={{ height: "1px", background: "#f3f4f6" }} />
                <Toggle label="uppercase" checked={lblUpper} onChange={setLblUpper} />
                <div style={{ height: "1px", background: "#f3f4f6" }} />
                <p style={{ fontSize: "11px", color: "#9ca3af", lineHeight: 1.6 }}>💡 Labels are great for feature tags, category markers, and plan types</p>
              </>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}