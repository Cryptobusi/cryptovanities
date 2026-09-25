export const PAYEE = "@trancesage";
export const ACCESS_INBOX = "@trancesage";
export const EXECUTOR_WALLET = "HashPack";
export const EXECUTOR_NAME = "clubhbar.ℏ";
export const EXECUTOR_ACCOUNT = "0.0.527206";
export const START_CENTS = 2000;
export const LOW_RATIO = 0.25;
export const LOW_CENTS = START_CENTS * LOW_RATIO;
export const MARKUP = 1;

/** Published USD price for a full HCS message (101–1024 bytes). */
export const HCS_CHUNK_USD = 0.0008;
/** Published USD price for one non-fungible TokenMint. */
export const NFT_MINT_USD = 0.05;

export function usd(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function usdFine(dollars: number): string {
  return `$${dollars.toFixed(4)}`;
}

export function sessionQuote(chunks: number) {
  const coins = chunks * HCS_CHUNK_USD + NFT_MINT_USD;
  const bill = coins * (1 + MARKUP);
  const cents = Math.max(1, Math.round(bill * 100));
  return { coins, bill, cents };
}
