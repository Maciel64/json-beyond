import { motion } from "framer-motion";
import { CodeIcon, FileTsIcon } from "@phosphor-icons/react";
import type { Tab } from "../../App";

interface TabSwitcherProps {
  tab: Tab;
  setTab: (tab: Tab) => void;
}

export function TabSwitcher({ tab, setTab }: TabSwitcherProps) {
  const tabs = [
    {
      id: "json" as Tab,
      icon: CodeIcon,
      label: "JSON",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "typescript" as Tab,
      icon: FileTsIcon,
      label: "TypeScript",
      color: "from-blue-600 to-indigo-600",
    },
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.08] to-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent rounded-2xl" />

      <div className="relative flex p-1.5 gap-1">
        {tabs.map((tabItem) => {
          const IconComponent = tabItem.icon;
          const isActive = tab === tabItem.id;

          return (
            <motion.button
              key={tabItem.id}
              onClick={() => setTab(tabItem.id)}
              className={`
                relative px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive ? "text-white" : "text-white/60 hover:text-white/80"}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${tabItem.color} rounded-xl shadow-lg backdrop-blur-sm`}
                  initial={false}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 0.3,
                  }}
                  layoutId={`tab-background-${Math.random()}`} // ID único para evitar conflitos
                />
              )}

              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl" />
              )}

              <div className="relative z-10 flex items-center justify-center">
                <IconComponent
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? "drop-shadow-sm" : "group-hover:scale-110"
                  }`}
                />
              </div>

              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                <div className="relative">
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xl rounded-lg border border-white/20" />
                  <div className="relative z-10 text-white text-xs px-3 py-2 whitespace-nowrap">
                    {tabItem.label}
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-lg" />

                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/60"></div>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}

        <motion.div
          className="absolute top-1.5 bottom-1.5 rounded-xl pointer-events-none"
          animate={{
            left: tab === "json" ? "6px" : "calc(50% + 2px)",
            right: tab === "json" ? "calc(50% + 2px)" : "6px",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div
            className={`
            w-full h-full rounded-xl bg-gradient-to-r opacity-20
            ${
              tab === "json"
                ? "from-blue-500 to-cyan-500"
                : "from-blue-600 to-indigo-600"
            }
          `}
          />
        </motion.div>
      </div>
    </div>
  );
}
