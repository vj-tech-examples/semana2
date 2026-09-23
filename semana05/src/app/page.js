'use client'

import { useState, useEffect } from 'react'
import { useUsuario } from './useUsuario'
import { listarReceitas } from '@/services/receitas'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Link from 'next/link'

export default function Home() {
  const { usuario, carregando } = useUsuario()
  const [receitas, setReceitas] = useState([])
  const [buscando, setBuscando] = useState(false)

  useEffect(() => {
    if (!usuario) return

    async function carregar() {
      setBuscando(true)
      const lista = await listarReceitas(usuario.uid)
      setReceitas(lista)
      setBuscando(false)
    }

    carregar()
  }, [usuario])

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Minhas receitas</h1>
          <p className="text-zinc-400 text-sm">Logado como {usuario.email}</p>
        </div>
        <button
          onClick={() => signOut(auth)}
          className="bg-zinc-700 rounded-lg px-4 py-2"
        >
          Sair
        </button>
      </div>

      {buscando && <p>Carregando receitas...</p>}

      {!buscando && receitas.length === 0 && (
        <p className="text-zinc-400">
          Nenhuma receita ainda.{' '}
          <Link href="/nova" className="text-emerald-400 underline">
            Criar a primeira
          </Link>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {receitas.map(receita => (
          <div key={receita.id} className="bg-zinc-800 rounded-xl p-4">
            <h2 className="text-lg font-semibold">{receita.nome}</h2>
            <p className="text-sm text-emerald-400">{receita.categoria}</p>
            <p className="text-sm text-zinc-400">{receita.tempo}</p>
          </div>
        ))}
      </div>
    </main>
  )
}