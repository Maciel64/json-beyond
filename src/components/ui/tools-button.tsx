import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  WrenchIcon,
  ClockCounterClockwiseIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { HistoryModal } from "./history-modal";
import { GeneratorModal } from "./generator-modal";

interface ToolsButtonProps {
  onLoadFromHistory: (json: string) => void;
  onLoadGenerated: (json: string) => void;
}

export function ToolsButton({
  onLoadFromHistory,
  onLoadGenerated,
}: ToolsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  const tools = [
    {
      id: "history",
      icon: ClockCounterClockwiseIcon,
      label: "Histórico",
      description: "Ver JSONs copiados anteriormente",
      color: "from-purple-500 to-pink-500",
      onClick: () => {
        setShowHistory(true);
        setIsOpen(false);
      },
    },
    {
      id: "generator",
      icon: SparkleIcon,
      label: "Geração",
      description: "Gerar JSON aleatório",
      color: "from-emerald-500 to-cyan-500",
      onClick: () => {
        setShowGenerator(true);
        setIsOpen(false);
      },
    },
  ];

  return (
    <>
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-xl border shadow-lg overflow-hidden group bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border-indigo-400/30 text-indigo-200 hover:from-indigo-500/40 hover:to-purple-500/40 hover:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl pointer-events-none" />

          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 flex items-center gap-2">
            <motion.div
              animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <WrenchIcon className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-64 z-50"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent rounded-2xl" />

                <div className="relative z-10 p-3 space-y-2">
                  {tools.map((tool) => {
                    const IconComponent = tool.icon;

                    return (
                      <motion.button
                        key={tool.id}
                        onClick={tool.onClick}
                        className="w-full p-3 rounded-xl text-left transition-all duration-300 group relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl`}
                        />

                        <div className="relative z-10 flex items-start gap-3">
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-r ${tool.color} bg-opacity-20`}
                          >
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-white font-medium text-sm">
                              {tool.label}
                            </h3>
                            <p className="text-white/60 text-xs mt-1">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>

      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onLoadJson={onLoadFromHistory}
      />

      <GeneratorModal
        isOpen={showGenerator}
        onClose={() => setShowGenerator(false)}
        onGenerateJson={onLoadGenerated}
      />
    </>
  );
}
