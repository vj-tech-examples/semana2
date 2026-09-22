'use client'

import { useUsuario } from './useUsuario'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Link from 'next/link'

export default function Home() {
  const { usuario, carregando } = useUsuario()

  if (carregando) {
    return <main className="p-8">Carregando...</main>
  }

  if (!usuario) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Minhas receitas</h1>
        <p className="mb-4">Você precisa entrar para ver suas receitas.</p>
        <Link href="/login" className="text-emerald-400 underline">
          Ir para o login
        </Link>
      </main>
    )
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-2">Minhas receitas</h1>
      <p className="text-zinc-400 mb-6">Logado como {usuario.email}</p>

      <button
        onClick={() => signOut(auth)}
        className="bg-zinc-700 rounded-lg px-4 py-2"
      >
        Sair
      </button>
    </main>
  )
}