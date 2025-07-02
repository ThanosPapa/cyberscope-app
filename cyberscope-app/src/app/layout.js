import { Inter } from 'next/font/google'
import './globals.css'
import StyledComponentsRegistry from './lib/registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cyberscope Crypto App',
  description: 'A lightweight full-stack application that provides information about cryptocurrency prices.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}