import { colors } from "../theme";
import { Section } from "../components/Section";
import StatCounter from "../components/StatCounter";

const STATS = [
  { value: 0, suffix: " deps", label: "Dependencies" },
  { value: 3, suffix: " KB", label: "Bundle (gzip)" },
  { value: 7, suffix: "+", label: "Transform Modes" },
  { value: 100, suffix: "%", label: "Type Coverage" },
];

const Stats = () => (
  <Section>
    <div
      className="stats-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 24,
        padding: "48px 32px",
        background: colors.bgPanel,
        border: `1px solid ${colors.border}`,
        borderRadius: 24,
        backdropFilter: "blur(16px)",
      }}
    >
      {STATS.map((s) => (
        <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
      ))}
    </div>
  </Section>
);

export default Stats;
