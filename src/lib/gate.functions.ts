import { createServerFn } from "@tanstack/react-start";

const HANDLE = /^[A-Za-z0-9_]{1,15}$/;

export type DoorPass = {
  handle: string;
  name: string;
  verifiedType: "individual";
};

function row(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

export const checkBlueHandle = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const body = row(data);
    const raw = typeof body?.handle === "string" ? body.handle.trim().replace(/^@+/, "") : "";
    if (!HANDLE.test(raw)) throw new Error("That is not an X handle.");
    return { handle: raw };
  })
  .handler(async ({ data }): Promise<DoorPass> => {
    const response = await fetch(`https://api.fxtwitter.com/${encodeURIComponent(data.handle)}`, {
      headers: { Accept: "application/json", "User-Agent": "EgonomicAnonymous/1.0" },
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error("No X account by that handle.");
    const json = (await response.json()) as unknown;
    const user = row(row(json)?.user);
    if (!user) throw new Error("No X account by that handle.");
    const screen = typeof user.screen_name === "string" ? user.screen_name : data.handle;
    const name = typeof user.name === "string" ? user.name : screen;
    const verification = row(user.verification);
    const verified = verification?.verified === true;
    const type = typeof verification?.type === "string" ? verification.type : "";
    if (!verified || type !== "individual") {
      throw new Error("The door takes a blue check only. Business and government marks stay outside.");
    }
    return { handle: screen, name, verifiedType: "individual" };
  });
