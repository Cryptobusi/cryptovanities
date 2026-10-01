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

function isOwner(handle: string) {
  return handle.replace(/^@+/, "").toLowerCase() === HANDLE;
}

export function BlueGate({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("check");
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [grow, setGrow] = useState(false);
  const started = useRef(0);
  const passRef = useRef<{ handle: string; name: string } | null>(null);
  const finished = useRef(false);

  useEffect(() => {
    started.current = Date.now();
    try {
      const saved = sessionStorage.getItem(PASS_KEY);
      if (saved && isOwner(saved)) setPhase("in");
      else {
        sessionStorage.removeItem(PASS_KEY);
        setPhase("form");
      }
    } catch {
      setPhase("form");
    }
  }, []);

  function finishFilm() {
    if (finished.current) return;
    const pass = passRef.current;
    if (!pass) return;
    finished.current = true;
    if (isOwner(pass.handle)) {
      try {
        sessionStorage.setItem(PASS_KEY, pass.handle);
      } catch {
        /* private mode still gets this visit */
      }
      setPhase("in");
      return;
    }
    const now = new Date();
    const note = [
      "Site view, blue check",
      `Handle: @${pass.handle}`,
      `Name: ${pass.name}`,
      `At: ${stamp(now)} ET`,
      `Website viewed: ${duration(now.getTime() - started.current)}`,
    ].join("\n");
    window.open(dmUrl(`@${pass.handle}`, note, "site-view"), "_blank", "noopener,noreferrer");
    try {
      sessionStorage.setItem(PASS_KEY, pass.handle);
    } catch {
      /* private mode still gets this visit */
    }
    setPhase("in");
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const pass = await checkBlueHandle({ data: { handle } });
      passRef.current = pass;
      setPhase("film");
      window.setTimeout(() => setGrow(true), 40);
      window.setTimeout(finishFilm, 6200);
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
          <p className="text-muted">An X handle with the blue mark. The film fills the screen, then the site opens.</p>
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
          <p className="text-sm text-fg">Only X handle with blue check may enter</p>
          {error ? <p className="text-sm text-muted">{error}</p> : null}
          <button type="submit" disabled={busy} className="border border-border px-4 py-3 text-fg disabled:opacity-50">
            {busy ? "Reading the mark…" : "Confirm access"}
          </button>
        </form>
      ) : null}
      {phase === "film" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <video
            src="/legomiego-spin.mp4"
            autoPlay
            muted
            playsInline
            onEnded={finishFilm}
            className="max-h-none max-w-none object-cover transition-transform duration-[5600ms] ease-in"
            style={{ width: "100vmin", height: "100vmin", transform: grow ? "scale(1.85)" : "scale(0.22)" }}
          />
        </div>
      ) : null}
    </div>
  );
}
