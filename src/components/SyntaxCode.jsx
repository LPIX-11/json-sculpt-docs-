import React, { useMemo } from 'react';
import { colors, fonts } from '../theme';

export const SyntaxCode = ({ code, fontSize = 14 }) => {
  const syntaxHighlight = useMemo(() => {
    if (!code) return '';

    // Tokenize first, then colorize — avoids regex conflicts
    // between style attributes and code content.

    const tokens = [];
    let remaining = code;

    // 1. Extract strings and comments as protected tokens
    const tokenRegex = /(\/\/.*?(?=\n|$))|('(?:[^'\\]|\\.)*')|("(?:[^"\\]|\\.)*")|(`(?:[^`\\]|\\.)*`)/g;
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(code)) !== null) {
      // Push code before this token
      if (match.index > lastIndex) {
        tokens.push({ type: 'code', text: code.slice(lastIndex, match.index) });
      }

      if (match[1]) {
        tokens.push({ type: 'comment', text: match[0] });
      } else {
        tokens.push({ type: 'string', text: match[0] });
      }

      lastIndex = tokenRegex.lastIndex;
    }

    // Push remaining code
    if (lastIndex < code.length) {
      tokens.push({ type: 'code', text: code.slice(lastIndex) });
    }

    // Sculpt keywords
    const sculptKeywords = [
      '$map', '$transform', '$extract', '$spread',
      '$recursive', '$track', '$rename', '$op', '$from', '$args', '@link',
    ];

    // Regular keywords
    const keywords = ['const', 'let', 'var', 'import', 'export', 'from', 'function', 'return', 'if', 'else', 'new', 'typeof'];

    // Special values
    const specialValues = ['true', 'false', 'null', 'undefined'];

    // 2. Render each token
    return tokens.map((token) => {
      // Escape HTML in all tokens
      let t = token.text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      if (token.type === 'comment') {
        return `<span style='color:${colors.mutedText};font-style:italic'>${t}</span>`;
      }

      if (token.type === 'string') {
        return `<span style='color:${colors.syntaxGreen}'>${t}</span>`;
      }

      // Code tokens: highlight keywords, values, numbers
      // Sculpt keywords (bold gold)
      sculptKeywords.forEach((kw) => {
        const escaped = kw.replace(/[$@]/g, '\\$&');
        t = t.replace(
          new RegExp(`(${escaped}(?:\\.[\\w.]+)*)`, 'g'),
          `<span style='color:${colors.goldBright};font-weight:bold'>$1</span>`
        );
      });

      // Regular keywords (purple)
      keywords.forEach((kw) => {
        t = t.replace(
          new RegExp(`\\b(${kw})\\b`, 'g'),
          `<span style='color:${colors.syntaxPurple}'>$1</span>`
        );
      });

      // Special values (orange)
      specialValues.forEach((sv) => {
        t = t.replace(
          new RegExp(`\\b(${sv})\\b`, 'g'),
          `<span style='color:${colors.syntaxOrange}'>$1</span>`
        );
      });

      // Numbers (orange)
      t = t.replace(
        /\b(\d+\.?\d*|\.\d+)\b/g,
        `<span style='color:${colors.syntaxOrange}'>$1</span>`
      );

      return t;
    }).join('');
  }, [code]);

  const lines = code.split('\n');

  return (
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize,
        lineHeight: 1.6,
        color: colors.warmWhite,
        overflow: 'auto',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {lines.map((line, index) => (
            <tr key={index} style={{ display: 'flex' }}>
              <td
                style={{
                  color: colors.goldDim,
                  userSelect: 'none',
                  paddingRight: 16,
                  textAlign: 'right',
                  minWidth: 40,
                  opacity: 0.6,
                  fontWeight: 'bold',
                }}
              >
                {index + 1}
              </td>
              <td
                style={{
                  flex: 1,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: syntaxHighlight.split('\n')[index] || '',
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SyntaxCode;
