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
    <div className="flex bg-black/20 backdrop-blur-md rounded-xl p-1 border border-white/20 shadow-lg">
      {tabs.map((tabItem) => {
        const IconComponent = tabItem.icon;
        const isActive = tab === tabItem.id;

        return (
          <motion.button
            key={tabItem.id}
            onClick={() => setTab(tabItem.id)}
            className={`
              relative px-4 py-2 rounded-lg transition-all duration-300 group
              ${isActive ? "text-white" : "text-white/60 hover:text-white/80"}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className={`absolute inset-0 bg-gradient-to-r ${tabItem.color} rounded-lg shadow-lg`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            <div className="relative z-10 flex items-center justify-center">
              <IconComponent
                className={`w-5 h-5 transition-all duration-300 ${
                  isActive ? "drop-shadow-sm" : "group-hover:scale-110"
                }`}
              />
            </div>

            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              {tabItem.label}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
