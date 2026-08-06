"use client";

import { useState } from "react";
import { Field } from "./Field";
import { Toggle } from "./toggle";

export function SecurityTab() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-gray-900">
          Two-factor Authentication
        </span>
        <Toggle
          checked={twoFactor}
          onChange={setTwoFactor}
          label="Enable or disable two factor authentication"
        />
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium text-gray-900">
          Change Password
        </span>
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          <Field
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={setCurrentPassword}
          />
          <Field
            label="New Password"
            type="password"
            value={newPassword}
            onChange={setNewPassword}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
          Save
        </button>
      </div>
    </div>
  );
}
