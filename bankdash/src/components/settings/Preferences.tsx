"use client";

import { useState } from "react";
import { Field } from "./Field";
import { Toggle } from "./toggle";

export function PreferencesTab() {
  const [currency, setCurrency] = useState("USG");
  const [timeZone, setTimeZone] = useState(
    "(GMT-12:00) International Date Line West",
  );
  const [notifications, setNotifications] = useState({
    digitalCurrency: true,
    merchantOrder: false,
    recommendation: true,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
        <Field label="Currency" value={currency} onChange={setCurrency} />
        <Field label="Time Zone" value={timeZone} onChange={setTimeZone} />
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-gray-900">Notifications</span>
        <Toggle
          checked={notifications.digitalCurrency}
          onChange={(v) =>
            setNotifications((n) => ({ ...n, digitalCurrency: v }))
          }
          label="I send or receive digital currency"
        />
        <Toggle
          checked={notifications.merchantOrder}
          onChange={(v) =>
            setNotifications((n) => ({ ...n, merchantOrder: v }))
          }
          label="I receive merchant order"
        />
        <Toggle
          checked={notifications.recommendation}
          onChange={(v) =>
            setNotifications((n) => ({ ...n, recommendation: v }))
          }
          label="There are recommendation for my account"
        />
      </div>

      <div className="flex justify-end">
        <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
          Save
        </button>
      </div>
    </div>
  );
}
