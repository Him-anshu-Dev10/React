import React, { useCallback, useEffect, useState } from "react";

// Tailwind tip (v4): ensure your index.css has: `@import "tailwindcss";`
// Then render <App /> in main.jsx as usual.
export default function App() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [randomStr, setRandomStr] = useState("");
  const [copied, setCopied] = useState(false);

  // Build the allowed character set
  const charset = useCallback(() => {
    let s = "";
    if (useUpper) s += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) s += "abcdefghijklmnopqrstuvwxyz";
    if (useDigits) s += "0123456789";
    if (useSymbols) s += "!@#$%^&*()-_=+[]{};:,.?/";
    return s;
  }, [useUpper, useLower, useDigits, useSymbols]);

  // Core generator (memoized with useCallback)
  const generate = useCallback(() => {
    const chars = charset();
    if (!chars) {
      setRandomStr("Select at least one character set");
      return;
    }

    const result = new Array(Number(length) || 0);

    // Prefer crypto for better randomness
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const max = 256 - (256 % chars.length); // avoid modulo bias
      const buf = new Uint8Array(result.length * 2); // allocate a bit extra
      crypto.getRandomValues(buf);
      let j = 0;
      for (let i = 0; i < buf.length && j < result.length; i++) {
        const v = buf[i];
        if (v < max) {
          result[j++] = chars[v % chars.length];
        }
      }
      if (j < result.length) {
        // Fallback fill if not enough (very unlikely)
        for (; j < result.length; j++) {
          const v = Math.floor(Math.random() * chars.length);
          result[j] = chars[v];
        }
      }
    } else {
      // Fallback to Math.random
      for (let i = 0; i < result.length; i++) {
        const v = Math.floor(Math.random() * chars.length);
        result[i] = chars[v];
      }
    }

    setRandomStr(result.join(""));
  }, [charset, length]);

  // Generate once on mount (useEffect)
  useEffect(() => {
    generate();
  }, [generate]);

  // Reset copied state when string changes
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(randomStr);
      setCopied(true);
    } catch (e) {
      setCopied(false);
      console.error("Clipboard error", e);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-indigo-750 via-blue-500 to-blue-700 flex items-center justify-center p-4">
      <div className=" ml-4 w-full max-w-full bg-white/90 backdrop-blur rounded-4xl shadow-xl p-6 md:p-8">
        <header className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            🔐 Random String Generator
          </h1>
          <button
            onClick={generate}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-black hover:bg-indigo-700 active:scale-[.98] transition"
          >
            Generate
          </button>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <section className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Length</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={4}
                  max={64}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full"
                />
                <input
                  type="number"
                  min={1}
                  max={256}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-20 px-2 py-1 border rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={useUpper}
                  onChange={(e) => setUseUpper(e.target.checked)}
                />
                Uppercase (A-Z)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={useLower}
                  onChange={(e) => setUseLower(e.target.checked)}
                />
                Lowercase (a-z)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={useDigits}
                  onChange={(e) => setUseDigits(e.target.checked)}
                />
                Digits (0-9)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={(e) => setUseSymbols(e.target.checked)}
                />
                Symbols (!@#$…)
              </label>
            </div>

            <p className="text-xs text-gray-600">
              Tip: Use a mix of upper/lower/digits/symbols for stronger strings.
            </p>
          </section>

          {/* Output */}
          <section className="flex flex-col gap-3">
            <label className="block text-sm font-medium">
              Generated String
            </label>
            <div className="flex items-stretch gap-2">
              <input
                readOnly
                value={randomStr}
                className="flex-1 px-3 py-3 border rounded-xl font-mono text-sm overflow-x-auto "
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 rounded-xl border hover:bg-gray-50 active:scale-[.98]"
                title="Copy to clipboard"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
