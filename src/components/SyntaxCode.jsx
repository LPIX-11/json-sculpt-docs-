import React, { useMemo } from 'react';
import { colors, fonts } from '../theme';

export const SyntaxCode = ({ code, fontSize = 14 }) => {
  const syntaxHighlight = useMemo(() => {
    if (!code) return '';

    // Sculpt keywords that get special highlighting
    const sculptKeywords = [
      '$map',
      '$transform',
      '$extract',
      '$spread',
      '$recursive',
      '$track',
      '$rename',
      '$op',
      '$from',
      '$args',
      '@link',
    ];

    // Regular keywords
    const keywords = ['const', 'let', 'var', 'import', 'export', 'from', 'function', 'return', 'if', 'else', 'new', 'typeof'];

    // Special values
    const specialValues = ['true', 'false', 'null', 'undefined'];

    let highlighted = code;

    // Escape HTML special chars first
    highlighted = highlighted
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
;

    // Highlight comments (must be before strings)
    highlighted = highlighted.replace(
      /\/\/.*?(?=\n|$)/g,
      (match) => `<span style="color: ${colors.mutedText}; font-style: italic;">${match}</span>`
    );

    // Highlight sculpt keywords (bold, bright gold)
    sculptKeywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword.replace(/[$/]/g, '\\$&')}\\b`, 'g');
      highlighted = highlighted.replace(
        regex,
        `<span style="color: ${colors.goldBright}; font-weight: bold;">${keyword}</span>`
      );
    });

    // Highlight regular keywords (purple)
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(
        regex,
        `<span style="color: ${colors.syntaxPurple};">${keyword}</span>`
      );
    });

    // Highlight special values (orange)
    specialValues.forEach((value) => {
      const regex = new RegExp(`\\b${value}\\b`, 'g');
      highlighted = highlighted.replace(
        regex,
        `<span style="color: ${colors.syntaxOrange};">${value}</span>`
      );
    });

    // Highlight strings (green)
    highlighted = highlighted.replace(
      /'([^'\\]|\\.)*'|"([^"\\]|\\.)*"|`([^`\\]|\\.)*`/g,
      (match) => `<span style="color: ${colors.syntaxGreen};">${match}</span>`
    );

    // Highlight numbers (orange)
    highlighted = highlighted.replace(
      /\b(\d+\.?\d*|\.\d+)\b/g,
      (match) => `<span style="color: ${colors.syntaxOrange};">${match}</span>`
    );

    return highlighted;
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
