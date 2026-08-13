import { ClerkProvider } from '@clerk/clerk-react'
import BookmarkButtonInner from './BookmarkButton'

interface Props {
  slug: string
  url: string
  title: string
  description?: string
  category?: string
  pubDate?: string
}

export default function BookmarkButtonIsland(props: Props) {
  const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY as string | undefined
  // Clerk optional: BookmarkButton calls useUser(), which needs a ClerkProvider
  // ancestor. Without a key we cannot mount one (empty key throws), so hide the
  // button rather than crash the island. Public reading is unaffected.
  if (!publishableKey) return null
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <BookmarkButtonInner {...props} />
    </ClerkProvider>
  )
}
