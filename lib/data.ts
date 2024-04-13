import { db } from "../firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { Media } from "./types"

export async function fetchMedias(type?: Media["type"]) {
  const medias: Media[] = []
  const mediasRef = collection(db, "medias")
  const q = type ? query(mediasRef, where("type", "==", type)) : mediasRef
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    medias.push({
      id: doc.id,
      ...doc.data(),
    } as Media)
  })
  return medias
}
