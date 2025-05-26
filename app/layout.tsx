import type React from "react"
import "@mantine/core/styles.css"
import { ColorSchemeScript, MantineProvider } from "@mantine/core"
import { theme } from "./theme"

export const metadata = {
  title: "User Directory",
  description: "A modern React application demonstrating data-fetching with SWR and Mantine UI"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  )
}
