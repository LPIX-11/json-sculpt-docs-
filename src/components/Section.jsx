import { Sparkles } from "lucide-react";
import { colors, fonts } from "../theme";
import { useInView } from "../hooks/useInView";

export function Section({ children, id, style = {} }) {
  const [ref, inView] = useInView({ threshold: 0.08 });

  return (
    <section
      ref={ref}
      id={id}
      style={{
        padding: "100px 24px",
        maxWidth: 1120,
        margin: "0 auto",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

export function SectionTitle({ badge, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 64 }}>
      {badge && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 18px",
            borderRadius: 100,
            border: `1px solid ${colors.border}`,
            background: "rgba(212,168,67,0.04)",
            color: colors.gold,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.8,
            textTransform: "uppercase",
            marginBottom: 22,
          }}
        >
          <Sparkles size={11} />
          {badge}
        </div>
      )}
      <h2
        style={{
          fontSize: "clamp(26px, 4.5vw, 44px)",
          fontWeight: 800,
          color: colors.warmWhite,
          margin: "0 0 16px",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          style={{
            color: colors.mutedText,
            fontSize: 17,
            maxWidth: 580,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export default Section;
