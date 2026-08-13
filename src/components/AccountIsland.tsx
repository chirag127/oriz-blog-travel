/**
 * Wraps ClerkProvider around AccountPanel for the static Astro site.
 * Mount with client:load — this is the single React island entry point
 * for auth on the account page.
 *
 * Clerk is OPTIONAL. When PUBLIC_CLERK_PUBLISHABLE_KEY is unset we must NOT
 * mount ClerkProvider (an empty key makes @clerk/clerk-react throw and crash
 * the island) — degrade to a static "account features unavailable" note.
 */
import { ClerkProvider } from '@clerk/clerk-react'
import { AccountPanel } from './AccountPanel'

interface Props {
  siteName?: string
}

export default function AccountIsland({ siteName = 'oriz / blog' }: Props) {
  const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY as string | undefined

  if (!publishableKey) {
    return (
      <div data-oriz-account data-oriz-account-state="unavailable">
        <h2 data-oriz-account-heading>{siteName}</h2>
        <p data-oriz-account-note>
          Account sign-in is not available on this site. The full blog is readable without an
          account, and bookmarks are saved on this device.
        </p>
      </div>
    )
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <AccountPanel siteName={siteName} signOutRedirectUrl="/" />
    </ClerkProvider>
  )
}
