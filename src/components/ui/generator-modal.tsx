import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XIcon,
  SparkleIcon,
  DiceOneIcon,
  ListBulletsIcon,
  BracketsCurlyIcon,
} from "@phosphor-icons/react";
import { generateRandomJson } from "../../utils/generate-json";

interface GeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateJson: (json: string) => void;
}

export function GeneratorModal({
  isOpen,
  onClose,
  onGenerateJson,
}: GeneratorModalProps) {
  const [baseType, setBaseType] = useState<"object" | "array">("object");
  const [complexity, setComplexity] = useState<"simple" | "medium" | "complex">(
    "medium"
  );
  const [itemCount, setItemCount] = useState(5);

  const handleGenerate = () => {
    const generatedJson = generateRandomJson(baseType, complexity, itemCount);
    onGenerateJson(JSON.stringify(generatedJson, null, 2));
    onClose();
  };

  const baseTypeOptions = [
    {
      id: "object" as const,
      icon: BracketsCurlyIcon,
      label: "Objeto",
      description: "Gerar um objeto JSON",
      example: '{ "key": "value" }',
    },
    {
      id: "array" as const,
      icon: ListBulletsIcon,
      label: "Array",
      description: "Gerar um array JSON",
      example: '[{ "item": 1 }]',
    },
  ];

  const complexityOptions = [
    {
      id: "simple" as const,
      label: "Simples",
      description: "Apenas tipos básicos",
    },
    {
      id: "medium" as const,
      label: "Médio",
      description: "Objetos aninhados",
    },
    {
      id: "complex" as const,
      label: "Complexo",
      description: "Arrays e objetos profundos",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-xl border border-white/20 shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />

            <div className="relative z-10 p-6 max-h-[100vh] overflow-y-auto glass-scroll">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20">
                    <SparkleIcon className="w-6 h-6 text-emerald-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Gerador de JSON
                    </h2>
                    <p className="text-white/60 text-sm">
                      Configure e gere dados aleatórios
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <XIcon className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-3">Tipo Base</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {baseTypeOptions.map((option) => {
                      const IconComponent = option.icon;
                      const isSelected = baseType === option.id;

                      return (
                        <motion.button
                          key={option.id}
                          onClick={() => setBaseType(option.id)}
                          className={`
                            p-4 rounded-xl border transition-all duration-300 text-left
                            ${
                              isSelected
                                ? "border-emerald-400/50 bg-emerald-500/20"
                                : "border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10"
                            }
                          `}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <IconComponent
                              className={`w-5 h-5 ${
                                isSelected
                                  ? "text-emerald-300"
                                  : "text-white/60"
                              }`}
                            />
                            <span
                              className={`font-medium ${
                                isSelected ? "text-emerald-300" : "text-white"
                              }`}
                            >
                              {option.label}
                            </span>
                          </div>
                          <p className="text-white/60 text-xs mb-2">
                            {option.description}
                          </p>
                          <code className="text-xs text-white/40 font-mono">
                            {option.example}
                          </code>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">Complexidade</h3>
                  <div className="space-y-2">
                    {complexityOptions.map((option) => {
                      const isSelected = complexity === option.id;

                      return (
                        <motion.button
                          key={option.id}
                          onClick={() => setComplexity(option.id)}
                          className={`
                            w-full p-3 rounded-xl border transition-all duration-300 text-left
                            ${
                              isSelected
                                ? "border-blue-400/50 bg-blue-500/20"
                                : "border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10"
                            }
                          `}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span
                                className={`font-medium ${
                                  isSelected ? "text-blue-300" : "text-white"
                                }`}
                              >
                                {option.label}
                              </span>
                              <p className="text-white/60 text-xs mt-1">
                                {option.description}
                              </p>
                            </div>
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-blue-400" />
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">
                    Quantidade de itens:{" "}
                    <span className="text-cyan-300">{itemCount}</span>
                  </h3>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={itemCount}
                    onChange={(e) => setItemCount(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-white/40 mt-1">
                    <span>1</span>
                    <span>20</span>
                  </div>
                </div>

                <motion.button
                  onClick={handleGenerate}
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 border border-emerald-400/30 text-emerald-200 hover:from-emerald-500/40 hover:to-cyan-500/40 hover:text-white transition-all duration-300 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <DiceOneIcon className="w-5 h-5" />
                    Gerar JSON
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
