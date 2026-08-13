import { ClerkProvider } from '@clerk/clerk-react'
import BookmarksListInner from './BookmarksList'

export default function BookmarksIsland() {
  const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY as string | undefined
  // Clerk optional: BookmarksList calls useUser(), which needs a ClerkProvider
  // ancestor. Without a key we cannot mount one (empty key throws) — show a
  // graceful empty state instead of crashing the island.
  if (!publishableKey) {
    return (
      <div className="empty">
        <p className="empty-h">Bookmarks are unavailable on this site.</p>
        <p className="empty-d">
          Sign-in is not configured here, so cross-device bookmark sync is off. The full blog is
          readable without an account.
        </p>
        <a href="/blog/" className="btn">
          Browse posts
        </a>
        <style>{`
          .empty {
            padding: 3rem 1.5rem; text-align: center;
            background: var(--color-bg-soft);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-card);
          }
          .empty-h { font-weight: 600; margin: 0 0 0.25rem; font-size: 1.0625rem; }
          .empty-d { color: var(--color-fg-muted); margin: 0 0 1.25rem; font-size: 0.9375rem; max-width: 40ch; margin-inline: auto; }
          .btn {
            display: inline-flex; align-items: center; gap: 0.5rem;
            height: 40px; padding-inline: 1.125rem;
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-button);
            color: var(--color-fg);
            font-weight: 500;
            text-decoration: none;
          }
          .btn:hover { border-color: color-mix(in oklab, var(--color-accent) 50%, var(--color-border)); }
        `}</style>
      </div>
    )
  }
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <BookmarksListInner />
    </ClerkProvider>
  )
}
