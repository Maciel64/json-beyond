import { useContext } from "react";
import { JsonHistoryContext } from "../contexts/json-history-context";

export function useJsonHistory() {
  const context = useContext(JsonHistoryContext);

  if (!context) {
    throw new Error("useJsonHistory must be used within a JsonHistoryProvider");
  }

  return context;
}
