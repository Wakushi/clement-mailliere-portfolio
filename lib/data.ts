import { db } from "../firebase"
import {
  addDoc,
  collection,
  doc,
  getDocs,
  or,
  query,
  setDoc,
  where,
} from "firebase/firestore"
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

export async function createMedia(media: Media) {
  const targetCollection = await fetchMedias(media.type)
  await addDoc(collection(db, "medias"), {
    title: media.title,
    description: media.description,
    imageUrl: media.imageUrl,
    type: media.type,
    order: targetCollection.length,
  })
}

export async function updateMedia(media: Media) {
  await setDoc(doc(db, "medias", media.id), {
    title: media.title,
    description: media.description,
    imageUrl: media.imageUrl,
    type: media.type,
    order: media.order,
  })
}

export async function generateImage(imageFile: File): Promise<string> {
  const formData = new FormData()
  formData.append("image", imageFile)

  const myHeaders = {
    Authorization: "Client-ID 983bdef3f9b0d7a",
  }

  const response = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: myHeaders,
    body: formData,
  })

  const data = await response.json()
  return data.data.link
}
