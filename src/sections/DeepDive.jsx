import { Code2 } from "lucide-react";
import { colors } from "../theme";
import { useInView } from "../hooks/useInView";
import { Section, SectionTitle } from "../components/Section";
import AdinkraPattern from "../components/AdinkraPattern";
import CodeBlock from "../components/CodeBlock";

function FeatureDeepDive({ badge, title, description, code, reversed = false }) {
  const [ref, inView] = useInView({ threshold: 0.12 });

  return (
    <div
      ref={ref}
      className="deep-dive-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 48,
        alignItems: "center",
        marginBottom: 80,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : `translateX(${reversed ? "30px" : "-30px"})`,
        transition: "all 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div style={{ order: reversed ? 2 : 1 }}>
        <div
          style={{
            display: "inline-block",
            padding: "4px 14px",
            borderRadius: 6,
            background: "rgba(212,168,67,0.08)",
            border: `1px solid ${colors.border}`,
            color: colors.gold,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          {badge}
        </div>
        <h3
          style={{
            color: colors.warmWhite,
            fontSize: "clamp(22px, 3vw, 28px)",
            fontWeight: 800,
            margin: "0 0 16px",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
        <p style={{ color: colors.mutedText, fontSize: 15, lineHeight: 1.8, margin: 0 }}>
          {description}
        </p>
      </div>
      <div style={{ order: reversed ? 1 : 2 }}>
        <CodeBlock title="example.js" code={code} icon={Code2} fontSize={12} />
      </div>
    </div>
  );
}

const DIVES = [
  {
    badge: "Paths & Casting", title: "Extract & Cast in One Step",
    description: "Use @link.dot.notation to reach into any depth. Append ::type to cast on the fly. Strings become numbers, dates, booleans — automatically and safely.",
    code: `const template = {\n  name: "@link.user.profile.fullName",\n  age: "@link.user.profile.age::number",\n  active: "@link.user.flags.isActive::boolean",\n  joined: "@link.user.meta.createdAt::date",\n};\n\n// Input: { user: { profile: { fullName: "Awa Diop",\n//   age: "28" }, flags: { isActive: "true" },\n//   meta: { createdAt: "2024-01-15" } } }\n// Output: { name: "Awa Diop", age: 28,\n//   active: true, joined: Date("2024-01-15") }`,
  },
  {
    badge: "$map + $transform", title: "Reshape Arrays Declaratively", reversed: true,
    description: "Transform arrays of objects with full template power. Each item gets its own mapping context. Use $extract for flat value arrays.",
    code: `const template = {\n  storeName: "@link.name",\n  catalog: {\n    $map: "@link.products",\n    $transform: {\n      item: "@link.title",\n      price: "@link.cost::number",\n      tags: {\n        $map: "@link.labels",\n        $extract: "@link.name"\n      }\n    }\n  }\n};`,
  },
  {
    badge: "$spread", title: "Flatten Into Objects",
    description: "Turn arrays into key-value objects with dynamic keys. Perfect for lookup tables, route maps, and configuration objects.",
    code: `const template = {\n  permissions: {\n    $map: "@link.roles",\n    $spread: {\n      "@link.roleName": "@link.level::number"\n    }\n  }\n};\n\n// Input: { roles: [\n//   { roleName: "admin", level: "3" },\n//   { roleName: "editor", level: "2" }\n// ]}\n// Output: { permissions: { admin: 3, editor: 2 } }`,
  },
  {
    badge: "$recursive", title: "Infinite Depth. One Template.", reversed: true,
    description: "Handle tree structures like component hierarchies, nested menus, or org charts. The template references itself, sculpting every level.",
    code: `const template = {\n  nav: {\n    $map: "@link.menu",\n    $transform: {\n      label: "@link.title",\n      url: "@link.path",\n      children: {\n        $recursive: {\n          $track: "#items",\n          $rename: "children",\n          label: "@link.title",\n          url: "@link.path"\n        }\n      }\n    }\n  }\n};`,
  },
  {
    badge: "$op — Custom Operators", title: "Extend Without Limits",
    description: "Register your own transformation functions and invoke them declaratively inside templates. The ultimate escape hatch.",
    code: `// Register a custom operator\nsculpt.registery("uppercase", (value) => {\n  return value?.toUpperCase();\n});\n\n// Use it in templates\nconst template = {\n  title: {\n    $op: "uppercase",\n    $from: "@link.product.name"\n  },\n  slug: {\n    $op: "slugify",\n    $from: "@link.product.name",\n    $args: { separator: "-" }\n  }\n};`,
  },
];

const DeepDive = () => (
  <section id="deep-dive" style={{ position: "relative" }}>
    <AdinkraPattern opacity={0.02} />
    <Section style={{ position: "relative", zIndex: 1 }}>
      <SectionTitle badge="Deep Dive" title="Master Every Feature" sub="From basic paths to recursive trees — learn it all." />
      {DIVES.map((d) => (
        <FeatureDeepDive key={d.badge} {...d} />
      ))}
    </Section>
  </section>
);

export default DeepDive;
