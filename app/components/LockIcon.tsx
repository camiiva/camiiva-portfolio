export default function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M6 8.5V6a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="4.5" y="8.5" width="11" height="8" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
