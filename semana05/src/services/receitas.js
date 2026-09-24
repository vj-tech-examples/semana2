import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
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

export async function atualizarReceita(id, dados) {
  await updateDoc(doc(db, 'receitas', id), dados)
}

export async function apagarReceita(id) {
  await deleteDoc(doc(db, 'receitas', id))
}