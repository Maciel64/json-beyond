import {
  useState,
  useEffect,
  useCallback,
  createContext,
  type PropsWithChildren,
} from "react";

interface HistoryItem {
  id: string;
  json: string;
  timestamp: number;
}

const HISTORY_KEY = "json-formatter-history";
const MAX_HISTORY_ITEMS = 50;

interface JsonHistoryContextProps {
  history: HistoryItem[];
  addToHistory: (json: string) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const JsonHistoryContext = createContext<JsonHistoryContextProps>({
  history: [],
  addToHistory: () => {},
  removeFromHistory: () => {},
  clearHistory: () => {},
});

export function JsonHistoryProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(HISTORY_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setHistory(parsed);
        }
      } catch (error) {
        console.warn("Erro ao carregar histórico:", error);
      }
    }
  }, []);

  const saveHistory = useCallback((newHistory: HistoryItem[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
        setHistory(newHistory);
      } catch (error) {
        console.warn("Erro ao salvar histórico:", error);
      }
    }
  }, []);

  const addToHistory = useCallback(
    (json: string) => {
      if (!json.trim()) return;

      const newItem: HistoryItem = {
        id: Date.now().toString(),
        json: json.trim(),
        timestamp: Date.now(),
      };

      const exists = history.some((item) => item.json === newItem.json);
      if (exists) return;

      const newHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
      saveHistory(newHistory);
    },
    [history, saveHistory]
  );

  const removeFromHistory = useCallback(
    (id: string) => {
      const newHistory = history.filter((item) => item.id !== id);
      saveHistory(newHistory);
    },
    [history, saveHistory]
  );

  const clearHistory = useCallback(() => {
    saveHistory([]);
  }, [saveHistory]);

  return (
    <JsonHistoryContext.Provider
      value={{
        history,
        addToHistory,
        removeFromHistory,
        clearHistory,
      }}
    >
      {children}
    </JsonHistoryContext.Provider>
  );
}
