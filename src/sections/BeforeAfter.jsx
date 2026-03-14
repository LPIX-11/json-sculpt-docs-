import { colors } from "../theme";
import SyntaxCode from "../components/SyntaxCode";
import { Section, SectionTitle } from "../components/Section";

const BEFORE = `// The old way — fragile & verbose
const name = res.data?.user?.profile?.name;
const email = res.data?.user?.contact?.email;
const city = res.data?.user?.address?.city;
const orders = res.data?.user?.orders?.map(o => ({
  id: o?.orderId,
  total: Number(o?.amount),
  items: o?.lineItems?.map(l => l?.name),
})) ?? [];
const primary = orders?.[0]?.id ?? "N/A";`;

const AFTER = `// The sculpt way — declarative & clean
const template = {
  name: "@link.user.profile.name",
  email: "@link.user.contact.email",
  city: "@link.user.address.city",
  orders: {
    $map: "@link.user.orders",
    $transform: {
      id: "@link.orderId",
      total: "@link.amount::number",
      items: {
        $map: "@link.lineItems",
        $extract: "@link.name"
      }
    }
  },
  primary: ["@link.user.orders.0.orderId", "N/A"]
};

const result = sculpt.data({ data: res.data, to: template });`;

function Panel({ label, labelColor, borderColor, barGradient, code }) {
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          padding: "8px 0",
          marginBottom: 12,
          color: labelColor,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          background: colors.bgPanel,
          border: `1px solid ${borderColor}`,
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 3,
            background: barGradient,
          }}
        />
        <SyntaxCode code={code} fontSize={12} />
      </div>
    </div>
  );
}

const BeforeAfter = () => (
  <Section id="comparison">
    <SectionTitle
      badge="The Problem"
      title="Stop Wrestling with JSON"
      sub="Replace brittle optional chaining with declarative templates. One template, infinite clarity."
    />
    <div
      className="grid-2"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
    >
      <Panel
        label="Before — Fragile & Ugly"
        labelColor={colors.syntaxRed}
        borderColor="rgba(241,148,138,0.15)"
        barGradient="linear-gradient(90deg, #e74c3c, #c0392b)"
        code={BEFORE}
      />
      <Panel
        label="After — Declarative & Clean"
        labelColor={colors.goldBright}
        borderColor={colors.border}
        barGradient={`linear-gradient(90deg, ${colors.gold}, ${colors.orange})`}
        code={AFTER}
      />
    </div>
  </Section>
);

export default BeforeAfter;
