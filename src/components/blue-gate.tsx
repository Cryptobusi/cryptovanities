import { useEffect, useRef, useState } from "react";
import { dmUrl, HANDLE } from "@/lib/site-data";
import { checkBlueHandle } from "@/lib/gate.functions";

const PASS_KEY = "ea-blue-pass";

type Phase = "check" | "form" | "film" | "in";

function stamp(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(date);
}

function duration(ms: number) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${seconds % 60}s`;
}

export function BlueGate({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("check");
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [grow, setGrow] = useState(false);
  const started = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    started.current = Date.now();
    try {
      if (sessionStorage.getItem(PASS_KEY)) setPhase("in");
      else setPhase("form");
    } catch {
      setPhase("form");
    }
  }, []);

  function enter() {
    window.setTimeout(() => setPhase("in"), 6200);
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const pass = await checkBlueHandle({ data: { handle } });
      const now = new Date();
      const spent = duration(now.getTime() - started.current);
      const note = [
        "Door pass, blue check",
        `Handle: @${pass.handle}`,
        `Name: ${pass.name}`,
        `Entered: ${stamp(now)} ET`,
        `Duration at the door: ${spent}`,
      ].join("\n");
      try {
        sessionStorage.setItem(PASS_KEY, pass.handle);
      } catch {
        /* private mode still gets this visit */
      }
      window.open(dmUrl(`@${pass.handle}`, note, "blue-door"), "_blank", "noopener,noreferrer");
      setPhase("film");
      window.setTimeout(() => setGrow(true), 40);
      enter();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The door did not open.");
    } finally {
      setBusy(false);
    }
  }

  if (phase === "in") return children;
  if (phase === "check") return <div className="min-h-dvh bg-bg" />;

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      {phase === "form" ? (
        <form onSubmit={submit} className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-6">
          <p className="font-mono text-xs tracking-widest text-subtle uppercase">Door</p>
          <h1 className="font-display text-4xl">Blue check only.</h1>
          <p className="text-muted">
            An X handle with the blue mark. The door writes the handle, the time, and how long you stood here, then opens a message to @{HANDLE}.
          </p>
          <label className="block text-sm text-muted">
            X handle
            <input
              required
              autoFocus
              value={handle}
              onChange={(event) => setHandle(event.target.value)}
              placeholder="@handle"
              className="mt-2 w-full border border-border bg-bg px-3 py-3 text-fg"
            />
          </label>
          {error ? <p className="text-sm text-muted">{error}</p> : null}
          <button type="submit" disabled={busy} className="border border-border px-4 py-3 text-fg disabled:opacity-50">
            {busy ? "Reading the mark…" : "Confirm access"}
          </button>
        </form>
      ) : null}
      {phase === "film" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src="/legomiego-spin.mp4"
            autoPlay
            muted
            playsInline
            onEnded={() => setPhase("in")}
            className="max-h-none max-w-none object-cover transition-transform duration-[5600ms] ease-in"
            style={{ width: "100vmin", height: "100vmin", transform: grow ? "scale(1.85)" : "scale(0.22)" }}
          />
        </div>
      ) : null}
    </div>
  );
}
