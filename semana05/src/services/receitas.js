import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function listarReceitas(uid) {
  const q = query(collection(db, 'receitas'), where('uid', '==', uid))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function criarReceita(uid, dados) {
  await addDoc(collection(db, 'receitas'), {
    ...dados,
    uid,
    criadoEm: new Date(),
  })
}