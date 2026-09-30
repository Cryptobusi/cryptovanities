export type HelpEntry = {
  id: string;
  title: string;
  instruction: string;
  detail: string;
};

export const HELP: HelpEntry[] = [
  {
    id: "start",
    title: "Start on the floor",
    instruction: "Open Floor. Read the pile, then post the marks, then post the floor, then issue. Do not start on the market.",
    detail:
      "The workable form is one order: a public floor, a public tape, then private issue and private ambition under the same rules. The Floor page is the desk that enforces that order. Market deck, Sealroom, and the coin desk are the same site, not a second set of rules. Nothing on the desk custodies goods or signs a wallet.",
  },
  {
    id: "marks",
    title: "Post the marks",
    instruction: "Check the three inventories. Change a quantity or a price if you mean to. Press Post marks to the tape before anything else.",
    detail:
      "The opening pile is soil carbon at 40 tonnes and $85, grain at 18 tonnes and $240, and one warehouse title at $4,200. Gross is $11,920. A blank or a negative number counts as zero. Editing a line unposts the marks: the new numbers are not policy until you post them again. Revoke drops that line from the gross and writes the revocation under the earlier mark. Restore writes a second line. Neither deletes the first.",
  },
  {
    id: "basket",
    title: "The basket",
    instruction: "The floor is five bands added together: shelter $800, staple food $280, primary care $150, connectivity $40, income $200. One basket is $1,470.",
    detail:
      "The bands are dollars, not quantities of shelter or food. You can change a band or zero it. You cannot add a sixth. A negative band counts as zero. Changing any band unposts the floor at once. The basket is not made of the inventories. Carbon, grain, and the title all pay the same dollar claim. Risk is not a band. It is 12% of what remains after the basket, and it is capped at 60%.",
  },
  {
    id: "floor",
    title: "Post the floor",
    instruction: "Press Post the floor only after the marks are on the tape. If the pile is smaller than the basket, the post is refused.",
    detail:
      "The floor is a first claim. On the opening pile it takes $1,470 and leaves a surplus of $10,450. Risk then takes $1,254. The residual is $9,196, which is 6.26 baskets. That residual is what a personal coin may represent. If the pile does not cover the basket, the gap is written as a refusal and nothing may be issued. The desk will not print UNIT to fill the gap. Posting the floor again clears the paid flag, so the agent has to pay the new composition, not the old one.",
  },
  {
    id: "issue",
    title: "Issue the coin",
    instruction: "Set the symbol and the supply, then press Issue on the tape. A second press of the same symbol and the same supply is refused.",
    detail:
      "NOTE opens at a supply of 9,196, so the book is about $1: residual divided by supply. Fit the supply so the book is $1 does that arithmetic for you. Issuing before the marks and the floor are posted is refused and the refusal is kept. The issue does not increase UNIT. The coin is named credit on the residual. It is not money at par. More units do not create more value. They thin the book.",
  },
  {
    id: "mint",
    title: "The UNIT mint",
    instruction: "Press Mint the tranche. Each press adds exactly 100 UNIT, at a listed seigniorage of $1, until the outstanding supply reaches 1,000.",
    detail:
      "The schedule opens at 400 of a 1,000 cap. Six presses reach the cap. The seventh is refused and the refusal stays on the tape. You cannot type a custom amount. The tranche, the cap, and the seigniorage are not fields. Minting does not wait for the floor, and it does not increase NOTE. The $100 of listed proceeds is written as text. It is not added to the basket, the residual, or the pool. UNIT is not in the market and does not settle an instrument.",
  },
  {
    id: "instruments",
    title: "Named credit",
    instruction: "After the floor is posted, press invoice, bond, escrow, or option. Each one is a claim for one whole basket.",
    detail:
      "Face value is the five bands added together, $1,470 on the opening basket, not one band. Checkout is that face times the market’s discount to the book. If the pool has not moved, the discount is 1 and checkout equals the face. The instrument does not clear as UNIT. It does not increase the mint. It waits until both the marks and the floor are on the tape.",
  },
  {
    id: "tape",
    title: "Read the tape",
    instruction: "Every post, refusal, issue, mint, instrument, trade, and agent check is appended at the bottom of the Floor page. Nothing there is deleted.",
    detail:
      "The tape is the rule that if it cannot be shown, it is not policy. A later edit of a band or a mark does not rewrite the earlier line. Settlement is refused when no mark exists. The tape in this browser is local. It is the working model of a public book. It is not a Hedera transaction, and a wallet has not signed it.",
  },
  {
    id: "agent",
    title: "Run the agent",
    instruction: "Press Run the agent after the floor is posted. Press Settle only when a mark is already on the tape.",
    detail:
      "The agent does four things. It records whether the standing coin supply has already been printed. It flags a market more than 15% rich or cheap to the book. It pays the posted basket without naming a recipient. It will not settle a line that has no origin. It cannot mint UNIT, and it cannot print the gap if the pile is short. Paying the floor sets a flag and writes a line. It does not move $1,470 out of the pile or out of the pool.",
  },
  {
    id: "market",
    title: "Use the market",
    instruction: "Open Market deck only after the coin is issued. A trade there is the same tape line as a trade on the floor.",
    detail:
      "The pool starts at 1,000 NOTE and $1,000, so the market opens at $1. Buying adds dollars and removes coins. Selling does the reverse. The book does not move when the pool does. The floor reserve is not in the pool. Re-seeding sets the pool back to the book and says so. The deck also reads public dollar rates and a few Hedera prices so the issued coin can be compared with other currencies. Comparing is not custody, and this desk does not send the trade to SaucerSwap.",
  },
  {
    id: "sealroom",
    title: "Sealroom",
    instruction: "Open Demo, then My Stuff. SentX and HashPack are links out. Select a token id to read its trail.",
    detail:
      "My Stuff lists NFTs from a public Hedera mirror when an account or a token id is given. Send, receive, and list are instructions for the wallet, not buttons that move the asset. A selected token can be looked up on the DOVU Authority Trail. The desk does not create the trail and does not hold the keys. The seal next to Begin the ledger is the same desk.",
  },
  {
    id: "hashpack",
    title: "Mint a personal coin",
    instruction: "On the home page, under the coin desk, follow the HashPack steps. The mint happens in HashPack, not on this site.",
    detail:
      "Create or open an account, choose a fungible token, name it, set the supply and the keys, and sign. The keys stay with that account. The coin this site issues on the Floor desk is a local model of that act. It is not the token HashPack writes, and it is not $Trust.",
  },
  {
    id: "limits",
    title: "What this site does not do",
    instruction: "Do not treat a desk balance as money you can withdraw. Do not treat a refusal as something you can erase.",
    detail:
      "The site does not custody inventories, coins, or NFTs. It does not sign HashPack, DOVU, or SaucerSwap. UNIT is not the Hedera $Trust supply. Seigniorage is listed and then not spent. A revoked inventory updates the book without forcing the basket to be posted again, so an old floor line can disagree with a new pile until you post the floor once more. Ledgers do not repeal law.",
  },
];
