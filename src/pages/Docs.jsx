import { useState, useEffect, useCallback } from "react";
import { colors } from "../theme";
import { DocsSidebar, DOC_SECTIONS } from "../components/docs/DocsSidebar";
import { DocsContent } from "../components/docs/DocsContent";

export function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  // Scroll to section and update active state
  const navigateTo = useCallback((sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const ids = DOC_SECTIONS.map((s) => s.id);

    const onScroll = () => {
      const scrollY = window.scrollY + 80;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="docs-layout"
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        minHeight: "100vh",
        background: colors.bg,
      }}
    >
      <DocsSidebar activeSection={activeSection} onNavigate={navigateTo} />
      <main
        style={{
          padding: "40px 48px",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <DocsContent />
      </main>
    </div>
  );
}
