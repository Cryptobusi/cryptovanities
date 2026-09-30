import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import boardJson from "@/data/board.json";
import type { BoardFile, MentionItem, Pairing } from "@/data/board.types";
import { PairCard } from "@/components/board/PairCard";
import { formatCount, formatEt, rankLabel } from "@/components/board/format";
import { VerifiedBadge } from "@/components/board/VerifiedBadge";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import "@/styles/board.css";

const board = boardJson as BoardFile;

export const Route = createFileRoute("/board")({
  head: () => ({
    meta: [
      {
        title: `X Board · ${board.week.label} · Egonomic Anonymous`,
      },
      {
        name: "description",
        content: `Weekly X board for ${board.profile_note.handle}: conversations, thesis threads and mentions for ${board.week.label}.`,
      },
    ],
  }),
  component: BoardPage,
});

function visibleMentions(file: BoardFile): MentionItem[] {
  const draft = file.review.status === "draft";
  return (file.mentions.featured ?? []).filter((item) => {
    if (item.approval_status === "rejected") return false;
    if (item.approval_status === "pending") return draft;
    return item.approval_status === "approved";
  });
}

function BoardPage() {
  const pairings = [...board.pairings].sort((a, b) => a.rank - b.rank);
  const mentions = visibleMentions(board);
  const draft = board.review.status === "draft";

  return (
    <div className="xboard-shell relative min-h-dvh text-fg">
      <SiteNav />
      <main className="xboard">
        <div className="xb-wrap">
          <header>
            <div className="xb-kicker">
              <p className="xb-eyebrow">
                The X board · {board.week.iso_week}
              </p>
              {draft ? <span className="xb-pill xb-pill-outline">Draft preview</span> : null}
            </div>
            <h1 className="xb-h1">The Board</h1>
            <p className="xb-sub">
              {board.week.label}
              <span aria-hidden="true"> · </span>
              <a href={board.profile_note.url} target="_blank" rel="noopener">
                Writings and conversations from {board.profile_note.handle}
              </a>
            </p>
          </header>

          <div className="xb-hero-grid">
            <div>
              <div className="xb-panel xb-stats">
                <div className="xb-stat">
                  <p className="xb-stat-n">{formatCount(board.stats.posts)}</p>
                  <p className="xb-stat-label">Posts</p>
                  <p className="xb-meta">
                    {formatCount(board.stats.quotes)} quotes · {formatCount(board.stats.replies)} replies ·{" "}
                    {formatCount(board.stats.originals)} originals · {formatCount(board.stats.reposts)} reposts
                  </p>
                </div>
                <div className="xb-stat">
                  <p className="xb-stat-n">{formatCount(board.stats.pairings)}</p>
                  <p className="xb-stat-label">Pairings</p>
                  <p className="xb-meta">{formatCount(board.stats.featured_pairings)} featured below</p>
                </div>
                <div className="xb-stat">
                  <p className="xb-stat-n">{formatCount(board.stats.genuine_mentions)}</p>
                  <p className="xb-stat-label">Genuine mentions</p>
                  <p className="xb-meta">
                    {formatCount(board.mentions.filtered_out_count)} spam filtered
                  </p>
                </div>
              </div>
              <p className="xb-under xb-mono">
                {formatCount(board.stats.likes)} likes · {formatCount(board.stats.impressions)} views
              </p>
            </div>
            <aside className="xb-panel xb-side">
              <h2>In conversation with, this week</h2>
              {pairings.map((pairing) => (
                <a key={pairing.rank} className="xb-side-link" href={`#pair-${pairing.rank}`}>
                  <span className="xb-side-rank">{rankLabel(pairing.rank)}</span>
                  {pairing.original.author.profile_image_url ? (
                    <img
                      className="xb-avatar"
                      src={pairing.original.author.profile_image_url}
                      alt=""
                      width={40}
                      height={40}
                    />
                  ) : (
                    <span className="xb-avatar xb-avatar-fallback" />
                  )}
                  <span className="xb-side-copy">
                    <span className="xb-name">
                      {pairing.original.author.name}
                      <VerifiedBadge type={pairing.original.author.verified_type} />
                    </span>
                    <span className="xb-signal">{pairing.ranking.signal}</span>
                  </span>
                </a>
              ))}
            </aside>
          </div>

          <section className="xb-section" aria-labelledby="theme-heading">
            <div className="xb-theme">
              <article className="xb-panel xb-theme-card">
                <p className="xb-label">Theme of the week</p>
                <h2 id="theme-heading" className="xb-h2">
                  {board.theme_highlight.theme}
                </h2>
                <p className="xb-label" style={{ marginTop: 18 }}>
                  Section copy · not a quote
                </p>
                <p className="xb-note">{board.theme_highlight.editor_note}</p>
              </article>
              <article className="xb-panel xb-quote-card">
                <p className="xb-quote">
                  <span className="xb-qmark" aria-hidden="true">
                    “
                  </span>
                  {board.theme_highlight.pull_quote.text}
                </p>
                <p className="xb-caption">
                  <span>@{board.account.username}</span>
                  <span aria-hidden="true">·</span>
                  <a href={board.theme_highlight.pull_quote.url} target="_blank" rel="noopener">
                    <time dateTime={board.theme_highlight.pull_quote.created_at}>
                      {formatEt(board.theme_highlight.pull_quote.created_at)}
                    </time>
                  </a>
                  {board.theme_highlight.pull_quote.context_username ? (
                    <span>quoting @{board.theme_highlight.pull_quote.context_username}</span>
                  ) : null}
                  <span className="xb-pill">Verbatim</span>
                </p>
              </article>
            </div>
          </section>

          <section className="xb-section" aria-labelledby="conversation-heading">
            <h2 id="conversation-heading" className="xb-h2">
              In conversation with
            </h2>
            <p className="xb-lede">
              {`They posted the question. We kept the record. The original is on top, the reply from @${board.account.username} underneath. Expert sources come first.`}
            </p>
            <div className="xb-chips">
              {board.conversations.map((item) => (
                <span
                  key={item.with_username}
                  className="xb-chip"
                  title={item.summary}
                >
                  @{item.with_username} ×{item.post_ids?.length ?? 0}
                </span>
              ))}
            </div>
            <div className="xb-pairs">
              {pairings.map((pairing: Pairing) => (
                <PairCard key={pairing.rank} pairing={pairing} account={board.account} />
              ))}
            </div>
            <p className="xb-fine">
              How pairings are ranked: economists and economics institutions first, then verified
              domain authorities and notable publications, then everyone else. Within a tier,
              business verification, audience size, and being an institution or primary source move
              a pairing up.
            </p>
          </section>

          <section className="xb-section" aria-labelledby="thesis-heading">
            <h2 id="thesis-heading" className="xb-h2">
              The thesis, thread by thread
            </h2>
            <div className="xb-threads">
              {board.thesis_threads.map((thread) => (
                <article key={thread.label} className="xb-card xb-thread">
                  <h3>{thread.label}</h3>
                  {thread.posts.map((post) => {
                    const prefix = post.excerpt_prefix ? "[…] " : "";
                    const suffix = post.excerpt_suffix ? " […]" : "";
                    return (
                      <div key={post.post_id}>
                        <p className="xb-excerpt">
                          <a href={post.url} target="_blank" rel="noopener">
                            {prefix}
                            {post.excerpt}
                            {suffix}
                          </a>
                        </p>
                        <p className="xb-post-meta xb-mono">
                          {formatEt(post.created_at)}
                          {post.context_username ? ` · re @${post.context_username}` : ""}
                        </p>
                      </div>
                    );
                  })}
                </article>
              ))}
            </div>
          </section>

          <div className="xb-split">
            <section className="xb-panel xb-block" aria-labelledby="mentions-heading">
              <p className="xb-label">Witnesses at the door</p>
              <h2 id="mentions-heading">Witnesses at the door</h2>
              {mentions.length === 0 ? (
                <div className="xb-mention" style={{ marginTop: 16 }}>
                  <span className="xb-pill xb-pill-dash">Pending approval queue · empty</span>
                  <p className="xb-empty-title">{board.mentions.empty_state}</p>
                  <p className="xb-meta">
                    {formatCount(board.mentions.filtered_out_count)} filtered as spam ·{" "}
                    {formatCount(board.mentions.self_mentions_excluded)} self-mentions excluded.
                  </p>
                </div>
              ) : (
                <div style={{ marginTop: 16 }}>
                  {mentions.map((item, index) => (
                    <MentionCard key={item.id || item.url || index} item={item} />
                  ))}
                </div>
              )}
            </section>
            <TrustPanel />
          </div>

          <section className="xb-panel xb-profile">
            <img
              className="xb-profile-ava"
              src={board.account.profile_image_url}
              alt=""
              width={72}
              height={72}
            />
            <div>
              <h2>
                <span className="xb-name" style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 32, fontWeight: 500 }}>
                  {board.account.display_name}
                  <VerifiedBadge type={board.account.verified_type} />
                  <span className="xb-handle" style={{ fontSize: 14 }}>
                    {board.profile_note.handle}
                  </span>
                </span>
              </h2>
              <p>{board.profile_note.text}</p>
              <div className="xb-actions">
                <a className="xb-btn" href={board.profile_note.url} target="_blank" rel="noopener">
                  Follow {board.profile_note.handle} on X ↗
                </a>
              </div>
            </div>
          </section>

          <p className="xb-foot-note">
            Data: X API v2 (read-only), generated {formatEt(board.generated_at)}. Metrics are a
            snapshot. Posts are quoted verbatim, spelling as posted.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function MentionCard({ item }: { item: MentionItem }) {
  const handle = item.author?.username;
  return (
    <article className="xb-mention">
      {item.approval_status === "pending" ? (
        <span className="xb-pill xb-pill-dash">Pending approval</span>
      ) : null}
      <header className="xb-person" style={{ marginTop: item.approval_status === "pending" ? 10 : 0 }}>
        {item.author?.profile_image_url ? (
          <img className="xb-avatar" src={item.author.profile_image_url} alt="" width={40} height={40} />
        ) : null}
        <div>
          {item.author?.name ? (
            <p className="xb-name">
              {item.author.name}
              <VerifiedBadge type={item.author.verified_type} />
            </p>
          ) : null}
          {handle ? <p className="xb-handle">@{handle}</p> : null}
        </div>
      </header>
      {item.text ? <p className="xb-post">{item.text}</p> : null}
      <footer className="xb-card-foot">
        <span>{item.created_at ? formatEt(item.created_at) : ""}</span>
        {item.url ? (
          <a href={item.url} target="_blank" rel="noopener">
            View on X ↗
          </a>
        ) : null}
      </footer>
    </article>
  );
}

function TrustPanel() {
  const { token } = board;
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    const value = token.token_id;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const kind = token.type.toLowerCase();

  return (
    <section className="xb-panel xb-block" aria-labelledby="trust-heading">
      <div className="xb-trust-head">
        <div className="xb-coin" aria-hidden="true">
          {token.symbol}
        </div>
        <div>
          <p className="xb-label">{token.symbol}</p>
          <h2 id="trust-heading">
            {token.symbol} on {token.network}
          </h2>
        </div>
      </div>
      <p>
        <a className="xb-token xb-mono" href={token.hashscan_url} target="_blank" rel="noopener">
          {token.token_id}
        </a>
      </p>
      <div className="xb-actions">
        <button type="button" className="xb-btn" onClick={onCopy}>
          {copied ? "Copied" : "Copy"}
        </button>
        <a className="xb-btn-ghost" href={token.hashscan_url} target="_blank" rel="noopener">
          View on HashScan ↗
        </a>
      </div>
      <p className="xb-facts xb-mono">
        {token.name} · {kind} · {token.decimals} decimals · {token.total_supply} supply · treasury{" "}
        {token.treasury}
      </p>
      <p className="xb-copy">{token.copy}</p>
      <p className="xb-copy">
        The fee and the acknowledgement unit. Not a second printer, and not legal tender. A write is
        about $0.001. One coin is one acknowledgement, not a share of the treasury. A limit stated in
        $Trust cannot grow itself. The supply minted so far is 100,000,000,000 TRUST. At{" "}
        {token.decimals} decimals the chain stores 1,000,000,000,000,000 smallest units. That is not
        a cap.
      </p>
    </section>
  );
}
