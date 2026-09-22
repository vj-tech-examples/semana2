'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  async function entrar() {
    setErro('')
    try {
      await signInWithEmailAndPassword(auth, email, senha)
    } catch (e) {
      setErro('Não foi possível entrar. Confira o e-mail e a senha.')
      console.error(e)
    }
  }

  async function criarConta() {
    setErro('')
    try {
      await createUserWithEmailAndPassword(auth, email, senha)
    } catch (e) {
      setErro('Não foi possível criar a conta.')
      console.error(e)
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Entrar</h1>

      <div className="flex flex-col gap-3 max-w-sm">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="E-mail"
          className="bg-zinc-800 rounded-lg p-3"
        />
        <input
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          placeholder="Senha"
          className="bg-zinc-800 rounded-lg p-3"
        />

        <div className="flex gap-3">
          <button onClick={entrar} className="bg-emerald-600 rounded-lg px-4 py-2">
            Entrar
          </button>
          <button onClick={criarConta} className="bg-zinc-700 rounded-lg px-4 py-2">
            Criar conta
          </button>
        </div>

        {erro && <p className="text-red-400">{erro}</p>}
      </div>
    </main>
  )
}