import { db } from "../firebase"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore"
import { Demo, Media } from "./types"
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"

const storage = getStorage()

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
  isVideo = false,
  fileName = "",
}: {
  title: string
  description: string
  imageUrl: string
  type: Media["type"]
  isVideo?: boolean
  fileName?: string
}): Promise<boolean> {
  try {
    const targetCollection = await fetchMedias(type)
    await addDoc(collection(db, "medias"), {
      title: title,
      description: description,
      imageUrl: imageUrl,
      type: type,
      order: targetCollection.length,
      isVideo: isVideo,
      fileName: fileName,
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
    if (media.isVideo && media.fileName) {
      await deleteVideoFile(media.fileName)
    }
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

export async function uploadVideo(
  file: File,
  demo?: boolean,
  type?: Media["type"]
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (file) {
      const storageRef = ref(
        storage,
        demo ? `videos/demo-${Date.now()}.mp4` : `mediaVideos/${file.name}`
      )
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("Upload is " + progress + "% done")
        },
        (error) => {
          console.error(error)
          reject(error)
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              if (demo) {
                await setDemoVideoUrl({ url: downloadURL })
                resolve()
              } else {
                await createMedia({
                  title: file.name,
                  description: "",
                  imageUrl: downloadURL,
                  type: type || "drawing",
                  isVideo: true,
                  fileName: file.name,
                })
                resolve()
              }
            }
          )
        }
      )
    }
  })
}
export async function deleteVideoFile(fileName: string): Promise<boolean> {
  const videoRef = ref(storage, `mediaVideos/${fileName}`)
  const videoUrlRef = collection(db, "mediaVideos")
  try {
    await deleteObject(videoRef)
    const querySnapshot = await getDocs(videoUrlRef)
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref)
    })
    return true
  } catch (error) {
    console.error("Error deleting file:", error)
    return false
  }
}

export async function deleteDemoVideo(docId: string): Promise<boolean> {
  try {
    const videoUrlRef = collection(db, "videoUrl")
    const docRef = doc(videoUrlRef, docId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      const url = data.url
      const path = decodeURIComponent(url.split("/o/")[1].split("?")[0])
      const videoRef = ref(storage, path)

      await deleteObject(videoRef)
      await deleteDoc(docRef)
      return true
    }
    return false
  } catch (error) {
    console.error("Error deleting file:", error)
    return false
  }
}

export async function setDemoVideoUrl({
  url,
}: {
  url: string
}): Promise<boolean> {
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

export async function getDemos() {
  const videos: Demo[] = []

  const videoUrlRef = collection(db, "videoUrl")
  const querySnapshot = await getDocs(videoUrlRef)

  querySnapshot.forEach((doc) => {
    videos.push({
      id: doc.id,
      ...doc.data(),
    } as Demo)
  })

  return videos
}
