"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

interface JsonFormatterProps {
  data: string;
  setFinalData: (data: string) => void;
}

export function JsonFormatter({ data, setFinalData }: JsonFormatterProps) {
  useEffect(() => {
    setFinalData(data);
  }, [data, setFinalData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="
        w-full h-full p-4 border-2 border-white/20 rounded-xl 
        bg-black/20 backdrop-blur-md overflow-auto text-sm font-mono 
        whitespace-pre-wrap break-words min-h-[220px] max-h-[220px]
        shadow-inner relative
      "
      role="textbox"
      aria-readonly="true"
    >
      {/* Efeito de scan lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      {data ? (
        <pre className="text-green-300 leading-relaxed relative z-10">
          {data}
        </pre>
      ) : (
        <div className="flex items-center justify-center h-full">
          <motion.p
            className="text-white/40 text-center"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            O JSON formatado aparecerá aqui...
          </motion.p>
        </div>
      )}

      {/* Borda interna brilhante */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 opacity-50 pointer-events-none" />
    </motion.div>
  );
}
