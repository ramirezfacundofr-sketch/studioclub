import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, Plus, Instagram, Facebook } from "lucide-react";
import { mockBusiness } from "../data/mockBusiness";
import type { Service } from "../data/mockBusiness";

// ─── Constants ───────────────────────────────────────────────────────────────

const TOTAL_STEPS = 5;
const VALID_CODE = "1234";

const BUSINESS_TYPES = [
  "Hair Salon",
  "Barbershop",
  "Nail Studio",
  "Aesthetics",
  "Nutrition",
  "Physiotherapy",
  "Personal Trainer",
  "Other",
];

const COLOR_PRESETS = [
  "#6366F1",
  "#EC4899",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#EF4444",
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  fullName: string;
  email: string;
  businessName: string;
  businessType: string;
  description: string;
  services: Service[];
  whatsapp: string;
  neighborhood: string;
  address: string;
  hours: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  logoUrl: string;
  heroUrl: string;
  primaryColor: string;
}

// ─── Design tokens ───────────────────────────────────────────────────────────

const T = {
  bg: "#0F0F0F",
  card: "rgba(255,255,255,0.04)",
  cardBorder: "1px solid rgba(255,255,255,0.06)",
  accent: "#6366F1",
  textPrimary: "#F5F5F5",
  textMuted: "#A0A0A0",
  inputBg: "rgba(255,255,255,0.06)",
  inputBorder: "rgba(255,255,255,0.1)",
  font: "'Inter', sans-serif",
} as const;

// ─── Shared style helpers ────────────────────────────────────────────────────

function inputStyle(focused: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "14px 16px",
    background: T.inputBg,
    border: `1px solid ${focused ? T.accent : T.inputBorder}`,
    borderRadius: 12,
    color: T.textPrimary,
    fontSize: "0.9375rem",
    outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: T.font,
    transition: "border-color 0.2s",
    resize: "none" as const,
  };
}

const headingStyle: React.CSSProperties = {
  fontSize: "1.375rem",
  fontWeight: 700,
  color: T.textPrimary,
  fontFamily: T.font,
  margin: 0,
  marginBottom: 6,
};

const subStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  color: T.textMuted,
  fontFamily: T.font,
  margin: 0,
  lineHeight: 1.55,
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: "0.75rem",
  color: T.textMuted,
  fontWeight: 500,
  marginBottom: "0.375rem",
  fontFamily: T.font,
};

// ─── Reusable primitives ─────────────────────────────────────────────────────

function Field({
  label,
  optional,
  helperText,
  tip,
  children,
}: {
  label?: string;
  optional?: boolean;
  helperText?: string;
  tip?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && (
        <label style={labelStyle}>
          {label}
          {optional && (
            <span style={{ fontSize: "0.7rem", color: T.textMuted, fontStyle: "italic" }}>
              Optional
            </span>
          )}
        </label>
      )}
      {helperText && (
        <p style={{ fontSize: "0.75rem", color: T.textMuted, fontFamily: T.font, margin: "0 0 4px" }}>
          {helperText}
        </p>
      )}
      {children}
      {tip && (
        <p style={{ fontSize: "0.6875rem", color: T.textMuted, fontStyle: "italic", fontFamily: T.font, margin: 0 }}>
          {tip}
        </p>
      )}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
  maxLength,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
  maxLength?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      style={inputStyle(focused)}
      type={type}
      value={value}
      placeholder={placeholder}
      autoFocus={autoFocus}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function TextareaInput({
  value,
  onChange,
  placeholder,
  rows = 2,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      style={{ ...inputStyle(focused), resize: "none" }}
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function PrimaryButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "16px",
        background: disabled ? "rgba(255,255,255,0.12)" : "#F5F5F5",
        color: disabled ? T.textMuted : "#0F0F0F",
        border: "none",
        borderRadius: 12,
        fontSize: "0.9375rem",
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        fontFamily: T.font,
        transition: "opacity 0.2s, background 0.2s",
        letterSpacing: "0.01em",
      }}
    >
      {label}
    </button>
  );
}

// ─── Motion variants ─────────────────────────────────────────────────────────

function slideVariants(dir: 1 | -1) {
  return {
    initial: { opacity: 0, x: 40 * dir },
    animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
    exit: { opacity: 0, x: -40 * dir, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
  };
}

// ─── STEP 0: Identity ────────────────────────────────────────────────────────

function Step0({
  data,
  update,
  onVerified,
}: {
  data: FormData;
  update: (p: Partial<FormData>) => void;
  onVerified: () => void;
}) {
  const [phase, setPhase] = useState<"form" | "verify">("form");
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const canContinue = data.fullName.trim() && data.email.trim();

  const handleSend = () => {
    if (!canContinue) return;
    setPhase("verify");
    setDigits(["", "", "", ""]);
    setError("");
    setTimeout(() => refs[0].current?.focus(), 80);
  };

  const handleDigit = (idx: number, val: string) => {
    const ch = val.replace(/\D/g, "").slice(-1);
    const next = digits.map((d, i) => (i === idx ? ch : d));
    setDigits(next);
    setError("");
    if (ch && idx < 3) {
      setTimeout(() => refs[idx + 1].current?.focus(), 0);
    }
    if (next.join("").length === 4) {
      const code = next.join("");
      if (code === VALID_CODE) {
        onVerified();
      } else {
        setError("Incorrect code. Try 1234.");
      }
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      refs[idx - 1].current?.focus();
    }
  };

  const handleResend = () => {
    setDigits(["", "", "", ""]);
    setError("");
    setResent(true);
    setTimeout(() => setResent(false), 3000);
    setTimeout(() => refs[0].current?.focus(), 80);
  };

  // ── Verify sub-screen ──
  if (phase === "verify") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div>
          <h2 style={headingStyle}>Check your inbox</h2>
          <p style={{ ...subStyle, marginTop: 8 }}>
            We sent a 4-digit verification code to{" "}
            <span style={{ color: T.textPrimary, fontWeight: 600 }}>{data.email}</span>. Enter it
            below to continue.
          </p>
          <p
            style={{
              ...subStyle,
              fontSize: "0.75rem",
              marginTop: 8,
              color: "rgba(160,160,160,0.7)",
            }}
          >
            No link — just a numeric code. Check your spam folder if you don't see it.
          </p>
        </div>

        {/* 4 digit inputs */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={refs[i]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleDigit(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              style={{
                width: 56,
                height: 64,
                textAlign: "center",
                fontSize: 24,
                fontWeight: 700,
                background: T.inputBg,
                border: `1px solid ${d ? T.accent : T.inputBorder}`,
                borderRadius: 12,
                color: T.textPrimary,
                outline: "none",
                fontFamily: T.font,
                transition: "border-color 0.2s",
                caretColor: T.accent,
                boxSizing: "border-box",
              }}
            />
          ))}
        </div>

        {error && (
          <p
            style={{
              textAlign: "center",
              color: "#EF4444",
              fontSize: "0.8rem",
              fontFamily: T.font,
              margin: 0,
            }}
          >
            {error}
          </p>
        )}

        {/* Resend */}
        <p
          style={{
            textAlign: "center",
            fontSize: "0.8125rem",
            color: T.textMuted,
            fontFamily: T.font,
            margin: 0,
          }}
        >
          {resent ? (
            <span style={{ color: T.accent }}>Code sent again ✓</span>
          ) : (
            <>
              Didn't receive it?{" "}
              <button
                onClick={handleResend}
                style={{
                  background: "none",
                  border: "none",
                  color: T.textMuted,
                  cursor: "pointer",
                  fontSize: "inherit",
                  fontFamily: T.font,
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                Resend code
              </button>
            </>
          )}
        </p>

        <button
          onClick={() => setPhase("form")}
          style={{
            background: "none",
            border: "none",
            color: T.textMuted,
            cursor: "pointer",
            fontSize: "0.8125rem",
            fontFamily: T.font,
            padding: 0,
            textAlign: "center",
          }}
        >
          ← Change email
        </button>
      </div>
    );
  }

  // ── Form sub-screen ──
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={headingStyle}>Let's get started</h2>
        <p style={{ ...subStyle, marginTop: 6 }}>Create your free StudioClub page in minutes.</p>
      </div>
      <Field label="Full name">
        <TextInput
          value={data.fullName}
          onChange={(v) => update({ fullName: v })}
          placeholder="María González"
          autoFocus
        />
      </Field>
      <Field label="Email">
        <TextInput
          value={data.email}
          onChange={(v) => update({ email: v })}
          placeholder="maria@gmail.com"
          type="email"
        />
      </Field>
      <PrimaryButton label="Continue" disabled={!canContinue} onClick={handleSend} />
    </div>
  );
}

// ─── STEP 1: Business ────────────────────────────────────────────────────────

function Step1({ data, update }: { data: FormData; update: (p: Partial<FormData>) => void }) {
  const can =
    data.businessName.trim() && data.businessType && data.description.trim();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={headingStyle}>Your business</h2>
        <p style={{ ...subStyle, marginTop: 6 }}>Tell us about your studio or space.</p>
      </div>

      <Field label="Business name">
        <TextInput
          value={data.businessName}
          onChange={(v) => update({ businessName: v })}
          placeholder="The Corner Barbershop"
          autoFocus
        />
      </Field>

      <Field label="Business type">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {BUSINESS_TYPES.map((t) => {
            const selected = data.businessType === t;
            return (
              <button
                key={t}
                onClick={() => update({ businessType: t })}
                style={{
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: `1px solid ${selected ? T.accent : T.inputBorder}`,
                  background: selected ? T.accent : T.inputBg,
                  color: selected ? "#fff" : T.textMuted,
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: T.font,
                  transition: "all 0.18s ease",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Short description">
        <TextareaInput
          value={data.description}
          onChange={(v) => update({ description: v })}
          placeholder="We are a barbershop in Villa Crespo specialized in classic cuts and beard grooming..."
          rows={2}
        />
      </Field>

      <PrimaryButton label="Next →" disabled={!can} />
    </div>
  );
}

// ─── STEP 2: Services ────────────────────────────────────────────────────────

function ServiceRow({
  service,
  onUpdate,
  onRemove,
  canRemove,
}: {
  key?: React.Key;
  service: Service;
  onUpdate: (field: keyof Service, val: string) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const [focused, setFocused] = useState<string | null>(null);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 90px 90px 32px",
        gap: 8,
        alignItems: "center",
      }}
    >
      <input
        style={inputStyle(focused === "name")}
        placeholder="Service name"
        value={service.name}
        onChange={(e) => onUpdate("name", e.target.value)}
        onFocus={() => setFocused("name")}
        onBlur={() => setFocused(null)}
      />
      <input
        style={inputStyle(focused === "price")}
        placeholder="Price"
        value={service.price}
        onChange={(e) => onUpdate("price", e.target.value.replace(/\D/g, ""))}
        onFocus={() => setFocused("price")}
        onBlur={() => setFocused(null)}
      />
      <input
        style={inputStyle(focused === "duration")}
        placeholder="45 min"
        value={service.duration}
        onChange={(e) => onUpdate("duration", e.target.value)}
        onFocus={() => setFocused("duration")}
        onBlur={() => setFocused(null)}
      />
      <button
        onClick={onRemove}
        disabled={!canRemove}
        style={{
          background: "transparent",
          border: "none",
          cursor: canRemove ? "pointer" : "not-allowed",
          color: canRemove ? T.textMuted : "rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          transition: "color 0.2s",
        }}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function Step2({ data, update }: { data: FormData; update: (p: Partial<FormData>) => void }) {
  const updateRow = (idx: number, field: keyof Service, val: string) => {
    const next = data.services.map((s, i) => (i === idx ? { ...s, [field]: val } : s));
    update({ services: next });
  };

  const addRow = () => {
    if (data.services.length < 8) {
      update({ services: [...data.services, { name: "", price: "", duration: "" }] });
    }
  };

  const removeRow = (idx: number) => {
    if (data.services.length > 1) {
      update({ services: data.services.filter((_, i) => i !== idx) });
    }
  };

  const can = data.services.some((s) => s.name.trim() && s.price.trim());

  const [addHover, setAddHover] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={headingStyle}>Your services</h2>
        <p style={{ ...subStyle, marginTop: 6 }}>Add everything you offer with prices.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Column headers */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px 32px", gap: 8 }}
        >
          {["Service", "Price", "Duration", ""].map((h) => (
            <span
              key={h}
              style={{
                fontSize: "0.7rem",
                color: T.textMuted,
                fontFamily: T.font,
                fontWeight: 500,
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {data.services.map((s, idx) => (
          <ServiceRow
            key={idx}
            service={s}
            onUpdate={(field, val) => updateRow(idx, field, val)}
            onRemove={() => removeRow(idx)}
            canRemove={data.services.length > 1}
          />
        ))}
      </div>

      {data.services.length < 8 && (
        <button
          onClick={addRow}
          onMouseEnter={() => setAddHover(true)}
          onMouseLeave={() => setAddHover(false)}
          style={{
            background: "transparent",
            border: `1px dashed ${addHover ? T.accent : "rgba(255,255,255,0.15)"}`,
            borderRadius: 12,
            color: addHover ? T.accent : T.textMuted,
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
            padding: "12px 16px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "all 0.2s",
            fontFamily: T.font,
          }}
        >
          <Plus size={15} />
          Add service
        </button>
      )}

      <PrimaryButton label="Next →" disabled={!can} />
    </div>
  );
}

// ─── STEP 3: Contact ─────────────────────────────────────────────────────────

function Step3({ data, update }: { data: FormData; update: (p: Partial<FormData>) => void }) {
  const [wfocused, setWfocused] = useState(false);
  const can = data.whatsapp.trim() && data.neighborhood.trim() && data.address.trim() && data.hours.trim();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={headingStyle}>Your contact</h2>
        <p style={{ ...subStyle, marginTop: 6 }}>How clients will reach you.</p>
      </div>

      {/* WhatsApp */}
      <Field label="WhatsApp number">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: T.inputBg,
            border: `1px solid ${wfocused ? T.accent : T.inputBorder}`,
            borderRadius: 12,
            overflow: "hidden",
            transition: "border-color 0.2s",
          }}
        >
          <span
            style={{
              padding: "14px 12px 14px 16px",
              color: T.textMuted,
              fontSize: "0.9375rem",
              fontWeight: 600,
              borderRight: "1px solid rgba(255,255,255,0.08)",
              whiteSpace: "nowrap",
              userSelect: "none",
              fontFamily: T.font,
            }}
          >
            +54
          </span>
          <input
            style={{
              flex: 1,
              padding: "14px 16px",
              background: "transparent",
              border: "none",
              color: T.textPrimary,
              fontSize: "0.9375rem",
              outline: "none",
              fontFamily: T.font,
            }}
            type="tel"
            placeholder="1134567890"
            value={data.whatsapp}
            onChange={(e) => update({ whatsapp: e.target.value.replace(/\D/g, "") })}
            onFocus={() => setWfocused(true)}
            onBlur={() => setWfocused(false)}
            maxLength={15}
          />
        </div>
      </Field>

      {/* Neighborhood + Address */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Neighborhood">
          <TextInput
            value={data.neighborhood}
            onChange={(v) => update({ neighborhood: v })}
            placeholder="Villa Crespo"
          />
        </Field>
        <Field label="Full address">
          <TextInput
            value={data.address}
            onChange={(v) => update({ address: v })}
            placeholder="Av. Corrientes 5320"
          />
        </Field>
      </div>

      <Field label="Opening hours">
        <TextInput
          value={data.hours}
          onChange={(v) => update({ hours: v })}
          placeholder="Mon–Fri 9am to 7pm · Sat 9am to 2pm"
        />
      </Field>

      <PrimaryButton label="Next →" disabled={!can} />
    </div>
  );
}

// ─── STEP 4: Social ──────────────────────────────────────────────────────────

function SocialIconWrap({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 14,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {children}
    </div>
  );
}

function PaddedInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      style={{ ...inputStyle(focused), paddingLeft: 42 }}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function Step4({ data, update }: { data: FormData; update: (p: Partial<FormData>) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={headingStyle}>Your social media</h2>
        <p style={{ ...subStyle, marginTop: 6 }}>Add your profiles — all optional.</p>
      </div>

      <Field label="Instagram" optional>
        <div style={{ position: "relative" }}>
          <SocialIconWrap>
            <Instagram size={15} color={T.textMuted} />
          </SocialIconWrap>
          <PaddedInput
            value={data.instagram}
            onChange={(v) => update({ instagram: v })}
            placeholder="@thecornerbarbershop"
          />
        </div>
      </Field>

      <Field label="Facebook" optional>
        <div style={{ position: "relative" }}>
          <SocialIconWrap>
            <Facebook size={15} color={T.textMuted} />
          </SocialIconWrap>
          <PaddedInput
            value={data.facebook}
            onChange={(v) => update({ facebook: v })}
            placeholder="facebook.com/thecornerbarbershop"
          />
        </div>
      </Field>

      <Field label="TikTok" optional>
        <div style={{ position: "relative" }}>
          <SocialIconWrap>
            <span style={{ fontSize: 13, color: T.textMuted, fontWeight: 700, lineHeight: 1 }}>
              ♪
            </span>
          </SocialIconWrap>
          <PaddedInput
            value={data.tiktok}
            onChange={(v) => update({ tiktok: v })}
            placeholder="@thecornerbarbershop"
          />
        </div>
      </Field>

      <PrimaryButton label="Next →" />
    </div>
  );
}

// ─── STEP 5: Brand ───────────────────────────────────────────────────────────

function Step5({
  data,
  update,
  onPublish,
}: {
  data: FormData;
  update: (p: Partial<FormData>) => void;
  onPublish: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={headingStyle}>Your brand</h2>
        <p style={{ ...subStyle, marginTop: 6 }}>Personalize how your page looks.</p>
      </div>

      {/* Color */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={labelStyle}>Primary color</label>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {COLOR_PRESETS.map((c) => {
            const selected = data.primaryColor.toLowerCase() === c.toLowerCase();
            return (
              <button
                key={c}
                onClick={() => update({ primaryColor: c })}
                title={c}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: c,
                  border: selected
                    ? `3px solid ${T.textPrimary}`
                    : "3px solid transparent",
                  outline: selected ? `2px solid ${c}` : "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "outline 0.15s, border 0.15s",
                  boxSizing: "border-box",
                  flexShrink: 0,
                }}
              />
            );
          })}
          {/* Custom color */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="color"
              value={data.primaryColor}
              onChange={(e) => update({ primaryColor: e.target.value })}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                background: "transparent",
                padding: 0,
              }}
              title="Custom color"
            />
            <span style={{ fontSize: "0.75rem", color: T.textMuted, fontFamily: T.font }}>
              {data.primaryColor}
            </span>
          </div>
        </div>
      </div>

      {/* Logo */}
      <Field
        label="Your logo or profile photo"
        helperText="Appears in the header of your site and on Google. Square image recommended, minimum 400×400px."
        tip="Tip: use the link to your Instagram profile photo or upload to Google Drive and paste the link here."
      >
        <TextInput
          value={data.logoUrl}
          onChange={(v) => update({ logoUrl: v })}
          placeholder="https://..."
        />
      </Field>

      {/* Hero */}
      <Field
        label="Main photo of your space or work"
        helperText="This is the first image your clients will see. Horizontal photo recommended, minimum 1200×600px."
        tip="Tip: use a photo of your space, your best work, or a team photo. Horizontal format works best."
      >
        <TextInput
          value={data.heroUrl}
          onChange={(v) => update({ heroUrl: v })}
          placeholder="https://..."
        />
      </Field>

      <p
        style={{
          textAlign: "center",
          fontSize: "0.75rem",
          color: T.textMuted,
          fontFamily: T.font,
          margin: 0,
        }}
      >
        You can update these images anytime after publishing.
      </p>

      <PrimaryButton label="Publish my site →" onClick={onPublish} />
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  // step is 1-5
  const pct = (step / TOTAL_STEPS) * 100;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 3,
        background: "rgba(255,255,255,0.08)",
        overflow: "hidden",
        zIndex: 50,
      }}
    >
      <motion.div
        style={{ height: "100%", background: T.accent }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const INITIAL_DATA: FormData = {
  fullName: "Facundo Ramírez",
  email: "facu@studioclub.co",
  businessName: "The Corner Barbershop",
  businessType: "Barbershop",
  description:
    "Classic barbershop in Villa Crespo. Specialized in precision cuts and beard grooming.",
  services: [
    { name: "Classic Haircut", price: "6500", duration: "45 min" },
    { name: "Beard Trim", price: "4000", duration: "20 min" },
    { name: "Haircut + Beard", price: "9500", duration: "60 min" },
  ],
  whatsapp: "1134567890",
  neighborhood: "Villa Crespo",
  address: "Av. Corrientes 5320",
  hours: "Mon–Sat 9am to 8pm",
  instagram: "@thecornerbarbershop",
  facebook: "",
  tiktok: "",
  logoUrl: "",
  heroUrl: "",
  primaryColor: "#6366F1",
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(0); // 0 = identity, 1-5 = onboarding steps
  const [dir, setDir] = useState<1 | -1>(1); // 1 = forward, -1 = back
  const [data, setData] = useState<FormData>(INITIAL_DATA);

  const update = (patch: Partial<FormData>) => setData((prev) => ({ ...prev, ...patch }));

  const goNext = () => {
    setDir(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDir(-1);
    setStep((s) => s - 1);
  };

  const handleVerified = () => {
    setDir(1);
    setStep(1);
  };

  const handlePublish = () => {
    navigate("/preview");
  };

  // Inject goNext into Step1-4 via a wrapper approach ─ we override click on PrimaryButton
  // by rendering the step and intercepting. Instead, we pass on* props directly to step components.

  const variants = slideVariants(dir);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: T.font,
        boxSizing: "border-box",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Link
          to="/"
          style={{
            color: T.textPrimary,
            fontWeight: 800,
            fontSize: "1rem",
            textDecoration: "none",
            letterSpacing: "-0.03em",
            fontFamily: T.font,
          }}
        >
          StudioClub
        </Link>

        {step >= 1 && (
          <span
            style={{
              fontSize: "0.75rem",
              color: T.textMuted,
              fontFamily: T.font,
            }}
          >
            Step {step} of {TOTAL_STEPS}
          </span>
        )}
      </div>

      {/* Progress bar — only for steps 1-5 */}
      {step >= 1 && <ProgressBar step={step} />}

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: T.card,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: T.cardBorder,
          borderRadius: 20,
          padding: "36px 32px",
          boxSizing: "border-box",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {step === 0 && (
            <motion.div
              key="step0"
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
            >
              <Step0 data={data} update={update} onVerified={handleVerified} />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
            >
              <Step1WithNav data={data} update={update} onNext={goNext} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
            >
              <Step2WithNav data={data} update={update} onNext={goNext} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
            >
              <Step3WithNav data={data} update={update} onNext={goNext} />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
            >
              <Step4WithNav data={data} update={update} onNext={goNext} />
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
            >
              <Step5 data={data} update={update} onPublish={handlePublish} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Back link — from step 2 onwards */}
      {step >= 2 && (
        <button
          onClick={goBack}
          style={{
            marginTop: 20,
            background: "none",
            border: "none",
            color: T.textMuted,
            cursor: "pointer",
            fontSize: "0.875rem",
            fontFamily: T.font,
            padding: "4px 0",
          }}
        >
          ← Back
        </button>
      )}
    </div>
  );
}

// ─── Nav-aware step wrappers ──────────────────────────────────────────────────
// These wrap each Step component so the "Next" button actually advances the flow.

function Step1WithNav({
  data,
  update,
  onNext,
}: {
  data: FormData;
  update: (p: Partial<FormData>) => void;
  onNext: () => void;
}) {
  const can =
    data.businessName.trim() !== "" &&
    data.businessType !== "" &&
    data.description.trim() !== "";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={headingStyle}>Your business</h2>
        <p style={{ ...subStyle, marginTop: 6 }}>Tell us about your studio or space.</p>
      </div>

      <Field label="Business name">
        <TextInput
          value={data.businessName}
          onChange={(v) => update({ businessName: v })}
          placeholder="The Corner Barbershop"
          autoFocus
        />
      </Field>

      <Field label="Business type">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {BUSINESS_TYPES.map((t) => {
            const selected = data.businessType === t;
            return (
              <button
                key={t}
                onClick={() => update({ businessType: t })}
                style={{
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: `1px solid ${selected ? T.accent : T.inputBorder}`,
                  background: selected ? T.accent : T.inputBg,
                  color: selected ? "#fff" : T.textMuted,
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: T.font,
                  transition: "all 0.18s ease",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Short description">
        <TextareaInput
          value={data.description}
          onChange={(v) => update({ description: v })}
          placeholder="We are a barbershop in Villa Crespo specialized in classic cuts and beard grooming..."
          rows={2}
        />
      </Field>

      <PrimaryButton label="Next →" disabled={!can} onClick={onNext} />
    </div>
  );
}

function Step2WithNav({
  data,
  update,
  onNext,
}: {
  data: FormData;
  update: (p: Partial<FormData>) => void;
  onNext: () => void;
}) {
  const [addHover, setAddHover] = useState(false);

  const updateRow = (idx: number, field: keyof Service, val: string) => {
    const next = data.services.map((s, i) => (i === idx ? { ...s, [field]: val } : s));
    update({ services: next });
  };

  const addRow = () => {
    if (data.services.length < 8) {
      update({ services: [...data.services, { name: "", price: "", duration: "" }] });
    }
  };

  const removeRow = (idx: number) => {
    if (data.services.length > 1) {
      update({ services: data.services.filter((_, i) => i !== idx) });
    }
  };

  const can = data.services.some((s) => s.name.trim() && s.price.trim());

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={headingStyle}>Your services</h2>
        <p style={{ ...subStyle, marginTop: 6 }}>Add everything you offer with prices.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px 32px", gap: 8 }}>
          {["Service", "Price", "Duration", ""].map((h) => (
            <span
              key={h}
              style={{ fontSize: "0.7rem", color: T.textMuted, fontFamily: T.font, fontWeight: 500 }}
            >
              {h}
            </span>
          ))}
        </div>

        {data.services.map((s, idx) => (
          <ServiceRow
            key={idx}
            service={s}
            onUpdate={(field, val) => updateRow(idx, field, val)}
            onRemove={() => removeRow(idx)}
            canRemove={data.services.length > 1}
          />
        ))}
      </div>

      {data.services.length < 8 && (
        <button
          onClick={addRow}
          onMouseEnter={() => setAddHover(true)}
          onMouseLeave={() => setAddHover(false)}
          style={{
            background: "transparent",
            border: `1px dashed ${addHover ? T.accent : "rgba(255,255,255,0.15)"}`,
            borderRadius: 12,
            color: addHover ? T.accent : T.textMuted,
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
            padding: "12px 16px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "all 0.2s",
            fontFamily: T.font,
          }}
        >
          <Plus size={15} />
          Add service
        </button>
      )}

      <PrimaryButton label="Next →" disabled={!can} onClick={onNext} />
    </div>
  );
}

function Step3WithNav({
  data,
  update,
  onNext,
}: {
  data: FormData;
  update: (p: Partial<FormData>) => void;
  onNext: () => void;
}) {
  const [wfocused, setWfocused] = useState(false);
  const can =
    data.whatsapp.trim() !== "" &&
    data.neighborhood.trim() !== "" &&
    data.address.trim() !== "" &&
    data.hours.trim() !== "";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={headingStyle}>Your contact</h2>
        <p style={{ ...subStyle, marginTop: 6 }}>How clients will reach you.</p>
      </div>

      <Field label="WhatsApp number">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: T.inputBg,
            border: `1px solid ${wfocused ? T.accent : T.inputBorder}`,
            borderRadius: 12,
            overflow: "hidden",
            transition: "border-color 0.2s",
          }}
        >
          <span
            style={{
              padding: "14px 12px 14px 16px",
              color: T.textMuted,
              fontSize: "0.9375rem",
              fontWeight: 600,
              borderRight: "1px solid rgba(255,255,255,0.08)",
              whiteSpace: "nowrap",
              userSelect: "none",
              fontFamily: T.font,
            }}
          >
            +54
          </span>
          <input
            style={{
              flex: 1,
              padding: "14px 16px",
              background: "transparent",
              border: "none",
              color: T.textPrimary,
              fontSize: "0.9375rem",
              outline: "none",
              fontFamily: T.font,
            }}
            type="tel"
            placeholder="1134567890"
            value={data.whatsapp}
            onChange={(e) => update({ whatsapp: e.target.value.replace(/\D/g, "") })}
            onFocus={() => setWfocused(true)}
            onBlur={() => setWfocused(false)}
            maxLength={15}
          />
        </div>
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Neighborhood">
          <TextInput
            value={data.neighborhood}
            onChange={(v) => update({ neighborhood: v })}
            placeholder="Villa Crespo"
          />
        </Field>
        <Field label="Full address">
          <TextInput
            value={data.address}
            onChange={(v) => update({ address: v })}
            placeholder="Av. Corrientes 5320"
          />
        </Field>
      </div>

      <Field label="Opening hours">
        <TextInput
          value={data.hours}
          onChange={(v) => update({ hours: v })}
          placeholder="Mon–Fri 9am to 7pm · Sat 9am to 2pm"
        />
      </Field>

      <PrimaryButton label="Next →" disabled={!can} onClick={onNext} />
    </div>
  );
}

function Step4WithNav({
  data,
  update,
  onNext,
}: {
  data: FormData;
  update: (p: Partial<FormData>) => void;
  onNext: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={headingStyle}>Your social media</h2>
        <p style={{ ...subStyle, marginTop: 6 }}>Add your profiles — all optional.</p>
      </div>

      <Field label="Instagram" optional>
        <div style={{ position: "relative" }}>
          <SocialIconWrap>
            <Instagram size={15} color={T.textMuted} />
          </SocialIconWrap>
          <PaddedInput
            value={data.instagram}
            onChange={(v) => update({ instagram: v })}
            placeholder="@thecornerbarbershop"
          />
        </div>
      </Field>

      <Field label="Facebook" optional>
        <div style={{ position: "relative" }}>
          <SocialIconWrap>
            <Facebook size={15} color={T.textMuted} />
          </SocialIconWrap>
          <PaddedInput
            value={data.facebook}
            onChange={(v) => update({ facebook: v })}
            placeholder="facebook.com/thecornerbarbershop"
          />
        </div>
      </Field>

      <Field label="TikTok" optional>
        <div style={{ position: "relative" }}>
          <SocialIconWrap>
            <span style={{ fontSize: 13, color: T.textMuted, fontWeight: 700, lineHeight: 1 }}>
              ♪
            </span>
          </SocialIconWrap>
          <PaddedInput
            value={data.tiktok}
            onChange={(v) => update({ tiktok: v })}
            placeholder="@thecornerbarbershop"
          />
        </div>
      </Field>

      <PrimaryButton label="Next →" onClick={onNext} />
    </div>
  );
}
