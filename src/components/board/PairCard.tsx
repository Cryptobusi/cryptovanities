import type { BoardAccount, Media, Pairing } from "@/data/board.types";
import { formatCount, formatEt, formatFollowers, isPlayable, isPortrait, mediaSrc, rankLabel } from "./format";
import { VerifiedBadge } from "./VerifiedBadge";

const CLAMP_AT = 420;

type PairCardProps = {
  pairing: Pairing;
  account: BoardAccount;
};

export function PairCard({ pairing, account }: PairCardProps) {
  const { original, reply, ranking, relation, rank } = pairing;
  const originalLong = original.text.length > CLAMP_AT;
  const replyKind = (reply.kind || (relation === "replied_to" ? "reply" : "quote")).toLowerCase();
  const replyPill = replyKind === "reply" ? "Reply" : "Quote";
  const replyLine =
    relation === "replied_to"
      ? `↳ Replied by @${account.username}`
      : `↳ Quoted by @${account.username}`;

  return (
    <article className="xb-pair" id={`pair-${rank}`}>
      <div className="xb-rank">
        <span className="xb-rank-n">{rankLabel(rank)}</span>
        <span className="xb-rank-tier">{ranking.tier_label}</span>
        <span className="xb-rank-signal">{ranking.signal}</span>
      </div>

      <div className="xb-original">
        <header className="xb-person">
          <Avatar src={original.author.profile_image_url} name={original.author.name} />
          <div className="xb-person-copy">
            <p className="xb-name">
              {original.author.name}
              <VerifiedBadge type={original.author.verified_type} />
            </p>
            <p className="xb-handle">
              <span>@{original.author.username}</span>
              <span aria-hidden> · </span>
              <a href={original.url} target="_blank" rel="noopener">
                <time dateTime={original.created_at}>{formatEt(original.created_at)}</time>
              </a>
            </p>
          </div>
          <span className="xb-pill xb-pill-original">Original</span>
        </header>
        <p className={originalLong ? "xb-post xb-clamp" : "xb-post"}>{original.text}</p>
        {originalLong ? (
          <a className="xb-more" href={original.url} target="_blank" rel="noopener">
            Read the full post on X ↗
          </a>
        ) : null}
        <MediaRow media={original.media} href={original.url} handle={original.author.username} />
        <footer className="xb-card-foot">
          <span>
            {original.author.followers != null
              ? `${formatFollowers(original.author.followers)} followers`
              : ""}
          </span>
          <a href={original.url} target="_blank" rel="noopener">
            View on X ↗
          </a>
        </footer>
      </div>

      <div className="xb-join" aria-hidden="true" />

      <div className="xb-reply">
        <p className="xb-reply-line">{replyLine}</p>
        <header className="xb-person">
          <Avatar src={account.profile_image_url} name={account.display_name} />
          <div className="xb-person-copy">
            <p className="xb-name">
              {account.display_name}
              <VerifiedBadge type={account.verified_type} />
            </p>
            <p className="xb-handle">
              <span>@{account.username}</span>
              <span aria-hidden> · </span>
              <a href={reply.url} target="_blank" rel="noopener">
                <time dateTime={reply.created_at}>{formatEt(reply.created_at)}</time>
              </a>
            </p>
          </div>
          <span className="xb-pill">{replyPill}</span>
        </header>
        <p className="xb-post xb-post-reply">{reply.text}</p>
        <MediaRow media={reply.media} href={reply.url} handle={account.username} thumb />
        <footer className="xb-card-foot">
          <span>
            {formatCount(reply.metrics?.likes)} likes · {formatCount(reply.metrics?.impressions)} views
          </span>
          <a href={reply.url} target="_blank" rel="noopener">
            View on X ↗
          </a>
        </footer>
      </div>
    </article>
  );
}

function Avatar({ src, name }: { src?: string; name: string }) {
  if (!src) {
    return <span className="xb-avatar xb-avatar-fallback" aria-hidden="true" />;
  }
  return <img className="xb-avatar" src={src} alt="" width={40} height={40} loading="lazy" />;
}

function MediaRow({
  media,
  href,
  handle,
  thumb = false,
}: {
  media?: Media[];
  href: string;
  handle: string;
  thumb?: boolean;
}) {
  if (!media?.length) return null;
  return (
    <div className="xb-media-row">
      {media.map((item, index) => {
        const src = mediaSrc(item);
        if (!src) return null;
        const play = isPlayable(item.type);
        const portrait = isPortrait(item.width, item.height);
        return (
          <a
            key={`${src}-${index}`}
            className={thumb ? "xb-media xb-media-thumb" : portrait ? "xb-media xb-media-portrait" : "xb-media"}
            href={href}
            target="_blank"
            rel="noopener"
          >
            <img src={src} alt={`Photo attached to @${handle}'s post`} loading="lazy" />
            {play ? (
              <>
                <span className="xb-play" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 22 22">
                    <circle cx="11" cy="11" r="11" fill="rgba(12,13,12,.62)" />
                    <path d="M9 7.2v7.6l6.2-3.8L9 7.2Z" fill="#f3f0e8" />
                  </svg>
                </span>
                <span className="xb-video-tag">Video · play on X</span>
              </>
            ) : null}
          </a>
        );
      })}
    </div>
  );
}
