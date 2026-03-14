import { useState, useEffect, useRef, useCallback } from "react";
import { Play, RotateCcw, Copy, Check, AlertTriangle, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { colors, fonts } from "../../theme";

/**
 * LiveExample — the heart of the docs.
 *
 * Runs the real sculpt engine in the browser and shows
 * Input → Template → Output with live updates, animations,
 * and full editability.
 *
 * Props:
 *   defaultInput    – JSON string for the input panel
 *   defaultTemplate – JS string for the template panel
 *   defaultOutput   – (optional) pre-computed fallback
 *   title           – heading shown above the example
 *   description     – paragraph below the heading
 *   autoRun         – run on mount (default true)
 *   compact         – smaller font / padding (default false)
 *   hideInput       – for operator demos where input is obvious
 */

// ── Syntax highlight a JSON / JS string for display ──
function highlight(code) {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(?:[^"\\]|\\.)*")/g,
      `<span style="color:${colors.syntaxGreen}">$1</span>`
    )
    .replace(
      /\b(true|false|null)\b/g,
      `<span style="color:${colors.syntaxOrange}">$1</span>`
    )
    .replace(
      /\b(\d+\.?\d*)\b/g,
      `<span style="color:${colors.syntaxOrange}">$1</span>`
    );
}

// ── Editable code panel ──
function CodePanel({ label, value, onChange, accent, readOnly = false, flash = false }) {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  const copy = () => {
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        animation: flash ? "popIn 0.35s ease-out" : "none",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 14px",
          background: "rgba(212,168,67,0.03)",
          borderBottom: `1px solid ${colors.border}`,
          borderRadius: "12px 12px 0 0",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            color: accent || colors.mutedText,
          }}
        >
          {label}
        </span>
        <button
          onClick={copy}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: colors.mutedText,
            display: "flex",
            alignItems: "center",
            padding: 2,
          }}
          title="Copy"
        >
          {copied ? <Check size={12} color={colors.syntaxGreen} /> : <Copy size={12} />}
        </button>
      </div>

      {/* Code area */}
      <div style={{ position: "relative", flex: 1 }}>
        {readOnly ? (
          <pre
            style={{
              margin: 0,
              padding: "16px 18px",
              fontFamily: fonts.mono,
              fontSize: 12.5,
              lineHeight: 1.7,
              color: colors.warmWhite,
              background: readOnly
                ? "rgba(125,206,160,0.02)"
                : "transparent",
              minHeight: 120,
              overflow: "auto",
              whiteSpace: "pre",
              borderRadius: "0 0 12px 12px",
            }}
            dangerouslySetInnerHTML={{ __html: highlight(value) }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
            style={{
              width: "100%",
              minHeight: 120,
              padding: "16px 18px",
              fontFamily: fonts.mono,
              fontSize: 12.5,
              lineHeight: 1.7,
              color: colors.warmWhite,
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "vertical",
              caretColor: colors.goldBright,
              borderRadius: "0 0 12px 12px",
            }}
          />
        )}
      </div>
    </div>
  );
}

export function LiveExample({
  defaultInput,
  defaultTemplate,
  defaultOutput = "",
  title,
  description,
  autoRun = true,
  compact = false,
  hideInput = false,
}) {
  const [input, setInput] = useState(defaultInput);
  const [template, setTemplate] = useState(defaultTemplate);
  const [output, setOutput] = useState(defaultOutput);
  const [error, setError] = useState(null);
  const [running, setRunning] = useState(false);
  const [flashOutput, setFlashOutput] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const runCount = useRef(0);

  // ── Run the sculpt engine ──
  const runSculpt = useCallback(async () => {
    setRunning(true);
    setError(null);
    runCount.current++;

    try {
      // Dynamic import of the real sculpt engine
      const { sculpt } = await import("../../lib/sculpt.js");

      // Parse input JSON
      let parsedInput;
      try {
        parsedInput = JSON.parse(input);
      } catch (e) {
        throw new Error(`Invalid input JSON: ${e.message}`);
      }

      // Parse template — we eval it as a JS object
      // (templates can have computed keys like [@link.x])
      let parsedTemplate;
      try {
        // Wrap in parens so JS interprets {} as object not block
        parsedTemplate = new Function(`return (${template})`)();
      } catch (e) {
        throw new Error(`Invalid template: ${e.message}`);
      }

      // Run sculpt
      const result = sculpt.data({ data: parsedInput, to: parsedTemplate });
      const formatted = JSON.stringify(result, null, 2) || "null";

      setOutput(formatted);
      setFlashOutput(true);
      setTimeout(() => setFlashOutput(false), 400);
    } catch (e) {
      setError(e.message);
      setOutput("");
    } finally {
      setRunning(false);
    }
  }, [input, template]);

  // Auto-run on mount
  useEffect(() => {
    if (autoRun) runSculpt();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset
  const reset = () => {
    setInput(defaultInput);
    setTemplate(defaultTemplate);
    setOutput(defaultOutput);
    setError(null);
  };

  return (
    <div
      style={{
        marginBottom: 48,
        borderRadius: 16,
        border: `1px solid ${colors.border}`,
        background: colors.bgPanel,
        backdropFilter: "blur(16px)",
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      {(title || description) && (
        <div
          style={{
            padding: "20px 24px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {title && (
              <h3
                style={{
                  color: colors.warmWhite,
                  fontSize: 16,
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                {title}
              </h3>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: "none",
                border: "none",
                color: colors.mutedText,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
              }}
            >
              {expanded ? "Collapse" : "Expand"}
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
          {description && (
            <p
              style={{
                color: colors.mutedText,
                fontSize: 13.5,
                lineHeight: 1.7,
                margin: "8px 0 0",
              }}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {expanded && (
        <>
          {/* Code panels */}
          <div
            style={{
              display: "flex",
              gap: 0,
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            {!hideInput && (
              <>
                <div
                  style={{
                    flex: 1,
                    borderRight: `1px solid ${colors.border}`,
                    minWidth: 0,
                  }}
                >
                  <CodePanel
                    label="Input Data"
                    value={input}
                    onChange={setInput}
                    accent={colors.syntaxBlue}
                  />
                </div>
              </>
            )}
            <div
              style={{
                flex: 1,
                borderRight: `1px solid ${colors.border}`,
                minWidth: 0,
              }}
            >
              <CodePanel
                label="Template"
                value={template}
                onChange={setTemplate}
                accent={colors.goldBright}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <CodePanel
                label="Output"
                value={output || (error ? "" : "// Click Run to transform")}
                readOnly
                accent={error ? colors.syntaxRed : colors.syntaxGreen}
                flash={flashOutput}
              />
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div
              style={{
                padding: "10px 20px",
                background: colors.errorBg,
                borderBottom: `1px solid rgba(241,148,138,0.15)`,
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12.5,
                color: colors.syntaxRed,
                fontFamily: fonts.mono,
                animation: "slideDown 0.25s ease-out",
              }}
            >
              <AlertTriangle size={14} />
              {error}
            </div>
          )}

          {/* Action bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              background: "rgba(212,168,67,0.02)",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={runSculpt}
                disabled={running}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 18px",
                  borderRadius: 8,
                  border: "none",
                  background: `linear-gradient(135deg, ${colors.gold}, ${colors.orange})`,
                  color: colors.bg,
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: running ? "wait" : "pointer",
                  transition: "all 0.2s",
                  opacity: running ? 0.7 : 1,
                }}
              >
                {running ? (
                  <Zap size={13} style={{ animation: "pulseGold 0.5s infinite" }} />
                ) : (
                  <Play size={13} fill={colors.bg} />
                )}
                {running ? "Running..." : "Run"}
              </button>
              <button
                onClick={reset}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "7px 14px",
                  borderRadius: 8,
                  border: `1px solid ${colors.border}`,
                  background: "transparent",
                  color: colors.mutedText,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <RotateCcw size={12} />
                Reset
              </button>
            </div>
            <span
              style={{
                fontSize: 11,
                color: colors.mutedText,
                opacity: 0.6,
                fontFamily: fonts.mono,
              }}
            >
              sculpt.data({"{ "}data, to: template{" }"})
            </span>
          </div>
        </>
      )}
    </div>
  );
}
