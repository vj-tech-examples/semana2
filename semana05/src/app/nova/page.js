'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUsuario } from '../useUsuario'
import { criarReceita } from '@/services/receitas'

export default function NovaReceita() {
  const { usuario, carregando } = useUsuario()
  const router = useRouter()

  const [nome, setNome] = useState('')
  const [categoria, setCategoria] = useState('')
  const [tempo, setTempo] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  if (carregando) {
    return <main className="p-8">Carregando...</main>
  }

  if (!usuario) {
    return <main className="p-8">Você precisa entrar para criar receitas.</main>
  }

  async function salvar() {
    if (!nome.trim()) {
      setErro('O nome é obrigatório.')
      return
    }

    setErro('')
    setSalvando(true)

    try {
      await criarReceita(usuario.uid, { nome, categoria, tempo })
      router.push('/')
    } catch (e) {
      setErro('Não foi possível salvar.')
      console.error(e)
    } finally {
      setSalvando(false)
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Nova receita</h1>

      <div className="flex flex-col gap-3 max-w-sm">
        <input
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Nome da receita"
          className="bg-zinc-800 rounded-lg p-3"
        />
        <input
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          placeholder="Categoria"
          className="bg-zinc-800 rounded-lg p-3"
        />
        <input
          value={tempo}
          onChange={e => setTempo(e.target.value)}
          placeholder="Tempo de preparo"
          className="bg-zinc-800 rounded-lg p-3"
        />

        <button
          onClick={salvar}
          disabled={salvando}
          className="bg-emerald-600 rounded-lg px-4 py-2 disabled:opacity-50"
        >
          {salvando ? 'Salvando...' : 'Salvar'}
        </button>

        {erro && <p className="text-red-400">{erro}</p>}
      </div>
    </main>
  )
}