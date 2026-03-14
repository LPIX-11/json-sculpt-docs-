import { Zap, Layers, Puzzle, Repeat, GitBranch, Shield } from "lucide-react";
import { Section, SectionTitle } from "../components/Section";
import FeatureCard from "../components/FeatureCard";

const FEATURES = [
  { icon: Zap, title: "@link Paths", desc: "Dot-notation extraction from any depth. No more optional chaining nightmares. Just point and extract.", delay: 0 },
  { icon: Layers, title: "$map & $transform", desc: "Declarative array transformations with full template support inside each item. Nested maps? Easy.", delay: 80 },
  { icon: Puzzle, title: "$spread", desc: "Flatten mapped arrays into single objects with dynamic key-value pairs. Perfect for lookup tables.", delay: 160 },
  { icon: Repeat, title: "$recursive", desc: "Self-referencing templates for tree structures. Components, menus, org charts — infinite depth, one template.", delay: 240 },
  { icon: GitBranch, title: "Fallback Chains", desc: "Array-syntax resolution: try path A, then B, then a static default. Your data is always bulletproof.", delay: 320 },
  { icon: Shield, title: "Type Casting", desc: "Inline ::number, ::boolean, ::date, ::array casting. Your data, your types, guaranteed at transform time.", delay: 400 },
];

const Features = () => (
  <Section id="features">
    <SectionTitle
      badge="Features"
      title="Everything You Need, Nothing You Don't"
      sub="Zero dependencies. Tiny footprint. Massive capabilities."
    />
    <div
      className="grid-3"
      style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
    >
      {FEATURES.map((f) => (
        <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} delay={f.delay} />
      ))}
    </div>
  </Section>
);

export default Features;
