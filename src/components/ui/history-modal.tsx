import { motion, AnimatePresence } from "framer-motion";
import { XIcon, CopyIcon, TrashIcon, ClockIcon } from "@phosphor-icons/react";
import { useJsonHistory } from "../../hooks/use-json-history";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadJson: (json: string) => void;
}

export function HistoryModal({
  isOpen,
  onClose,
  onLoadJson,
}: HistoryModalProps) {
  const { history, clearHistory, removeFromHistory } = useJsonHistory();

  const handleLoadJson = (json: string) => {
    onLoadJson(json);
    onClose();
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateJson = (json: string, maxLength = 100) => {
    if (json.length <= maxLength) return json;
    return json.substring(0, maxLength) + "...";
  };

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
            className="relative w-full max-w-2xl z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-xl border border-white/20 shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />

            <div className="relative z-10 p-6 flex flex-col overflow-y-auto glass-scroll max-h-[100vh]">
              <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                    <ClockIcon className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Histórico de JSONs
                    </h2>
                    <p className="text-white/60 text-sm">
                      {history.length} itens salvos
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {history.length > 0 && (
                    <motion.button
                      onClick={clearHistory}
                      className="p-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </motion.button>
                  )}

                  <motion.button
                    onClick={onClose}
                    className="p-2 rounded-xl bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <XIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="glass-scroll flex-1 space-y-3 min-h-0">
                {history.length === 0 ? (
                  <div className="text-center py-12">
                    <ClockIcon className="w-12 h-12 text-white/30 mx-auto mb-4" />
                    <p className="text-white/60">Nenhum JSON no histórico</p>
                    <p className="text-white/40 text-sm mt-1">
                      JSONs copiados aparecerão aqui automaticamente
                    </p>
                  </div>
                ) : (
                  history.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors duration-300" />

                      <div className="relative z-10 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-white/40 text-xs">
                                {formatDate(item.timestamp)}
                              </span>
                            </div>

                            <pre className="text-sm text-white/80 font-mono whitespace-pre-wrap break-words">
                              {truncateJson(item.json)}
                            </pre>
                          </div>

                          <div className="flex items-center gap-1 flex-shrink-0">
                            <motion.button
                              onClick={() => handleLoadJson(item.json)}
                              className="p-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors duration-200"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="Carregar JSON"
                            >
                              <CopyIcon className="w-4 h-4" />
                            </motion.button>

                            <motion.button
                              onClick={() => removeFromHistory(item.id)}
                              className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors duration-200"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="Remover do histórico"
                            >
                              <XIcon className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
