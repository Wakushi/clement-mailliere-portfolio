import { db } from "../firebase"
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
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
  return medias.sort((a, b) => a.order - b.order)
}

export async function createMedia({
  title,
  description,
  imageUrl,
  type,
}: {
  title: string
  description: string
  imageUrl: string
  type: Media["type"]
}): Promise<boolean> {
  try {
    const targetCollection = await fetchMedias(type)
    await addDoc(collection(db, "medias"), {
      title: title,
      description: description,
      imageUrl: imageUrl,
      type: type,
      order: targetCollection.length,
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
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

export async function updateMediaListOrder(medias: Media[]) {
  const batch = writeBatch(db)

  medias.forEach((media) => {
    const mediaRef = doc(db, "medias", media.id)
    batch.update(mediaRef, { order: media.order })
  })

  try {
    await batch.commit()
    console.log("Batched update successful")
  } catch (error) {
    console.error("Failed to update media order:", error)
  }
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
