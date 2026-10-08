import { useEffect, useState } from "react";
import { MARKS, LAYER_BOARD, DESERT } from "@/lib/site-data";
import { KILO_MARKS } from "@/lib/kilo-marks";
import { Opening, Hero, Thesis } from "@/components/home-front";
import { Fidelity } from "@/components/fidelity-note";
import { Provenance, Agents } from "@/components/home-mid";
import { Price } from "@/components/home-price";
import { BoardPreview, Invitation } from "@/components/home-end";
import { HederaEcosystemMenu } from "@/components/hedera-ecosystem";

function openMark(href: string, onBack: () => void) {
  const child = window.open(href, "_blank");
  if (!child) {
    window.location.assign(href);
    return;
  }
  const watch = window.setInterval(() => {
    if (child.closed) {
      window.clearInterval(watch);
      onBack();
      window.focus();
    }
  }, 400);
}

function LayerBoard() {
  const [levels, setLevels] = useState(() => LAYER_BOARD.map(() => 1 + Math.random() * 6));
  const [open, setOpen] = useState(0);
  const layer = LAYER_BOARD[open];

  useEffect(() => {
    const tick = window.setInterval(() => {
      setLevels((prev) =>
        prev.map((value) => Math.min(8, Math.max(1, value + (Math.random() - 0.42) * 1.6))),
      );
    }, 650);
    return () => window.clearInterval(tick);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-4">
      <div className="rounded-xl border border-[#3a2a14] bg-[#12080c] px-2 py-3 sm:px-3">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {LAYER_BOARD.map((item, i) => {
            const value = levels[i];
            const tone = (value - 1) / 7;
            const color = `hsl(${Math.round(tone * 122)} 78% ${38 + tone * 8}%)`;
            const selected = i === open;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setOpen(i)}
                className="flex min-w-0 flex-col items-center gap-1"
              >
                <div className="relative h-16 w-full overflow-hidden rounded-sm bg-[#1c1014] sm:h-24">
                  <div
                    className="absolute inset-x-0 bottom-0 transition-all duration-500"
                    style={{ height: `${(value / 8) * 100}%`, background: color }}
                  />
                </div>
                <span className={selected ? "font-mono text-[10px] tracking-wide text-[#f3e6c8]" : "font-mono text-[10px] tracking-wide text-[#d4b56a]"}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 border-t border-[#3a2a14] px-1 pt-3 sm:px-2">
          <p className="font-mono text-[10px] tracking-widest text-[#d4b56a] uppercase">
            {layer.id} · {layer.aka}
          </p>
          <p className="mt-1 text-sm leading-snug text-[#f3e6c8]">{layer.body}</p>
          <p className="mt-3 text-sm leading-snug text-[#d4b56a]">
            {DESERT.name}. {DESERT.body}
          </p>
        </div>
      </div>
    </div>
  );
}

function KiloRow() {
  function back() {
    window.focus();
  }
  return (
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-1.5 px-4 pt-4">
      {KILO_MARKS.map((mark) => (
        <button
          key={mark.src}
          type="button"
          title={mark.label}
          aria-label={mark.label}
          onClick={() => openMark(mark.href, back)}
          className="grid h-7 w-7 place-items-center rounded-sm bg-[#1a1024]"
        >
          <img src={mark.src} alt={mark.label} className="h-5 w-5 object-contain" />
        </button>
      ))}
    </div>
  );
}

function Marks() {
  const [live, setLive] = useState(false);

  function back() {
    setLive(true);
    window.focus();
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
      {live ? (
        <div className="flex items-center gap-2">
          {MARKS.map((mark) => (
            <button
              key={mark.src}
              type="button"
              onClick={() => openMark(mark.href, back)}
              className="w-0 min-w-0 flex-1"
            >
              <img src={mark.src} alt={mark.alt} className="sky-blend aspect-square h-auto w-full object-contain" />
            </button>
          ))}
        </div>
      ) : (
        <div className="relative mx-auto w-full max-w-3xl">
          <video
            src="/marks-slot.mp4"
            autoPlay
            muted
            playsInline
            onEnded={() => setLive(true)}
            className="w-full rounded-2xl"
          />
          <div
            className="absolute grid grid-cols-4"
            style={{ left: "9.0%", right: "10.0%", top: "41.0%", bottom: "39.0%", columnGap: "1.4%" }}
          >
            {MARKS.map((mark) => (
              <button
                key={mark.src}
                type="button"
                aria-label={mark.alt}
                onClick={() => openMark(mark.href, back)}
                className="h-full"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <KiloRow />
      <HederaEcosystemMenu />
      <LayerBoard />
      <Marks />
      <Opening />
      <Hero />
      <Thesis />
      <Fidelity />
      <Provenance />
      <Agents />
      <Price />
      <BoardPreview />
      <Invitation />
    </>
  );
}
