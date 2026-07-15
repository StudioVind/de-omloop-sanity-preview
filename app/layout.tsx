import type {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {VisualEditing} from 'next-sanity/visual-editing'
import {SanityLive} from '@/sanity/live'
import './globals.css'

export const metadata: Metadata = {
  title: 'De Omloop — fietsenwerkplaats in Nijmegen',
  description: 'De Omloop is de kleurrijke fietsenwerkplaats en fietsclub van Nijmegen.',
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const preview = (await draftMode()).isEnabled
  return (
    <html lang="nl">
      <body>
        {children}
        <SanityLive />
        {preview && <VisualEditing />}
      </body>
    </html>
  )
}
