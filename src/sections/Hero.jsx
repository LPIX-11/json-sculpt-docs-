import { Star, ChevronRight } from "lucide-react";
import { colors, fonts } from "../theme";
import AdinkraPattern from "../components/AdinkraPattern";
import FloatingGeometry from "../components/FloatingGeometry";
import InstallBadge from "../components/InstallBadge";

const Hero = () => {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
        overflow: "hidden",
      }}
    >
      <AdinkraPattern opacity={0.05} />
      <FloatingGeometry />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 750,
          height: 750,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,168,67,0.1) 0%, rgba(230,126,34,0.04) 40%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "heroGlow 5s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Orbiting dot */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: colors.goldBright,
            boxShadow: "0 0 24px 4px rgba(245,197,66,0.3)",
            animation: "orbitSlow 25s linear infinite",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          animation: "fadeInUp 0.9s ease-out both",
        }}
      >
        {/* Version badge */}
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
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 36,
            letterSpacing: 0.3,
          }}
        >
          <Star size={12} fill={colors.gold} color={colors.gold} />
          v1.3.0 — Now with $recursive &amp; $spread
        </div>

        {/* Title */}
        <h1
          className="hero-title"
          style={{
            fontSize: "clamp(42px, 8vw, 82px)",
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 28,
            letterSpacing: "-0.035em",
          }}
        >
          <span style={{ color: colors.warmWhite }}>Sculpt Your </span>
          <span
            style={{
              background: `linear-gradient(135deg, ${colors.goldBright}, ${colors.orange}, ${colors.gold})`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 3.5s linear infinite",
            }}
          >
            Data
          </span>
          <br />
          <span style={{ color: colors.warmWhite }}>Shape Your </span>
          <span
            style={{
              background: `linear-gradient(135deg, ${colors.orange}, ${colors.goldBright}, ${colors.gold})`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 3.5s linear infinite",
              animationDelay: "1.5s",
            }}
          >
            Future
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(16px, 2.2vw, 19px)",
            color: colors.mutedText,
            maxWidth: 620,
            margin: "0 auto 44px",
            lineHeight: 1.75,
          }}
        >
          A declarative JSON transformation engine that reshapes complex data
          structures with nested resolution, type casting, recursion, and pure
          elegance.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 44,
          }}
        >
          <InstallBadge large />
          <a
            href="#playground"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 12,
              background: `linear-gradient(135deg, ${colors.gold}, ${colors.orange})`,
              color: colors.bg,
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 700,
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 36px rgba(212,168,67,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Try the Playground <ChevronRight size={16} />
          </a>
        </div>

        {/* Inline code preview */}
        <div
          style={{
            display: "inline-block",
            padding: "12px 24px",
            borderRadius: 10,
            background: "rgba(212,168,67,0.04)",
            border: `1px solid ${colors.border}`,
            fontFamily: fonts.mono,
            fontSize: 14,
            color: colors.mutedText,
          }}
        >
          <span style={{ color: colors.syntaxPurple }}>const</span> result ={" "}
          <span style={{ color: colors.goldBright }}>sculpt</span>.
          <span style={{ color: colors.syntaxBlue }}>data</span>({"{"}{" "}
          <span style={{ color: colors.syntaxGreen }}>data</span>,{" "}
          <span style={{ color: colors.syntaxGreen }}>to</span>: template{" "}
          {"}"});
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: 0.35,
        }}
      >
        <span
          style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: colors.mutedText }}
        >
          Scroll
        </span>
        <div
          style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${colors.gold}, transparent)` }}
        />
      </div>
    </section>
  );
};

export default Hero;
