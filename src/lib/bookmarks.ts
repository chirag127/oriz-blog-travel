/**
 * Bookmarks library — localStorage-only store.
 *
 * Bookmarks live in localStorage under `oriz:blog:bookmarks` (per-device).
 * Free, client-side, no backend, no auth dependency.
 *
 * The post-detail Bookmark button + /bookmarks page both call into this
 * module — never touch localStorage directly elsewhere.
 *
 * The `user` param is accepted for API compatibility with callers but is
 * unused (bookmarks are device-local; no cross-device sync).
 */

/** Minimal user shape — compatible with Clerk's user object. */
export interface AuthUser {
  id: string
}

export interface Bookmark {
  /** post id, e.g. "ai-rag-pipelines-real-world" */
  slug: string
  url: string
  title: string
  description?: string
  category?: string
  pubDate?: string
  savedAt: string
}

const LS_KEY = 'oriz:blog:bookmarks'

function readLocal(): Bookmark[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]') as Bookmark[]
  } catch {
    return []
  }
}

function writeLocal(items: Bookmark[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(items))
  } catch {
    // ignore quota / private-mode failures
  }
}

/** True iff `slug` is bookmarked. */
export async function isBookmarked(slug: string, _user: AuthUser | null): Promise<boolean> {
  return readLocal().some((b) => b.slug === slug)
}

/** Add a bookmark. Optimistic — caller can re-render immediately. */
export async function addBookmark(b: Bookmark, _user: AuthUser | null): Promise<void> {
  const items = readLocal().filter((x) => x.slug !== b.slug)
  items.push(b)
  writeLocal(items)
}

/** Remove a bookmark. */
export async function removeBookmark(slug: string, _user: AuthUser | null): Promise<void> {
  writeLocal(readLocal().filter((b) => b.slug !== slug))
}

/** Read all bookmarks (one-shot). */
export async function listBookmarks(_user: AuthUser | null): Promise<Bookmark[]> {
  return readLocal().sort((a, b) => b.savedAt.localeCompare(a.savedAt))
}

/**
 * Subscribe to bookmark updates. Returns an unsubscribe.
 * localStorage-backed, so this is a one-shot read.
 */
export function watchBookmarks(_user: AuthUser | null, cb: (items: Bookmark[]) => void): () => void {
  cb(readLocal().sort((a, b) => b.savedAt.localeCompare(a.savedAt)))
  return () => {}
}

/** No-op — kept for API compatibility (no backend to merge into). */
export async function mergeOnSignIn(_user: AuthUser): Promise<number> {
  return 0
}

// ---- Recently viewed (localStorage; never synced) ----------------------

const RV_KEY = 'oriz:blog:recent'
const RV_MAX = 10

export interface RecentEntry {
  slug: string
  url: string
  title: string
  visitedAt: string
}

export function pushRecent(entry: Omit<RecentEntry, 'visitedAt'>): void {
  if (typeof window === 'undefined') return
  try {
    const cur: RecentEntry[] = JSON.parse(localStorage.getItem(RV_KEY) ?? '[]')
    const filtered = cur.filter((r) => r.slug !== entry.slug)
    filtered.unshift({ ...entry, visitedAt: new Date().toISOString() })
    localStorage.setItem(RV_KEY, JSON.stringify(filtered.slice(0, RV_MAX)))
  } catch {
    // ignore
  }
}

export function listRecent(): RecentEntry[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(RV_KEY) ?? '[]') as RecentEntry[]
  } catch {
    return []
  }
}
