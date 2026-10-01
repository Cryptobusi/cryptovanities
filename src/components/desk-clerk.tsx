import { useEffect, useRef, useState } from "react";

type Msg = { who: "you" | "clerk"; text: string };

const HELP: Record<number, string> = {
  0: "Step 01. The floor is 200 basket units already titled. Press Reserve. This is not a print to cover the invoice.",
  1: "Step 02. Name face and class. Face is paper. Household, firm, and treasury use the same rail.",
  2: "Step 03. Press Write receivable. A real write is about $0.001 in $Trust after you associate 0.0.10607411. This mock does not sign Hedera.",
  3: "Step 04. Live d haircuts paper: value = face × (1 − d). A frozen official d is par.",
  4: "Step 05. Read the posted ratio on the ticket. Collectives of hedgers and assessors insure that number. No volatility homework. Pay the listed charge now.",
  5: "Step 06. Checkout takes the most favorable live insured ratio after the listed charge. Register = conversion + that payout. Floor stays senior.",
};

function answer(q: string, step: number, seat: string) {
  const t = q.toLowerCase();
  if (t.includes("floor") || t.includes("basket"))
    return "The floor is a first claim on surplus already titled. It is not printed for this invoice.";
  if (t.includes("mint") || t.includes("print"))
    return "A hole in an insured ratio is not covered with new units. The collective that posted it takes the loss.";
  if (t.includes("discount") || t.includes("par") || t.includes("haircut"))
    return "Conversion is face times (1 minus live d). Do not freeze last week's rate.";
  if (t.includes("ratio") || t.includes("prevailing") || t.includes("collective") || t.includes("insur"))
    return "The ratio is posted by hedgers and assessors for that class. They insure it. It sits on the calculation. Most favorable at checkout means the best live insured quote after the listed charge — not a private letter.";
  if (t.includes("hedge") || t.includes("put") || t.includes("strike"))
    return "Size comes from the posted insured ratio, not from rho and sigma. The collective pays the gap they advertised. They do not mint it.";
  if (t.includes("charge") || t.includes("fee") || t.includes("risk"))
    return "Listed risk charge is taken when the class is written. Separate from the haircut and from the $Trust write fee.";
  if (t.includes("trust") || t.includes("hashpack") || t.includes("hedera"))
    return "Associate $Trust 0.0.10607411 in HashPack before a real write. This page does not take keys.";
  if (t.includes("witness"))
    return "A witness reads the tape. They do not issue paper.";
  if (t.includes("agent"))
    return "An agent refuses a missing posted ratio. It does not invent h* and does not mint a failed cover.";
  if (t.includes("treasury"))
    return "Treasury does not get a private ratio. Same listed posts as a household.";
  if (t.includes("desert") || t.includes("residual"))
    return "Desert is titled after the floor take and the listed prices.";
  if (t.includes("what now") || t.includes("next") || t.includes("help") || t.includes("how"))
    return HELP[step] ?? HELP[0];
  if (t.includes("seat") || t.includes("who"))
    return `You are seated as ${seat}.`;
  return `${HELP[step]} Ask about ratio, floor, discount, hedge, charge, or $Trust.`;
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

  const chips = ["What now?", "Ratio", "Floor", "Discount", "Hedge", "Charge"];

  return (
    <section className="mt-10 rounded-lg border border-border bg-surface p-5">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Desk clerk</p>
      <p className="mt-1 text-sm text-muted">Local answers. No video. Posted ratios, not homework.</p>
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
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask this step" className="min-w-0 flex-1 rounded-md border border-border bg-bg px-3 py-3 text-sm text-fg" />
        <button type="submit" className="rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg">
          Ask
        </button>
      </form>
    </section>
  );
}
