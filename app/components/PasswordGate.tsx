"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import LockIcon from "./LockIcon";

export default function PasswordGate({
  projectTitle,
  children,
}: {
  projectTitle: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: input }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      setError(true);
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-lg" aria-hidden="true">
        {children}
      </div>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/70 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-card-lg border border-content-border bg-content-bg p-8 text-content-text"
        >
          <div className="mb-3 flex items-center gap-2 text-content-text">
            <LockIcon className="h-5 w-5" />
            <span className="font-heading text-sm font-bold uppercase tracking-[1.6px]">
              Restricted case study
            </span>
          </div>
          <h2 className="mb-2 font-heading text-2xl font-bold leading-[1.1]">
            This one&apos;s under NDA
          </h2>
          <p className="mb-6 font-body text-base leading-[1.4] text-content-text/70">
            &ldquo;{projectTitle}&rdquo; includes confidential details from an Evinova engagement.
            Enter the password to view it, or reach out directly if you need access.
          </p>
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            autoFocus
            className="mb-3 w-full rounded-card border border-content-border bg-content-bg px-4 py-3 font-body text-base text-content-text placeholder:text-content-placeholder focus-visible:outline-2 focus-visible:outline-accent"
          />
          {error && (
            <p className="mb-3 font-body text-sm text-red-600">Incorrect password — try again.</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-pill bg-accent px-8 py-3 font-heading text-base font-bold leading-[1.1] tracking-[-0.2px] text-text-dark transition-all duration-default hover:brightness-90 active:scale-[0.97] active:brightness-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
          >
            {submitting ? "Checking…" : "Unlock"}
          </button>
        </form>
      </div>
    </div>
  );
}
