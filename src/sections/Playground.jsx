import { useState } from "react";
import { ArrowRight, Zap, Code2, Sparkles, Check } from "lucide-react";
import { colors } from "../theme";
import { Section, SectionTitle } from "../components/Section";
import AdinkraPattern from "../components/AdinkraPattern";
import CodeBlock from "../components/CodeBlock";

const EXAMPLES = [
  {
    name: "Basic Mapping",
    input: `{\n  "user": {\n    "name": "Awa",\n    "email": "awa@dakar.sn"\n  },\n  "address": {\n    "city": "Dakar",\n    "country": "Senegal"\n  }\n}`,
    template: `{\n  "fullName": "@link.user.name",\n  "mail": "@link.user.email",\n  "location": "@link.address.city"\n}`,
    output: `{\n  "fullName": "Awa",\n  "mail": "awa@dakar.sn",\n  "location": "Dakar"\n}`,
  },
  {
    name: "$map + $transform",
    input: `{\n  "store": "Marché Sandaga",\n  "products": [\n    { "name": "Thiéboudienne",\n      "price": "2500",\n      "available": true },\n    { "name": "Yassa Poulet",\n      "price": "3000",\n      "available": false }\n  ]\n}`,
    template: `{\n  "shop": "@link.store",\n  "menu": {\n    "$map": "@link.products",\n    "$transform": {\n      "dish": "@link.name",\n      "cost": "@link.price::number",\n      "inStock": "@link.available::boolean"\n    }\n  }\n}`,
    output: `{\n  "shop": "Marché Sandaga",\n  "menu": [\n    { "dish": "Thiéboudienne",\n      "cost": 2500,\n      "inStock": true },\n    { "dish": "Yassa Poulet",\n      "cost": 3000,\n      "inStock": false }\n  ]\n}`,
  },
  {
    name: "$spread + Dynamic Keys",
    input: `{\n  "name": "Teranga API",\n  "endpoints": [\n    { "route": "/users",\n      "method": "GET" },\n    { "route": "/orders",\n      "method": "POST" }\n  ]\n}`,
    template: `{\n  "api": "@link.name",\n  "routes": {\n    "$map": "@link.endpoints",\n    "$spread": {\n      "@link.route": "@link.method"\n    }\n  }\n}`,
    output: `{\n  "api": "Teranga API",\n  "routes": {\n    "/users": "GET",\n    "/orders": "POST"\n  }\n}`,
  },
  {
    name: "Fallback Chains",
    input: `{\n  "user": {\n    "displayName": null,\n    "email": "moussa@thiès.sn"\n  }\n}`,
    template: `{\n  "label": [\n    "@link.user.displayName",\n    "@link.user.email",\n    "Anonymous"\n  ]\n}`,
    output: `{\n  "label": "moussa@thiès.sn"\n}`,
  },
];

function ArrowDivider({ icon: Icon, delayMs = 0 }) {
  return (
    <div className="playground-arrow" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: 42, height: 42, borderRadius: "50%",
          border: `2px solid ${colors.gold}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "pulseGold 2.5s ease-in-out infinite",
          animationDelay: `${delayMs}ms`,
          flexShrink: 0,
        }}
      >
        <Icon size={18} color={colors.goldBright} />
      </div>
    </div>
  );
}

const Playground = () => {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const ex = EXAMPLES[active];

  const switchTo = (i) => { setActive(i); setAnimKey((k) => k + 1); };

  return (
    <section id="playground" style={{ position: "relative", overflow: "hidden" }}>
      <AdinkraPattern opacity={0.025} />
      <Section style={{ position: "relative", zIndex: 1 }}>
        <SectionTitle badge="Interactive" title="The Playground" sub="See the transformation happen. Input → Template → Output." />

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap", justifyContent: "center" }}>
          {EXAMPLES.map((e, i) => (
            <button
              key={i}
              onClick={() => switchTo(i)}
              style={{
                padding: "8px 20px", borderRadius: 100,
                border: `1px solid ${i === active ? colors.gold : colors.border}`,
                background: i === active ? "rgba(212,168,67,0.1)" : "transparent",
                color: i === active ? colors.goldBright : colors.mutedText,
                fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.25s",
              }}
            >
              {e.name}
            </button>
          ))}
        </div>

        {/* Code panels */}
        <div
          key={animKey}
          className="playground-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 16, alignItems: "stretch" }}
        >
          <div style={{ minWidth: 0 }}>
            <CodeBlock title="input.json" code={ex.input} icon={Code2} fontSize={12} />
          </div>
          <ArrowDivider icon={ArrowRight} />
          <div style={{ minWidth: 0 }}>
            <CodeBlock title="template.js" code={ex.template} icon={Sparkles} delay={120} fontSize={12} />
          </div>
          <ArrowDivider icon={Zap} delayMs={400} />
          <div style={{ minWidth: 0 }}>
            <CodeBlock title="output.json" code={ex.output} icon={Check} delay={240} fontSize={12} />
          </div>
        </div>
      </Section>
    </section>
  );
};

export default Playground;
