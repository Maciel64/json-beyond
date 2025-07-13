"use client";

import { motion } from "framer-motion";
import { generateInterfaces } from "../utils/generate-ts";

interface TypescriptParserProps {
  data: string;
  setFinalData: (data: string) => void;
  setError: (error: string | null) => void;
}

export function TypescriptParser({
  data,
  setFinalData,
  setError,
}: TypescriptParserProps) {
  const getTypescriptCode = () => {
    if (!data) return "";
    try {
      const interfaces = generateInterfaces(JSON.parse(data));
      setFinalData(interfaces);
      setError(null);
      return interfaces;
    } catch {
      setError("// Erro ao gerar interfaces TypeScript");
      return "// Erro ao gerar interfaces TypeScript";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full p-4 border-2 border-white/20 rounded-xl bg-black/20 backdrop-blur-md overflow-auto text-sm font-mono whitespace-pre-wrap break-words min-h-[220px] max-h-[220px] shadow-inner relative glass-scroll"
      role="textbox"
      aria-readonly="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      {data ? (
        <pre className="text-blue-300 leading-relaxed relative z-10">
          {getTypescriptCode()}
        </pre>
      ) : (
        <div className="flex items-center justify-center h-full">
          <motion.p
            className="text-white/40 text-center"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            As interfaces TypeScript serão geradas aqui...
          </motion.p>
        </div>
      )}

      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 opacity-50 pointer-events-none" />
    </motion.div>
  );
}
