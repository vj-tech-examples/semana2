'use client'

import { useState, useEffect } from 'react'
import { useUsuario } from './useUsuario'
import { listarReceitas, atualizarReceita, apagarReceita } from '@/services/receitas'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Link from 'next/link'

export default function Home() {
  const { usuario, carregando } = useUsuario()
  const [receitas, setReceitas] = useState([])
  const [buscando, setBuscando] = useState(false)
  const [editando, setEditando] = useState(null)
  const [nomeEditado, setNomeEditado] = useState('')
  const [categoriaEditada, setCategoriaEditada] = useState('')

  async function carregar(uid) {
    setBuscando(true)
    const lista = await listarReceitas(uid)
    setReceitas(lista)
    setBuscando(false)
  }

  useEffect(() => {
    if (!usuario) return
    carregar(usuario.uid)
  }, [usuario])

  function comecarEdicao(receita) {
    setEditando(receita.id)
    setNomeEditado(receita.nome)
    setCategoriaEditada(receita.categoria)
  }

  async function salvarEdicao(id) {
    await atualizarReceita(id, { nome: nomeEditado, categoria: categoriaEditada })
    setEditando(null)
    await carregar(usuario.uid)
  }

  async function remover(id) {
    await apagarReceita(id)
    await carregar(usuario.uid)
  }

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
            {editando === receita.id ? (
              <div className="flex flex-col gap-2">
                <input
                  value={nomeEditado}
                  onChange={e => setNomeEditado(e.target.value)}
                  className="bg-zinc-900 rounded p-2"
                />
                <input
                  value={categoriaEditada}
                  onChange={e => setCategoriaEditada(e.target.value)}
                  className="bg-zinc-900 rounded p-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => salvarEdicao(receita.id)}
                    className="bg-emerald-600 rounded px-3 py-1 text-sm"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditando(null)}
                    className="bg-zinc-700 rounded px-3 py-1 text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold">{receita.nome}</h2>
                <p className="text-sm text-emerald-400">{receita.categoria}</p>
                <p className="text-sm text-zinc-400 mb-3">{receita.tempo}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => comecarEdicao(receita)}
                    className="bg-zinc-700 rounded px-3 py-1 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => remover(receita.id)}
                    className="bg-red-900 rounded px-3 py-1 text-sm"
                  >
                    Apagar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}