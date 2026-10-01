import { useEffect, useRef, useState } from "react";

type Msg = { who: "you" | "clerk"; text: string };

const HELP: Record<number, string> = {
  0: "Step 01. The floor is 200 basket units already titled. Press Reserve. This is not a print to cover the invoice. A missed floor is not rescued by a mint.",
  1: "Step 02. Name face and class. Face is paper. Household, firm, and treasury use the same rail. A witness does not issue. An agent does not invent the invoice. Treasury does not get a tighter class.",
  2: "Step 03. Press Write receivable. The tape names issuer, face, and class. A real write costs about $0.001 in $Trust after you associate 0.0.10607411. This mock does not sign Hedera.",
  3: "Step 04. Live discount d haircuts paper: value = face × (1 − d). Move the slider. A frozen official d is par. Width is information. Thin class should quote wider.",
  4: "Step 05. Lock the put at 10%. If live d is above the strike, the hedge pays the gap. The risk charge is 1.5% of face, taken now. Charge is not the haircut and not seigniorage. The put does not mint the gap.",
  5: "Step 06. Press Settle. Register = conversion + hedge. Charge already left at lock. Floor stays senior and is not inside the invoice. Four lines or the agent refuses. Face was never cash.",
};

function answer(q: string, step: number, seat: string) {
  const t = q.toLowerCase();
  if (t.includes("floor") || t.includes("basket") || t.includes("ubi"))
    return "The floor is a first claim on surplus already titled. It is not priced at the door and not printed for this invoice.";
  if (t.includes("mint") || t.includes("print") || t.includes("seign"))
    return "The mint is a listed window. Nobody here opens a private window. A hole in the hedge is not covered with new units.";
  if (t.includes("discount") || t.includes("par") || t.includes("haircut") || t === "d")
    return "Conversion is face times (1 minus live d). Do not freeze last week's rate. That is par by another name.";
  if (t.includes("hedge") || t.includes("put") || t.includes("strike"))
    return "The hedge is a second named claim. Strike in this mock is 10%. It pays max(0, d − 0.10) times face. It does not print the gap.";
  if (t.includes("charge") || t.includes("fee") || t.includes("risk"))
    return "Listed risk charge is 1.5% of face, taken when the class is written. Separate from the haircut. Separate from $Trust write fee (~$0.001).",
  if (t.includes("trust") || t.includes("hashpack") || t.includes("associate") || t.includes("hedera"))
    return "Associate $Trust 0.0.10607411 in HashPack before a real write. This page does not take keys and does not sign the network.";
  if (t.includes("witness"))
    return "A witness reads the tape. No keys. They do not issue paper.";
  if (t.includes("agent"))
    return "An agent is a clerk of posted rules. Catch a double mint. Refuse a missing line. Do not mint, set the basket, or harvest Desert.";
  if (t.includes("treasury"))
    return "Treasury buys units on the listed schedule. Same window as a household. No weekend facility.";
  if (t.includes("desert") || t.includes("residual"))
    return "Desert is titled after the floor take and the listed prices. This mock does not level it.";
  if (t.includes("what now") || t.includes("next") || t.includes("help") || t.includes("how"))
    return HELP[step] ?? HELP[0];
  if (t.includes("seat") || t.includes("who"))
    return `You are seated as ${seat}. Switch the chips above if that is the wrong party.`;
  return `${HELP[step]} Ask about floor, discount, hedge, charge, mint, $Trust, agent, or Desert if you want that line only.`;
}

export function DeskClerk({ step, seat }: { step: number; seat: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ who: "clerk", text: HELP[0] }]);
  const [draft, setDraft] = useState("");
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMsgs((prev) => [...prev, { who: "clerk", text: HELP[step] }]);
  }, [step]);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    setMsgs((prev) => [...prev, { who: "you", text: q }, { who: "clerk", text: answer(q, step, seat) }]);
    setDraft("");
  }

  const chips = ["What now?", "Floor", "Discount", "Hedge", "Charge", "$Trust"];

  return (
    <section className="mt-10 rounded-lg border border-border bg-surface p-5">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Desk clerk</p>
      <p className="mt-1 text-sm text-muted">Local answers. No video. No dossier. Not a second sovereign.</p>
      <div className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
        {msgs.map((m, i) => (
          <p key={i} className={m.who === "clerk" ? "max-w-2xl text-sm text-muted" : "max-w-2xl text-sm text-fg"}>
            <span className="font-mono text-xs text-subtle">{m.who}</span>
            <span className="ml-2">{m.text}</span>
          </p>
        ))}
        <div ref={end} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button key={c} type="button" onClick={() => send(c)} className="rounded-full border border-border px-3 py-1 text-xs text-fg">
            {c}
          </button>
        ))}
      </div>
      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask this step"
          className="min-w-0 flex-1 rounded-md border border-border bg-bg px-3 py-3 text-sm text-fg"
        />
        <button type="submit" className="rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg">
          Ask
        </button>
      </form>
    </section>
  );
}
