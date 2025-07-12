"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CopyIcon, CheckIcon } from "@phosphor-icons/react";

interface CopyButtonProps {
  content: string;
  disabled?: boolean;
  text: string;
}

export function CopyButton({ content, disabled, text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const handleCopy = async () => {
    if (!content || disabled) return;

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      disabled={disabled}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
        backdrop-blur-md border shadow-lg relative overflow-hidden group
        ${
          disabled
            ? "bg-gray-500/20 text-gray-400 cursor-not-allowed border-gray-500/20"
            : copied
            ? "bg-green-500/20 text-green-300 border-green-400/30"
            : error
            ? "bg-red-500/20 text-red-300 border-red-400/30"
            : "bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/30 hover:text-white"
        }
      `}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {/* Efeito de brilho no hover */}
      {!disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      <div className="relative z-10 flex items-center gap-2">
        <motion.div
          animate={copied ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {copied ? (
            <CheckIcon className="w-4 h-4" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </motion.div>

        <span className="text-sm">
          {copied ? "Copiado!" : error ? "Erro!" : text}
        </span>
      </div>
    </motion.button>
  );
}
