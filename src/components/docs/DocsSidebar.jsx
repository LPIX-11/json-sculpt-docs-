import { useState } from "react";
import { colors, fonts } from "../../theme";
import {
  BookOpen,
  Zap,
  Hash,
  Layers,
  Puzzle,
  Repeat,
  GitBranch,
  Shield,
  Key,
  Wrench,
  Box,
  AlertCircle,
  ChevronRight,
  Home,
} from "lucide-react";

export const DOC_SECTIONS = [
  { id: "getting-started", label: "Getting Started", icon: BookOpen },
  { id: "core-api", label: "Core API", icon: Box },
  { id: "link-paths", label: "@link Paths", icon: Hash },
  { id: "type-casting", label: "Type Casting", icon: Shield },
  { id: "map-transform", label: "$map & $transform", icon: Layers },
  { id: "map-extract", label: "$map & $extract", icon: Zap },
  { id: "spread", label: "$spread", icon: Puzzle },
  { id: "recursive", label: "$recursive", icon: Repeat },
  { id: "fallbacks", label: "Fallback Chains", icon: GitBranch },
  { id: "dynamic-keys", label: "Dynamic Keys", icon: Key },
  { id: "custom-ops", label: "Custom Operators", icon: Wrench },
  { id: "builtin-ops", label: "Built-in Operators", icon: Box },
  { id: "error-handling", label: "Error Handling", icon: AlertCircle },
];

export function DocsSidebar({ activeSection, onNavigate }) {
  return (
    <aside
      className="docs-sidebar"
      style={{
        width: 260,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        borderRight: `1px solid ${colors.border}`,
        background: colors.bgSidebar,
        padding: "24px 0",
        flexShrink: 0,
      }}
    >
      {/* Logo / back */}
      <a
        href="#/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 20px 20px",
          textDecoration: "none",
          borderBottom: `1px solid ${colors.border}`,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.orange})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 11,
            color: colors.bg,
            fontFamily: fonts.mono,
          }}
        >
          {"{ }"}
        </div>
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: colors.warmWhite,
            }}
          >
            json<span style={{ color: colors.goldBright }}>Sculpt</span>
          </div>
          <div
            style={{
              fontSize: 10,
              color: colors.mutedText,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Documentation
          </div>
        </div>
      </a>

      {/* Back to home link */}
      <a
        href="#/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 20px",
          margin: "0 12px 12px",
          borderRadius: 8,
          textDecoration: "none",
          color: colors.mutedText,
          fontSize: 12.5,
          fontWeight: 500,
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = colors.goldBright;
          e.currentTarget.style.background = "rgba(212,168,67,0.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = colors.mutedText;
          e.currentTarget.style.background = "transparent";
        }}
      >
        <Home size={13} />
        Back to Home
      </a>

      {/* Section links */}
      <nav style={{ padding: "0 12px" }}>
        {DOC_SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "9px 12px",
                marginBottom: 2,
                borderRadius: 8,
                border: "none",
                background: isActive
                  ? "rgba(212,168,67,0.1)"
                  : "transparent",
                color: isActive ? colors.goldBright : colors.mutedText,
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
                fontFamily: fonts.sans,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(212,168,67,0.05)";
                  e.currentTarget.style.color = colors.warmWhite;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = colors.mutedText;
                }
              }}
            >
              <Icon size={14} style={{ opacity: isActive ? 1 : 0.5, flexShrink: 0 }} />
              <span>{section.label}</span>
              {isActive && (
                <ChevronRight
                  size={12}
                  style={{ marginLeft: "auto", opacity: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Version badge */}
      <div
        style={{
          margin: "24px 20px 0",
          padding: "10px 14px",
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
          background: "rgba(212,168,67,0.03)",
          fontSize: 11,
          color: colors.mutedText,
          fontFamily: fonts.mono,
        }}
      >
        v1.3.0 · MIT · 0 deps
      </div>
    </aside>
  );
}
