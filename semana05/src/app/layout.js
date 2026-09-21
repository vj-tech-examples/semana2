import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'Minhas receitas',
  description: 'Mini-app de receitas — Semana 05',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-zinc-900 text-zinc-100">
        <header className="border-b border-zinc-800 p-4">
          <nav className="flex gap-4">
            <Link href="/" className="hover:text-emerald-400">Receitas</Link>
            <Link href="/nova" className="hover:text-emerald-400">Nova receita</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}