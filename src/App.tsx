import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { CopyButton } from "./components/ui/copy-button";
import { TabSwitcher } from "./components/ui/tab-switcher";
import { AnimatedStars } from "./components/animations/stars";
import { FloatingParticles } from "./components/animations/particles";
import { JsonFormatter } from "./business/json-formatter";
import { TypescriptParser } from "./business/typescript-parser";

export type Tab = "json" | "typescript";

export default function App() {
  const [, setInputJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("json");
  const [finalData, setFinalData] = useState<string>("");

  const formatJson = (jsonString: string) => {
    if (!jsonString.trim()) {
      setFormattedJson("");
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(jsonString);
      setFormattedJson(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setFormattedJson("");
        setError("JSON inválido: " + e.message);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setInputJson(value);
    formatJson(value);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />

        <AnimatedStars />

        <FloatingParticles />

        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="flex flex-col md:flex-row gap-4 p-6 w-full max-w-6xl min-w-[400px] mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
          <div className="flex-1 flex flex-col gap-2">
            <textarea
              id="json-input"
              placeholder='Cole seu JSON aqui, ex: {"nome": "João", "idade": 30}'
              value={finalData}
              onChange={handleInputChange}
              className={`
                w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 max-h-[200px] min-h-[200px]
                bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500
                ${
                  error
                    ? "border-red-400 focus:ring-red-400"
                    : "border-white/30 focus:ring-blue-400"
                }
              `}
              aria-invalid={!!error}
              aria-describedby={error ? "json-input-error" : undefined}
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                id="json-input-error"
                className="text-red-400 text-sm bg-red-500/10 p-2 rounded border border-red-400/30"
              >
                {error}
              </motion.p>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="relative flex gap-2">
                <CopyButton
                  content={formattedJson}
                  disabled={!formattedJson}
                  text="Copiar"
                />
                <TabSwitcher tab={tab} setTab={setTab} />
              </div>
            </div>

            {tab === "json" && (
              <JsonFormatter data={formattedJson} setFinalData={setFinalData} />
            )}
            {tab === "typescript" && (
              <TypescriptParser
                data={formattedJson}
                setFinalData={setFinalData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
