export function VerifiedBadge({ type }: { type?: string | null }) {
  if (type === "business") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-label="Verified organization" role="img">
        <rect x="1" y="1" width="14" height="14" rx="3.5" fill="#e2b719" />
        <path
          d="M4.2 8.15 6.7 10.55 11.8 5.25"
          fill="none"
          stroke="#0c0d0c"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "blue") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-label="Verified" role="img">
        <circle cx="8" cy="8" r="7" fill="#1d9bf0" />
        <path
          d="M4.4 8.15 6.85 10.5 11.6 5.4"
          fill="none"
          stroke="#fff"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return null;
}
