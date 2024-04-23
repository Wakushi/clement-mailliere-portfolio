import { db } from "../firebase"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore"
import { Media } from "./types"
import { deleteObject, getStorage, ref } from "firebase/storage"

export async function fetchMedias(type?: Media["type"]) {
  "no-store"
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

export async function updateMedia(media: Media): Promise<boolean> {
  try {
    await setDoc(doc(db, "medias", media.id), {
      title: media.title,
      description: media.description,
      imageUrl: media.imageUrl,
      type: media.type,
      order: media.order,
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function updateMediaListOrder(medias: Media[]): Promise<Media[]> {
  const batch = writeBatch(db)
  medias.forEach((media) => {
    const mediaRef = doc(db, "medias", media.id)
    batch.update(mediaRef, { order: media.order })
  })

  try {
    await batch.commit()
    const updatedMedias = await fetchMedias(medias[0].type)
    return updatedMedias
  } catch (error) {
    console.error("Failed to update media order:", error)
    return []
  }
}

export async function deleteMedia(media: Media): Promise<boolean> {
  try {
    await deleteDoc(doc(db, "medias", media.id))
    return true
  } catch (error) {
    console.error(error)
    return false
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

export async function deleteVideo(path: string): Promise<boolean> {
  const storage = getStorage()
  const videoRef = ref(storage, path)
  try {
    await deleteObject(videoRef)
    return true
  } catch (error) {
    console.error("Error deleting file:", error)
    return false
  }
}

export async function setVideoUrl({ url }: { url: string }): Promise<boolean> {
  try {
    await addDoc(collection(db, "videoUrl"), {
      url: url,
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function getVideoUrl() {
  const videoUrlRef = collection(db, "videoUrl")
  const querySnapshot = await getDocs(videoUrlRef)
  let url = ""
  querySnapshot.forEach((doc) => {
    url = doc.data().url
  })
  return url
}
