"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, ChevronRight } from "lucide-react";
import { contacts } from "@/data/mock-data";

export function QuickTransfer() {
  const [amount, setAmount] = useState("525.50");
  const [selectedContactId, setSelectedContactId] = useState(contacts[0].id);

  function handleSend() {
    const contact = contacts.find((c) => c.id === selectedContactId);
    // Ainda sem backend: por enquanto só simula a ação.
    console.log(`Enviando $${amount} para ${contact?.name}`);
  }

  return (
    <div>
      <h2 className="text-[22px] font-semibold text-heading mb-4">
        Quick Transfer
      </h2>

      <div className="bg-surface rounded-card p-6 shadow-card">
        <div className="flex items-center justify-between gap-4 mb-6">
          {contacts.map((contact) => {
            const isSelected = contact.id === selectedContactId;

            return (
              <button
                key={contact.id}
                type="button"
                onClick={() => setSelectedContactId(contact.id)}
                className="flex flex-col items-center gap-2 shrink-0"
              >
                <div
                  className={`w-14 h-14 rounded-full overflow-hidden relative ring-2 transition-colors ${
                    isSelected ? "ring-primary" : "ring-transparent"
                  }`}
                >
                  <Image
                    src={contact.avatarUrl}
                    alt={contact.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-text-primary">
                    {contact.name}
                  </p>
                  <p className="text-[11px] text-text-secondary">
                    {contact.role}
                  </p>
                </div>
              </button>
            );
          })}

          <button
            type="button"
            aria-label="See more contacts"
            className="w-9 h-9 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0"
          >
            <ChevronRight className="w-4 h-4 cursor-pointer" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-text-secondary shrink-0">
            Write Amount
          </span>

          <div className="flex-1 min-w-25 flex items-center bg-background rounded-full px-5 py-2.5">
            <span className="text-sm text-text-primary">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 min -w-0 bg-transparent outline-none text-sm text-text-primary"
            />
          </div>

          <button
            type="button"
            onClick={handleSend}
            className="flex items-center gap-2 bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
          >
            Send
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
