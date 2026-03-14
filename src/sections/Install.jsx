import { useState } from "react";
import { Terminal, Copy, Check, ArrowRight, Code2 } from "lucide-react";
import { colors, fonts } from "../theme";
import { useInView } from "../hooks/useInView";
import { Section, SectionTitle } from "../components/Section";
import AdinkraPattern from "../components/AdinkraPattern";
import CodeBlock from "../components/CodeBlock";

const STEPS = [
  {
    step: "01",
    title: "Install",
    code: `npm install @sonatel-os/json-sculpt`,
    lang: "bash",
  },
  {
    step: "02",
    title: "Import",
    code: `import sculpt from "@sonatel-os/json-sculpt";`,
    lang: "js",
  },
  {
    step: "03",
    title: "Sculpt",
    code: `const template = {
  name: "@link.user.profile.fullName",
  age: "@link.user.profile.age::number",
  orders: {
    $map: "@link.user.orders",
    $transform: {
      id: "@link.orderId",
      total: "@link.amount::number"
    }
  }
};

const result = sculpt.data({ data, to: template });`,
    lang: "js",
  },
];

function StepCard({ step, title, code, lang, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `all 0.65s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: inView ? `${index * 150}ms` : "0ms",
      }}
    >
      {/* Step number */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.orange})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 13,
            color: colors.bg,
            fontFamily: fonts.mono,
            flexShrink: 0,
          }}
        >
          {step}
        </div>
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: colors.warmWhite,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </span>
      </div>

      {/* Code block */}
      <div
        style={{
          background: colors.bgPanel,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "4px 14px",
            borderBottom: `1px solid ${colors.border}`,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Terminal size={11} color={colors.goldDim} />
          <span
            style={{
              fontSize: 10,
              color: colors.mutedText,
              fontFamily: fonts.mono,
              letterSpacing: 0.5,
            }}
          >
            {lang}
          </span>
        </div>
        <pre
          style={{
            margin: 0,
            padding: "16px 18px",
            fontFamily: fonts.mono,
            fontSize: 13,
            lineHeight: 1.7,
            color: colors.warmWhite,
            overflow: "auto",
            whiteSpace: "pre",
          }}
        >
          {code}
        </pre>
      </div>
    </div>
  );
}

const Install = () => {
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard?.writeText("npm install @sonatel-os/json-sculpt");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="install" style={{ position: "relative" }}>
      <AdinkraPattern opacity={0.018} />
      <Section style={{ position: "relative", zIndex: 1 }}>
        <SectionTitle
          badge="Get Started"
          title="Up & Running in 30 Seconds"
          sub="Zero config. Zero dependencies. Just install and sculpt."
        />

        {/* Steps grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 36,
            maxWidth: 640,
            margin: "0 auto 56px",
          }}
        >
          {STEPS.map((s, i) => (
            <StepCard key={s.step} {...s} index={i} />
          ))}
        </div>

        {/* Big CTA install badge */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={copyInstall}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 28px",
              borderRadius: 14,
              border: `2px solid ${colors.gold}`,
              background: "rgba(212,168,67,0.06)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: fonts.mono,
              fontSize: 16,
              color: colors.warmWhite,
            }}
          >
            <Terminal size={20} color={colors.gold} />
            <span style={{ fontWeight: 600, letterSpacing: 0.3 }}>
              $ npm install @sonatel-os/json-sculpt
            </span>
            <div
              style={{
                marginLeft: 8,
                padding: "4px 10px",
                borderRadius: 6,
                background: copied
                  ? "rgba(125,206,160,0.15)"
                  : "rgba(212,168,67,0.1)",
                transition: "all 0.2s",
              }}
            >
              {copied ? (
                <Check size={16} color={colors.syntaxGreen} />
              ) : (
                <Copy size={16} color={colors.gold} />
              )}
            </div>
          </button>
        </div>
      </Section>
    </section>
  );
};

export default Install;
