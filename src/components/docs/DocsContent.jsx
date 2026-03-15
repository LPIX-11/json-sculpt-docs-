import { colors, fonts } from "../../theme";
import { LiveExample } from "./LiveExample";
import { Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";

// ── Styled section heading ──
function DocHeading({ id, children }) {
  return (
    <h2
      id={id}
      style={{
        fontSize: 28,
        fontWeight: 800,
        color: colors.warmWhite,
        marginBottom: 12,
        paddingTop: 32,
        letterSpacing: "-0.02em",
        scrollMarginTop: 24,
      }}
    >
      {children}
    </h2>
  );
}

function DocSubheading({ children }) {
  return (
    <h3
      style={{
        fontSize: 18,
        fontWeight: 700,
        color: colors.warmWhite,
        margin: "32px 0 12px",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h3>
  );
}

function DocParagraph({ children }) {
  return (
    <p
      style={{
        color: colors.mutedText,
        fontSize: 14.5,
        lineHeight: 1.8,
        marginBottom: 20,
        maxWidth: 720,
      }}
    >
      {children}
    </p>
  );
}

function InlineCode({ children }) {
  return (
    <code
      style={{
        background: "rgba(212,168,67,0.08)",
        border: `1px solid ${colors.border}`,
        borderRadius: 5,
        padding: "2px 7px",
        fontFamily: fonts.mono,
        fontSize: "0.88em",
        color: colors.goldBright,
      }}
    >
      {children}
    </code>
  );
}

function Tip({ children }) {
  return (
    <div
      style={{
        padding: "14px 18px",
        borderRadius: 10,
        border: `1px solid rgba(125,206,160,0.15)`,
        background: "rgba(125,206,160,0.04)",
        marginBottom: 24,
        fontSize: 13.5,
        lineHeight: 1.7,
        color: colors.mutedText,
      }}
    >
      <span style={{ color: colors.syntaxGreen, fontWeight: 700, marginRight: 6 }}>Tip:</span>
      {children}
    </div>
  );
}

function TypeBadge({ type }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 4,
        background: "rgba(212,168,67,0.08)",
        border: `1px solid ${colors.border}`,
        fontFamily: fonts.mono,
        fontSize: 11,
        color: colors.goldBright,
        fontWeight: 600,
        marginRight: 6,
      }}
    >
      {type}
    </span>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
        margin: "48px 0",
      }}
    />
  );
}

// ══════════════════════════════════════════
// All documentation sections
// ══════════════════════════════════════════
export function DocsContent() {
  return (
    <div style={{ maxWidth: 860, padding: "0 8px" }}>

      {/* ─── GETTING STARTED ─── */}
      <DocHeading id="getting-started">Getting Started</DocHeading>
      <DocParagraph>
        Install json-sculpt and transform your first JSON in under 30 seconds.
        Zero dependencies, works in Node.js and the browser.
      </DocParagraph>

      <div
        style={{
          padding: "16px 20px",
          borderRadius: 10,
          background: "rgba(212,168,67,0.04)",
          border: `1px solid ${colors.border}`,
          fontFamily: fonts.mono,
          fontSize: 14,
          color: colors.goldBright,
          marginBottom: 24,
        }}
      >
        $ npm install @sonatel-os/json-sculpt
      </div>

      <LiveExample
        title="Your first sculpt"
        description="Import sculpt, define a template, and transform. That's it."
        defaultInput={`{
  "user": {
    "name": "Awa Diop",
    "email": "awa@dakar.sn"
  },
  "address": {
    "city": "Dakar",
    "country": "Senegal"
  }
}`}
        defaultTemplate={`{
  "fullName": "@link.user.name",
  "mail": "@link.user.email",
  "location": "@link.address.city"
}`}
      />

      <Tip>
        Edit the input or template above and hit <strong>Run</strong> — the output updates live using the real sculpt engine.
      </Tip>

      <Divider />

      {/* ─── CORE API ─── */}
      <DocHeading id="core-api">Core API</DocHeading>
      <DocParagraph>
        The entire library exposes just two methods. Simple by design.
      </DocParagraph>

      <DocSubheading>sculpt.data(options)</DocSubheading>
      <DocParagraph>
        The main transformation function. Takes an object with <InlineCode>data</InlineCode> (your
        input — object or array) and <InlineCode>to</InlineCode> (the template defining the output
        shape). Returns the transformed result, or <InlineCode>null</InlineCode> on failure.
      </DocParagraph>

      <LiveExample
        title="sculpt.data() — Array input"
        description="When data is an array, sculpt applies the template to every item."
        defaultInput={`[
  { "person": { "name": "Moussa" }, "score": 95 },
  { "person": { "name": "Fatou" }, "score": 88 }
]`}
        defaultTemplate={`{
  "player": "@link.person.name",
  "points": "@link.score::number"
}`}
      />

      <DocSubheading>sculpt.registery(name, fn)</DocSubheading>
      <DocParagraph>
        Register a custom operator function that can be invoked with <InlineCode>$op</InlineCode> in
        templates. See the <InlineCode>Custom Operators</InlineCode> section for full details.
      </DocParagraph>

      <Divider />

      {/* ─── @link PATHS ─── */}
      <DocHeading id="link-paths">@link Paths</DocHeading>
      <DocParagraph>
        Use <InlineCode>@link.dot.notation</InlineCode> to extract values from any depth
        in the input data. No more optional chaining nightmares.
      </DocParagraph>

      <LiveExample
        title="Deep nested extraction"
        description="Reach into any level of nesting with dot notation."
        defaultInput={`{
  "company": {
    "department": {
      "team": {
        "lead": {
          "name": "Ibrahima",
          "title": "Principal Engineer"
        }
      }
    }
  }
}`}
        defaultTemplate={`{
  "leadName": "@link.company.department.team.lead.name",
  "leadTitle": "@link.company.department.team.lead.title"
}`}
      />

      <Tip>
        If a path doesn't exist, the value resolves to <InlineCode>undefined</InlineCode> —
        it won't throw. Combine with fallback chains for bulletproof extraction.
      </Tip>

      <Divider />

      {/* ─── TYPE CASTING ─── */}
      <DocHeading id="type-casting">Type Casting</DocHeading>
      <DocParagraph>
        Append <InlineCode>::type</InlineCode> to any <InlineCode>@link</InlineCode> path to cast
        the extracted value on the fly. Supported types: <InlineCode>string</InlineCode>,{" "}
        <InlineCode>number</InlineCode>, <InlineCode>boolean</InlineCode>,{" "}
        <InlineCode>date</InlineCode>, <InlineCode>array</InlineCode>,{" "}
        <InlineCode>object</InlineCode>.
      </DocParagraph>

      <LiveExample
        title="Type casting in action"
        description="Strings become numbers, booleans, dates — automatically."
        defaultInput={`{
  "profile": {
    "age": "28",
    "active": "true",
    "score": "99.5",
    "joined": "2024-03-15"
  }
}`}
        defaultTemplate={`{
  "age": "@link.profile.age::number",
  "isActive": "@link.profile.active::boolean",
  "score": "@link.profile.score::number",
  "joinDate": "@link.profile.joined::date"
}`}
      />

      <DocSubheading>Boolean casting rules</DocSubheading>
      <DocParagraph>
        Returns <InlineCode>true</InlineCode> for: <InlineCode>"yes"</InlineCode>,{" "}
        <InlineCode>1</InlineCode>, <InlineCode>"true"</InlineCode>, <InlineCode>true</InlineCode>.
        Everything else returns <InlineCode>false</InlineCode>.
      </DocParagraph>

      <LiveExample
        title="Boolean edge cases"
        description="Try changing the values to see how boolean casting behaves."
        defaultInput={`{
  "a": "yes",
  "b": 1,
  "c": "true",
  "d": "no",
  "e": 0,
  "f": "false",
  "g": ""
}`}
        defaultTemplate={`{
  "yes_str": "@link.a::boolean",
  "one_num": "@link.b::boolean",
  "true_str": "@link.c::boolean",
  "no_str": "@link.d::boolean",
  "zero_num": "@link.e::boolean",
  "false_str": "@link.f::boolean",
  "empty_str": "@link.g::boolean"
}`}
      />

      <Divider />

      {/* ─── $map & $transform ─── */}
      <DocHeading id="map-transform">$map &amp; $transform</DocHeading>
      <DocParagraph>
        Transform arrays of objects declaratively. <InlineCode>$map</InlineCode> points to the array,{" "}
        <InlineCode>$transform</InlineCode> defines the template for each item. Inside the transform,
        <InlineCode>@link</InlineCode> resolves relative to each array element.
      </DocParagraph>

      <LiveExample
        title="Array transformation"
        description="Each product gets reshaped independently."
        defaultInput={`{
  "store": "Marché Sandaga",
  "products": [
    { "name": "Thiéboudienne", "price": "2500", "available": true },
    { "name": "Yassa Poulet", "price": "3000", "available": false },
    { "name": "Mafé", "price": "2000", "available": true }
  ]
}`}
        defaultTemplate={`{
  "shop": "@link.store",
  "menu": {
    "$map": "@link.products",
    "$transform": {
      "dish": "@link.name",
      "cost": "@link.price::number",
      "inStock": "@link.available::boolean"
    }
  }
}`}
      />

      <DocSubheading>Nested $map</DocSubheading>
      <DocParagraph>
        You can nest <InlineCode>$map</InlineCode> operations inside each other
        for multi-level array transformations.
      </DocParagraph>

      <LiveExample
        title="Nested array mapping"
        description="Products with nested tag arrays, both mapped."
        defaultInput={`{
  "catalog": [
    {
      "title": "Laptop",
      "tags": [
        { "name": "electronics", "priority": "1" },
        { "name": "portable", "priority": "2" }
      ]
    },
    {
      "title": "Desk",
      "tags": [
        { "name": "furniture", "priority": "1" }
      ]
    }
  ]
}`}
        defaultTemplate={`{
  "items": {
    "$map": "@link.catalog",
    "$transform": {
      "product": "@link.title",
      "labels": {
        "$map": "@link.tags",
        "$transform": {
          "tag": "@link.name",
          "rank": "@link.priority::number"
        }
      }
    }
  }
}`}
      />

      <Divider />

      {/* ─── $map & $extract ─── */}
      <DocHeading id="map-extract">$map &amp; $extract</DocHeading>
      <DocParagraph>
        When you only need a flat array of single values from each item (not objects),
        use <InlineCode>$extract</InlineCode> instead of <InlineCode>$transform</InlineCode>.
      </DocParagraph>

      <LiveExample
        title="Extract flat arrays"
        description="Pull just the names into a simple string array."
        defaultInput={`{
  "team": [
    { "name": "Awa", "role": "dev" },
    { "name": "Moussa", "role": "design" },
    { "name": "Fatou", "role": "pm" }
  ]
}`}
        defaultTemplate={`{
  "names": {
    "$map": "@link.team",
    "$extract": "@link.name"
  },
  "roles": {
    "$map": "@link.team",
    "$extract": "@link.role"
  }
}`}
      />

      <Divider />

      {/* ─── $spread ─── */}
      <DocHeading id="spread">$spread</DocHeading>
      <DocParagraph>
        Flatten an array into a single object using <InlineCode>$spread</InlineCode>. Each
        array item contributes one key-value pair. Perfect for lookup tables,
        configuration objects, and route maps.
      </DocParagraph>

      <LiveExample
        title="Array to object with $spread"
        description="Endpoints become a route map. Dynamic keys from data."
        defaultInput={`{
  "api": "Teranga API",
  "endpoints": [
    { "route": "/users", "method": "GET" },
    { "route": "/orders", "method": "POST" },
    { "route": "/products", "method": "PUT" }
  ]
}`}
        defaultTemplate={`{
  "name": "@link.api",
  "routeMap": {
    "$map": "@link.endpoints",
    "$spread": {
      "@link.route": "@link.method"
    }
  }
}`}
      />

      <LiveExample
        title="Permission lookup table"
        description="Build a role→level map from an array."
        defaultInput={`{
  "roles": [
    { "name": "admin", "level": "3" },
    { "name": "editor", "level": "2" },
    { "name": "viewer", "level": "1" }
  ]
}`}
        defaultTemplate={`{
  "permissions": {
    "$map": "@link.roles",
    "$spread": {
      "@link.name": "@link.level::number"
    }
  }
}`}
      />

      <Divider />

      {/* ─── $recursive ─── */}
      <DocHeading id="recursive">$recursive</DocHeading>
      <DocParagraph>
        Handle tree structures of infinite depth with a single template.{" "}
        <InlineCode>$recursive</InlineCode> references itself to process children,
        grandchildren, and beyond. Use <InlineCode>$track</InlineCode> (prefixed
        with <InlineCode>#</InlineCode>) to specify the child array property,
        and <InlineCode>$rename</InlineCode> for the output key.
      </DocParagraph>

      <LiveExample
        title="Recursive tree transformation"
        description="A nested component tree, mapped with one template. Try adding deeper nesting!"
        defaultInput={`{
  "menu": [
    {
      "title": "Home",
      "path": "/",
      "items": [
        {
          "title": "Dashboard",
          "path": "/dashboard",
          "items": [
            { "title": "Analytics", "path": "/dashboard/analytics" }
          ]
        },
        { "title": "Profile", "path": "/profile" }
      ]
    },
    { "title": "About", "path": "/about" }
  ]
}`}
        defaultTemplate={`{
  "nav": {
    "$map": "@link.menu",
    "$transform": {
      "label": "@link.title",
      "url": "@link.path",
      "children": {
        "$recursive": {
          "$track": "#items",
          "$rename": "children",
          "$transform": {
            "label": "@link.title",
            "url": "@link.path"
          }
        }
      }
    }
  }
}`}
      />

      <Tip>
        The <InlineCode>$track</InlineCode> value must start with <InlineCode>#</InlineCode>{" "}
        followed by the property name that contains child arrays (e.g. <InlineCode>#items</InlineCode>,{" "}
        <InlineCode>#children</InlineCode>).
      </Tip>

      <Divider />

      {/* ─── FALLBACK CHAINS ─── */}
      <DocHeading id="fallbacks">Fallback Chains</DocHeading>
      <DocParagraph>
        Use an array of values to create a fallback chain. Sculpt tries each
        value in order and returns the first one that isn't <InlineCode>null</InlineCode> or{" "}
        <InlineCode>undefined</InlineCode>. Mix <InlineCode>@link</InlineCode> paths with
        static defaults.
      </DocParagraph>

      <LiveExample
        title="Graceful fallbacks"
        description="displayName is null, so it falls back to email. Try setting email to null too!"
        defaultInput={`{
  "user": {
    "displayName": null,
    "email": "moussa@thiès.sn",
    "id": "usr_42"
  }
}`}
        defaultTemplate={`{
  "label": [
    "@link.user.displayName",
    "@link.user.email",
    "@link.user.id",
    "Anonymous"
  ]
}`}
      />

      <Divider />

      {/* ─── DYNAMIC KEYS ─── */}
      <DocHeading id="dynamic-keys">Dynamic Keys</DocHeading>
      <DocParagraph>
        Object keys can be <InlineCode>@link</InlineCode> expressions. They're resolved
        at runtime from your data. Works at top-level, inside <InlineCode>$transform</InlineCode>,
        and inside <InlineCode>$spread</InlineCode>.
      </DocParagraph>

      <LiveExample
        title="Dynamic keys from data"
        description="The SKU becomes the key. Try changing the sku value!"
        defaultInput={`{
  "sku": "PROD-001",
  "name": "Wireless Mouse",
  "price": "29.99"
}`}
        defaultTemplate={`{
  "@link.sku": {
    "product": "@link.name",
    "cost": "@link.price::number"
  }
}`}
      />

      <Divider />

      {/* ─── CUSTOM OPERATORS ─── */}
      <DocHeading id="custom-ops">Custom Operators ($op)</DocHeading>
      <DocParagraph>
        Register your own transformation functions with{" "}
        <InlineCode>sculpt.registery(name, fn)</InlineCode> and invoke them in templates using{" "}
        <InlineCode>$op</InlineCode>. The function receives{" "}
        <InlineCode>(value, args, data, context)</InlineCode>.
      </DocParagraph>

      <DocSubheading>Using $op in templates</DocSubheading>
      <DocParagraph>
        Each <InlineCode>$op</InlineCode> block takes the operator name, <InlineCode>$from</InlineCode>{" "}
        for the source value, and optional <InlineCode>$args</InlineCode>.
      </DocParagraph>

      <LiveExample
        title="Built-in string operators"
        description="toUpperCase, toLowerCase, toTitleCase, toCamelCase — all built in."
        defaultInput={`{
  "product": {
    "name": "wireless bluetooth speaker",
    "code": "PRODUCT_CODE_123"
  }
}`}
        defaultTemplate={`{
  "title": {
    "$op": "toTitleCase",
    "$from": "@link.product.name"
  },
  "upper": {
    "$op": "toUpperCase",
    "$from": "@link.product.name"
  },
  "lower": {
    "$op": "toLowerCase",
    "$from": "@link.product.code"
  },
  "camel": {
    "$op": "toCamelCase",
    "$from": "@link.product.code"
  }
}`}
      />

      <Divider />

      {/* ─── BUILT-IN OPERATORS ─── */}
      <DocHeading id="builtin-ops">Built-in Operators</DocHeading>
      <DocParagraph>
        json-sculpt ships with 17 built-in operators across four categories.
        All are invoked via <InlineCode>$op</InlineCode>.
      </DocParagraph>

      <DocSubheading>Number &amp; Currency</DocSubheading>
      <LiveExample
        title="Number formatting & math"
        description="toFixed, formatNumber, formatCurrency, add, multiply."
        defaultInput={`{
  "price": 1299.956,
  "quantity": 3,
  "discount": 0.15
}`}
        defaultTemplate={`{
  "formatted": {
    "$op": "toFixed",
    "$from": "@link.price",
    "$args": { "decimals": 2 }
  },
  "localized": {
    "$op": "formatNumber",
    "$from": "@link.price",
    "$args": { "locale": "en-US" }
  },
  "currency": {
    "$op": "formatCurrency",
    "$from": "@link.price",
    "$args": { "currency": "USD" }
  },
  "withTax": {
    "$op": "add",
    "$from": "@link.price",
    "$args": { "amount": 100 }
  },
  "total": {
    "$op": "multiply",
    "$from": "@link.price",
    "$args": { "factor": 3 }
  }
}`}
      />

      <DocSubheading>Date &amp; Time</DocSubheading>
      <LiveExample
        title="Date formatting"
        description="formatDate, formatTime, timeAgo."
        defaultInput={`{
  "createdAt": "2024-06-15T10:30:00Z",
  "recentEvent": "2026-03-14T08:00:00Z"
}`}
        defaultTemplate={`{
  "date": {
    "$op": "formatDate",
    "$from": "@link.createdAt"
  },
  "time": {
    "$op": "formatTime",
    "$from": "@link.createdAt"
  },
  "ago": {
    "$op": "timeAgo",
    "$from": "@link.recentEvent"
  }
}`}
      />

      <DocSubheading>Array Operators</DocSubheading>
      <LiveExample
        title="Array manipulation"
        description="join, length, unique, first, last."
        defaultInput={`{
  "tags": ["react", "vue", "react", "svelte", "vue", "angular"],
  "scores": [95, 88, 72, 91, 85]
}`}
        defaultTemplate={`{
  "tagString": {
    "$op": "join",
    "$from": "@link.tags",
    "$args": { "separator": " | " }
  },
  "totalTags": {
    "$op": "length",
    "$from": "@link.tags"
  },
  "uniqueTags": {
    "$op": "unique",
    "$from": "@link.tags"
  },
  "topScore": {
    "$op": "first",
    "$from": "@link.scores"
  },
  "lastScore": {
    "$op": "last",
    "$from": "@link.scores"
  }
}`}
      />

      <Divider />

      {/* ─── ERROR HANDLING ─── */}
      <DocHeading id="error-handling">Error Handling</DocHeading>
      <DocParagraph>
        json-sculpt is designed to be resilient. Most errors produce warnings, not crashes.
      </DocParagraph>

      <DocSubheading>Missing paths</DocSubheading>
      <DocParagraph>
        If an <InlineCode>@link</InlineCode> path doesn't exist, the value is{" "}
        <InlineCode>undefined</InlineCode>. No error thrown. Use fallback chains
        for safety.
      </DocParagraph>

      <LiveExample
        title="Missing paths & type cast failures"
        description="Non-existent paths return undefined. Bad casts log warnings."
        defaultInput={`{
  "user": {
    "name": "Awa"
  }
}`}
        defaultTemplate={`{
  "name": "@link.user.name",
  "missingField": "@link.user.email",
  "deepMissing": "@link.user.address.city",
  "withFallback": ["@link.user.email", "no-email@default.com"]
}`}
      />

      <DocSubheading>Key rules</DocSubheading>
      <div
        style={{
          padding: "16px 20px",
          borderRadius: 10,
          border: `1px solid ${colors.border}`,
          background: "rgba(212,168,67,0.03)",
          marginBottom: 24,
          fontSize: 14,
          lineHeight: 2,
          color: colors.mutedText,
        }}
      >
        <div><InlineCode>Functions in templates</InlineCode> — Throws error. Use <InlineCode>$op</InlineCode> instead.</div>
        <div><InlineCode>Non-array with $map</InlineCode> — Returns empty array (or empty object for $spread).</div>
        <div><InlineCode>Unregistered $op</InlineCode> — Throws: "Operator not registered."</div>
        <div><InlineCode>Invalid type cast</InlineCode> — Logs warning, returns null.</div>
        <div><InlineCode>Empty fallback array</InlineCode> — Returns null.</div>
      </div>

      {/* Bottom spacer */}
      <div style={{ height: 120 }} />
    </div>
  );
}
