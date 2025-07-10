"use client";

import type React from "react";
import { useState } from "react";
import { CopyIcon } from "@phosphor-icons/react";

export default function JsonFormatter() {
  const [inputJson, setInputJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState("");

  // Function to format JSON
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

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setInputJson(value);
    formatJson(value);
  };

  // Handle copy to clipboard
  const handleCopy = async () => {
    if (formattedJson) {
      try {
        await navigator.clipboard.writeText(formattedJson);
        setCopySuccess("Copiado!");
        setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
      } catch (e: unknown) {
        console.log(e);
        setCopySuccess("Falha ao copiar!");
        setTimeout(() => setCopySuccess(""), 2000);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 w-full max-w-6xl min-w-[500px] mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex-1 flex flex-col gap-2">
        <label
          htmlFor="json-input"
          className="text-lg font-semibold text-gray-800"
        >
          JSON de Entrada
        </label>
        <textarea
          id="json-input"
          placeholder='Cole seu JSON aqui, ex: {"nome": "João", "idade": 30}'
          value={inputJson}
          onChange={handleInputChange}
          rows={15}
          className={`
            w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-500" : "border-gray-300"}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? "json-input-error" : undefined}
        />
        {error && (
          <p id="json-input-error" className="text-red-500 text-sm">
            {error}
          </p>
        )}
      </div>

      {/* Output Section */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label
            htmlFor="json-output"
            className="text-lg font-semibold text-gray-800"
          >
            JSON Formatado
          </label>
          <div className="relative">
            <button
              onClick={handleCopy}
              disabled={!formattedJson}
              className="
                flex items-center gap-1 px-3 py-1 text-sm rounded-md
                bg-blue-600 text-white hover:bg-blue-700
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <CopyIcon className="w-4 h-4" />
              {copySuccess || "Copiar"}
            </button>
          </div>
        </div>
        <div
          id="json-output"
          className="
            w-full h-full p-3 border border-gray-300 rounded-md bg-gray-50
            overflow-auto text-sm font-mono whitespace-pre-wrap break-words
          "
          style={{ minHeight: "200px" }} // Ensure a minimum height for the output area
          role="textbox"
          aria-readonly="true"
        >
          {formattedJson ? (
            <pre className="text-gray-800">{formattedJson}</pre>
          ) : (
            <p className="text-gray-500">O JSON formatado aparecerá aqui.</p>
          )}
        </div>
      </div>
    </div>
  );
}
