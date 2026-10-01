import { Link } from "@tanstack/react-router";
import { useState } from "react";

const BANDS = [
  { id: "A", ratio: 0.5, charge: 0.012, label: "tight window" },
  { id: "B", ratio: 0.6, charge: 0.015, label: "posted default" },
  { id: "C", ratio: 0.45, charge: 0.018, label: "thin book" },
];

const BUI = [
  { id: "grain", title: "Grain unit", face: 200 },
  { id: "fuel", title: "Fuel unit", face: 180 },
  { id: "rent", title: "Shelter unit", face: 400 },
];

const LUX = [
  { id: "watch", title: "Named timepiece", face: 12000 },
  { id: "edition", title: "Numbered edition", face: 8000 },
];

function money(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export function CatalogPage() {
  const [spinning, setSpinning] = useState<string | null>(null);
  const [draw, setDraw] = useState<Record<string, (typeof BANDS)[number]>>({});
  const [luxPick, setLuxPick] = useState<Record<string, string>>({
    watch: "B",
    edition: "A",
  });
  const [note, setNote] = useState("BUI draws a listed band. Luxury does not spin.");

  function pull(id: string) {
    if (spinning) return;
    setSpinning(id);
    setNote("Drawing from posted bands only. Not a mint. Not the floor.");
    window.setTimeout(() => {
      const band = BANDS[Math.floor(Math.random() * BANDS.length)];
      setDraw((prev) => ({ ...prev, [id]: band }));
      setSpinning(null);
      setNote(`Landed ${band.id}: ratio ${band.ratio} · charge ${(band.charge * 100).toFixed(1)}%. Window lock still applies.`);
    }, 900);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Catalog · mock</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">Basket draws. Luxury chooses.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        BUI items pull a drawdown from the listed hedge bands for this window. The reel is a display. Every stop is a
        posted ratio and charge. Luxury skips the reel. The buyer picks the line.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-3xl">BUI catalog</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Floor goods. Drawdown is which listed book band prices the hedge, not a prize. Empty book = haircut only.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {BUI.map((item) => {
            const band = draw[item.id];
            const live = spinning === item.id;
            return (
              <li key={item.id} className="rounded-lg border border-border bg-surface p-5">
                <p className="font-mono text-xs text-subtle">BUI</p>
                <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">Face {money(item.face)}</p>
                <p className="mt-4 font-mono text-sm text-fg">
                  {live ? "drawing…" : band ? `${band.id} · ${band.ratio} · ${(band.charge * 100).toFixed(1)}%` : "no draw yet"}
                </p>
                <button type="button" onClick={() => pull(item.id)} className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-fg">
                  Draw band
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">Luxury</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Buyer chooses the stamp. No reel. Same listed bands. Same rule: no mint, floor stays senior.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {LUX.map((item) => {
            const pick = BANDS.find((b) => b.id === luxPick[item.id]) ?? BANDS[1];
            return (
              <li key={item.id} className="rounded-lg border border-border bg-surface p-5">
                <p className="font-mono text-xs text-subtle">Luxury</p>
                <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">Face {money(item.face)}</p>
                <label className="mt-4 block text-sm text-muted">
                  Book line
                  <select
                    value={pick.id}
                    onChange={(e) => setLuxPick((prev) => ({ ...prev, [item.id]: e.target.value }))}
                    className="mt-2 w-full rounded-md border border-border bg-bg px-3 py-3 text-fg"
                  >
                    {BANDS.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.id} · ratio {b.ratio} · charge {(b.charge * 100).toFixed(1)}% · {b.label}
                      </option>
                    ))}
                  </select>
                </label>
                <p className="mt-3 font-mono text-sm text-fg">
                  Chosen {pick.id}. Charge {money(item.face * pick.charge)} at write.
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="mt-8 text-sm text-gold">{note}</p>
      <p className="mt-10 text-sm text-muted">
        Rules on <Link to="/hedge" className="underline decoration-border underline-offset-4">Hedge</Link>. Walk an invoice on{" "}
        <Link to="/enter" className="underline decoration-border underline-offset-4">Enter</Link>.
      </p>
    </div>
  );
}
