"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Field } from "./Field";

export function EditProfileTab() {
  const [form, setForm] = useState({
    name: "Charlene Reed",
    username: "Charlene Reed",
    email: "charlenereed@gmail.com",
    password: "",
    dob: "25 January 1990",
    presentAddress: "San Jose, California, USA",
    permanentAddress: "San Jose, California, USA",
    city: "San Jose",
    postalCode: "45962",
    country: "USA",
  });

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-10">
      <div className="relative h-20 w-20 shrink-0">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-100" />
        <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-1.5 text-white">
          <Pencil size={12} />
        </button>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
        <Field label="Your Name" value={form.name} onChange={set("name")} />
        <Field
          label="User Name"
          value={form.username}
          onChange={set("username")}
        />
        <Field label="Email" value={form.email} onChange={set("email")} />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={set("password")}
        />
        <Field label="Date of Birth" value={form.dob} onChange={set("dob")} />
        <Field
          label="Present Address"
          value={form.presentAddress}
          onChange={set("presentAddress")}
        />
        <Field
          label="Permanent Address"
          value={form.permanentAddress}
          onChange={set("permanentAddress")}
        />
        <Field label="City" value={form.city} onChange={set("city")} />
        <Field
          label="Postal Code"
          value={form.postalCode}
          onChange={set("postalCode")}
        />
        <Field label="Country" value={form.country} onChange={set("country")} />

        <div className="col-span-full flex justify-end">
          <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
