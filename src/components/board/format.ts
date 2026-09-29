const TZ = "America/New_York";

function trimFixed(value: string) {
  return value.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
}

export function formatEt(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return `${day} · ${time} ET`;
}

export function formatFollowers(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "";
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  if (abs < 1000) return `${sign}${Math.round(abs).toLocaleString("en-US")}`;
  if (abs < 1_000_000) {
    const scaled = abs / 1000;
    const digits = scaled >= 100 ? 0 : 1;
    return `${sign}${trimFixed(scaled.toFixed(digits))}K`;
  }
  const scaled = abs / 1_000_000;
  const digits = scaled >= 100 ? 0 : scaled >= 10 ? 1 : 2;
  return `${sign}${trimFixed(scaled.toFixed(digits))}M`;
}

export function formatCount(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "0";
  return value.toLocaleString("en-US");
}

export function rankLabel(rank: number): string {
  return String(rank).padStart(2, "0");
}

export function mediaSrc(media: { type?: string; url?: string; preview_image_url?: string }) {
  if (media.type === "photo") return media.url || media.preview_image_url || "";
  return media.preview_image_url || media.url || "";
}

export function isPlayable(type?: string) {
  return type === "video" || type === "gif" || type === "animated_gif";
}

export function isPortrait(width?: number, height?: number) {
  if (!width || !height) return false;
  return height > width;
}
