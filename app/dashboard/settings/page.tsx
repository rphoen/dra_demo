"use client"; // Add this at the top

import { Button } from "@/components/ui/button";
import { useState } from "react";
import React from "react";

export default function SetingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [username, setUsername] = useState<string>("John Doe");
  const [email, setEmail] = useState<string>("johndoe@example.com");

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as "light" | "dark");
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
    // Add your save logic here, such as making an API call
  };

  return (
    <div className="max-w-xl p-2 bg-white">
      <h2 className="text-3xl font-bold mb-8">Settings</h2>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Profile</h4>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Notifications</h4>
        <div className="flex items-center mb-4">
          <label className="text-sm font-medium text-gray-700">
            Enable Notifications:
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={handleNotificationsToggle}
              className="ml-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Theme</h4>
        <label className="block text-sm font-medium text-gray-700">
          Select Theme:
          <select
            value={theme}
            onChange={handleThemeChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>

      <Button onClick={handleSave}>Save Settings</Button>
    </div>
  );
}
