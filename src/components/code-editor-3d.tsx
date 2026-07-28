"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/** Code lines to type — realistic Next.js + AI code */
const CODE_LINES: { text: string; tokens: { text: string; color: string }[] }[] = [
  {
    text: 'import { AI } from "@larawans/agent-sdk";',
    tokens: [
      { text: "import ", color: "#c678dd" },
      { text: "{ AI }", color: "#e5c07b" },
      { text: " from ", color: "#c678dd" },
      { text: '"@larawans/agent-sdk"', color: "#98c379" },
      { text: ";", color: "#abb2bf" },
    ],
  },
  {
    text: "",
    tokens: [],
  },
  {
    text: "export async function deployAgent() {",
    tokens: [
      { text: "export ", color: "#c678dd" },
      { text: "async ", color: "#c678dd" },
      { text: "function ", color: "#c678dd" },
      { text: "deployAgent", color: "#61afef" },
      { text: "()", color: "#abb2bf" },
      { text: " {", color: "#abb2bf" },
    ],
  },
  {
    text: '  const agent = new AI({',
    tokens: [
      { text: "  ", color: "#abb2bf" },
      { text: "const ", color: "#c678dd" },
      { text: "agent ", color: "#e5c07b" },
      { text: "= ", color: "#56b6c2" },
      { text: "new ", color: "#c678dd" },
      { text: "AI", color: "#61afef" },
      { text: "({", color: "#abb2bf" },
    ],
  },
  {
    text: '    model: "gpt-4o",',
    tokens: [
      { text: "    model", color: "#e06c75" },
      { text: ": ", color: "#56b6c2" },
      { text: '"gpt-4o"', color: "#98c379" },
      { text: ",", color: "#abb2bf" },
    ],
  },
  {
    text: '    context: "erp-software",',
    tokens: [
      { text: "    context", color: "#e06c75" },
      { text: ": ", color: "#56b6c2" },
      { text: '"erp-software"', color: "#98c379" },
      { text: ",", color: "#abb2bf" },
    ],
  },
  {
    text: "    memory: true,",
    tokens: [
      { text: "    memory", color: "#e06c75" },
      { text: ": ", color: "#56b6c2" },
      { text: "true", color: "#d19a66" },
      { text: ",", color: "#abb2bf" },
    ],
  },
  {
    text: "    tools: [search, analyze, deploy],",
    tokens: [
      { text: "    tools", color: "#e06c75" },
      { text: ": ", color: "#56b6c2" },
      { text: "[", color: "#abb2bf" },
      { text: "search", color: "#e5c07b" },
      { text: ", ", color: "#abb2bf" },
      { text: "analyze", color: "#e5c07b" },
      { text: ", ", color: "#abb2bf" },
      { text: "deploy", color: "#e5c07b" },
      { text: "],", color: "#abb2bf" },
    ],
  },
  {
    text: "  });",
    tokens: [
      { text: "  });", color: "#abb2bf" },
    ],
  },
  {
    text: "",
    tokens: [],
  },
  {
    text: "  await agent.train(dataset);",
    tokens: [
      { text: "  ", color: "#abb2bf" },
      { text: "await ", color: "#c678dd" },
      { text: "agent", color: "#e5c07b" },
      { text: ".", color: "#abb2bf" },
      { text: "train", color: "#61afef" },
      { text: "(", color: "#abb2bf" },
      { text: "dataset", color: "#e5c07b" },
      { text: ");", color: "#abb2bf" },
    ],
  },
  {
    text: "  const response = await agent.chat(prompt);",
    tokens: [
      { text: "  ", color: "#abb2bf" },
      { text: "const ", color: "#c678dd" },
      { text: "response ", color: "#e5c07b" },
      { text: "= ", color: "#56b6c2" },
      { text: "await ", color: "#c678dd" },
      { text: "agent", color: "#e5c07b" },
      { text: ".", color: "#abb2bf" },
      { text: "chat", color: "#61afef" },
      { text: "(", color: "#abb2bf" },
      { text: "prompt", color: "#e5c07b" },
      { text: ");", color: "#abb2bf" },
    ],
  },
  {
    text: "",
    tokens: [],
  },
  {
    text: "  return response.data;",
    tokens: [
      { text: "  ", color: "#abb2bf" },
      { text: "return ", color: "#c678dd" },
      { text: "response", color: "#e5c07b" },
      { text: ".", color: "#abb2bf" },
      { text: "data", color: "#e06c75" },
      { text: ";", color: "#abb2bf" },
    ],
  },
  {
    text: "}",
    tokens: [{ text: "}", color: "#abb2bf" }],
  },
];

/** Time per character when typing a line (ms) */
const CHAR_SPEED = 8;
/** Pause between lines (ms) */
const LINE_PAUSE = 60;
/** Pause after all lines typed, before restart (ms) */
const RESTART_PAUSE = 1500;
/** Max visible lines in the editor window */
const MAX_VISIBLE_LINES = 14;

export function CodeEditor3D() {
  const [visibleLines, setVisibleLines] = useState<
    { text: string; tokens: { text: string; color: string }[]; progress: number }[]
  >([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const tick = useCallback(() => {
    if (lineIndex >= CODE_LINES.length) {
      // All lines done — pause then restart
      timeoutRef.current = setTimeout(() => {
        setVisibleLines([]);
        setLineIndex(0);
        setCharIndex(0);
        setIsTyping(true);
      }, RESTART_PAUSE);
      return;
    }

    const line = CODE_LINES[lineIndex];
    const isBlank = line.text === "";

    if (isBlank) {
      // Blank line — skip instantly
      setVisibleLines((prev) => [
        ...prev.slice(-(MAX_VISIBLE_LINES - 1)),
        { text: "", tokens: [], progress: 1 },
      ]);
      setLineIndex((prev) => prev + 1);
      setCharIndex(0);
      timeoutRef.current = setTimeout(tick, LINE_PAUSE / 3);
      return;
    }

    if (isTyping) {
      if (charIndex <= line.text.length) {
        // Show partial tokens for current progress
        const partialTokens = getPartialTokens(line.tokens, charIndex);
        setVisibleLines((prev) => {
          const updated = [...prev];
          const lastLineIdx = updated.length - 1;
          if (lastLineIdx >= 0 && updated[lastLineIdx].text === line.text) {
            // Update existing line
            updated[lastLineIdx] = { text: line.text, tokens: partialTokens, progress: charIndex / line.text.length };
          } else {
            // New line — push
            updated.push({ text: line.text, tokens: partialTokens, progress: charIndex / line.text.length });
          }
          return updated.slice(-(MAX_VISIBLE_LINES - 1));
        });
        setCharIndex((prev) => prev + 1);
        // Vary speed slightly for natural feel
        timeoutRef.current = setTimeout(tick, CHAR_SPEED + Math.random() * 5);
      } else {
        // Line complete — move to next
        setVisibleLines((prev) => {
          const updated = [...prev];
          const lastLineIdx = updated.length - 1;
          if (lastLineIdx >= 0 && updated[lastLineIdx].text === line.text) {
            updated[lastLineIdx] = { text: line.text, tokens: line.tokens, progress: 1 };
          }
          return updated.slice(-(MAX_VISIBLE_LINES - 1));
        });
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
        timeoutRef.current = setTimeout(tick, LINE_PAUSE);
      }
    }
  }, [lineIndex, charIndex, isTyping]);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, 800); // Initial delay
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tick]);

  // Calculate scroll offset for when lines exceed max visible
  const totalLines = visibleLines.length;
  const scrollOffset = totalLines > MAX_VISIBLE_LINES ? totalLines - MAX_VISIBLE_LINES : 0;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[15%] z-[2] flex justify-center">
      <div className="w-[80%] max-w-4xl [perspective:1200px]">
        <div className="code-editor-3d rounded-xl border border-white/[0.08] bg-[#0d1117]/90 backdrop-blur-xl shadow-[0_0_80px_rgba(124,92,255,0.08),0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="ml-3 flex-1 rounded-md bg-white/[0.04] px-3 py-0.5 text-center">
              <span className="text-[10px] font-mono text-white/30">
                agent-sdk / deploy.ts
              </span>
            </div>
            <div className="flex gap-2 text-white/20">
              <span className="text-[10px]">TypeScript</span>
            </div>
          </div>

          {/* Code body */}
          <div className="overflow-hidden px-4 py-3">
            <div className="flex font-mono text-[12px] leading-6 sm:text-[13px] sm:leading-7">
              {/* Line numbers gutter */}
              <div className="mr-5 flex shrink-0 flex-col select-none text-right text-white/[0.12]">
                {Array.from({ length: MAX_VISIBLE_LINES }, (_, i) => (
                  <span key={i + 1 + scrollOffset}>{i + 1 + scrollOffset}</span>
                ))}
              </div>

              {/* Code content */}
              <div className="min-w-0 flex-1 overflow-hidden">
                {Array.from({ length: MAX_VISIBLE_LINES }, (_, i) => {
                  const line = visibleLines[i + scrollOffset];
                  if (!line) return <div key={i} className="h-[24px] sm:h-[28px]" />;

                  return (
                    <div key={i} className="whitespace-nowrap">
                      {line.tokens.map((token, ti) => (
                        <span key={ti} style={{ color: token.color }}>
                          {token.text}
                        </span>
                      ))}
                      {/* Blinking cursor on the current active line */}
                      {lineIndex < CODE_LINES.length &&
                        visibleLines.length > 0 &&
                        visibleLines[visibleLines.length - 1] === line &&
                        line.progress < 1 && (
                          <span className="code-editor-cursor" />
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Get tokens up to N characters into the full text */
function getPartialTokens(
  tokens: { text: string; color: string }[],
  charCount: number
): { text: string; color: string }[] {
  const result: { text: string; color: string }[] = [];
  let remaining = charCount;

  for (const token of tokens) {
    if (remaining <= 0) break;
    if (token.text.length <= remaining) {
      result.push(token);
      remaining -= token.text.length;
    } else {
      result.push({ text: token.text.slice(0, remaining), color: token.color });
      remaining = 0;
    }
  }
  return result;
}
