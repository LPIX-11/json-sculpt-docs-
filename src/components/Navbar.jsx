import { useState, useEffect } from "react";
import { colors, fonts } from "../theme";

const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Playground", href: "#playground" },
  { label: "Deep Dive", href: "#deep-dive" },
  { label: "Docs", href: "#/docs" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 32px",
        height: 64,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(6,6,14,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "none",
        borderBottom: scrolled
          ? `1px solid ${colors.border}`
          : "1px solid transparent",
        transition: "all 0.35s ease",
      }}
    >
      <a
        href="#/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.orange})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 14,
            color: colors.bg,
            fontFamily: fonts.mono,
          }}
        >
          {"{ }"}
        </div>
        <span style={{ fontSize: 17, fontWeight: 800, color: colors.warmWhite }}>
          json<span style={{ color: colors.goldBright }}>Sculpt</span>
        </span>
      </a>

      <div
        className="nav-links"
        style={{ display: "flex", gap: 28, alignItems: "center" }}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            style={{
              color: colors.mutedText,
              textDecoration: "none",
              fontSize: 13,
              fontWeight: item.label === "Docs" ? 600 : 500,
              letterSpacing: 0.3,
              transition: "color 0.2s",
              padding: "6px 0",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = colors.goldBright)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = colors.mutedText)
            }
          >
            {item.label}
          </a>
        ))}
        <a
          href="https://www.npmjs.com/package/@sonatel-os/json-sculpt"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "8px 20px",
            borderRadius: 10,
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.orange})`,
            color: colors.bg,
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 700,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.85";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
