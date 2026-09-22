'use client'

import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function useUsuario() {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const parar = onAuthStateChanged(auth, (u) => {
      setUsuario(u)
      setCarregando(false)
    })
    return parar
  }, [])

  return { usuario, carregando }
}