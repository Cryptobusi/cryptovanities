import { PaperShell } from "@/components/paper-shell";

export function LegalesePage() {
  return (
    <PaperShell
      folio="Legalese"
      title="The Path of the Blockchain Lexicon (and the Law)"
      abstract="A 2017 working draft by Angela Walch on how unsettled, contested vocabulary around blockchain technology creates real problems for regulators—and for anyone relying on claims of ‘immutability.’ Working draft; do not cite without the author’s consent."
    >
      <section>
        <p>
          Angela Walch, Associate Professor at St. Mary’s University School of Law, prepared this paper for the 2017 Fintech Symposium at Boston University School of Law. It examines the linguistic fog surrounding blockchain and distributed ledger technology (DLT) and the risks that fog creates when lawmakers, regulators, and institutions act on it.
        </p>
        <p className="mt-4">
          The core argument: the rapidly shifting, contested vocabulary makes it hard to identify the facts about the technology, to distinguish among its many variants, and to communicate clearly. This raises the chances of regulatory capture, inconsistent rules, and “perverse innovation.”
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-fg">The mutable meaning of “immutable”</h2>
        <p className="mt-4">
          Part III focuses on the single most-used selling word: <em>immutable</em>. Walch argues that treating “immutability” as a defining feature of blockchain technology is misleading for two reasons:
        </p>
        <ol className="mt-4 list-decimal space-y-3 pl-5">
          <li>
            Real-world events show the unchangeable nature of a blockchain record is always limited by the decisions of its human governors. Bitcoin forked in March 2013; Ethereum rolled back its ledger after the 2016 DAO hack. People can (and have) overridden the technology.
          </li>
          <li>
            The source of any “immutability” is disputed—proof-of-work, hashing, block chaining, social consensus, or something else. It is therefore unclear whether any particular variation (permissioned or permissionless, different consensus mechanisms) may fairly be described as creating an immutable record.
          </li>
        </ol>
        <p className="mt-4">
          Using the ordinary dictionary meaning (“not capable of or susceptible to change”) does not match the technology’s actual behavior. Even strong advocates describe Bitcoin as “hard to change” rather than absolutely unchangeable, yet the public and regulators continue to hear “unchangeable.”
        </p>
        <blockquote className="mt-6 border-l-2 border-border pl-4 italic text-fg">
          “Immutability is a characteristic of blockchain technology.” — commonly stated, but, on the evidence, not a reliable description of all (or perhaps any) variants once human governors are taken into account.
        </blockquote>
      </section>

      <section>
        <h2 className="text-2xl text-fg">Why it matters for a public tape</h2>
        <p className="mt-4">
          A statute or protocol that simply declares data on a ledger “immutable” does not make the data unchangeable in reality. Arizona’s 2017 blockchain statute, for example, defined blockchain technology as producing data that “is immutable and auditable and provides an uncensored truth.” Walch notes the problems: the word embeds a risk analysis that may not hold, treats public and private ledgers as identical, and can bake confusion into the law itself.
        </p>
        <p className="mt-4">
          For any system that claims a public, showable record (a tape, an audit trail, a sovereign book), the practical question is not whether the technology is labeled immutable, but whether the human process that governs the record is itself visible, constrained, and reversible only under named, shown rules.
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-fg">Mitigation</h2>
        <p className="mt-4">
          Walch recommends that regulators (and, by extension, anyone evaluating the technology) cultivate genuine expertise, separate hype from reality, consider the incentives of the source, seek diverse perspectives, doubt everything, and resist herd behavior. Education must be critical, not merely consultative.
        </p>
        <p className="mt-4 text-sm">
          Source: Angela Walch, “The Path of the Blockchain Lexicon (and the Law),” 36 Rev. Banking & Fin. L. (forthcoming 2017), April 21, 2017 working draft. Prepared for the 2017 Fintech Symposium, Boston University School of Law. Please do not cite without the author’s consent.
        </p>
      </section>
    </PaperShell>
  );
}
