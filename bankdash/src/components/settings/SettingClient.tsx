"use client";

import { useState } from "react";
import { EditProfileTab } from "./EditProfileTab";
import { PreferencesTab } from "./Preferences";
import { SecurityTab } from "./SecurityTab";

const TABS = [
  { id: "profile", label: "Edit Profile" },
  { id: "preferences", label: "Preferences" },
  { id: "security", label: "Security" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function SettingClient() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      {/* Content for the active tab */}
      <div>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative pb-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute -bottom-px left-0 h-0.5 w-full bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      {activeTab === "profile" && <EditProfileTab />}
      {activeTab === "preferences" && <PreferencesTab />}
      {activeTab === "security" && <SecurityTab />}
    </div>
  );
}
