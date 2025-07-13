import { motion } from "framer-motion";

interface JsonFormatterProps {
  data: string;
  setFinalData: (data: string) => void;
  setError: (error: string | null) => void;
}

export function JsonFormatter({
  data,
  setFinalData,
  setError,
}: JsonFormatterProps) {
  const formatJson = () => {
    if (!data.trim()) {
      setFinalData("");
      setError(null);
      return "// JSON inválido";
    }

    try {
      const parsed = JSON.parse(data);
      setFinalData(JSON.stringify(parsed, null, 2));
      setError(null);
      return JSON.stringify(parsed, null, 2);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setFinalData("");
        setError("JSON inválido: " + e.message);
      }
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
        <pre className="text-green-300 leading-relaxed relative z-10">
          {formatJson()}
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
    </motion.div>
  );
}
