import { auth } from "@/firebase"
import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth"

async function logIn(email: string, password: string): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, password)
}

async function logOut(): Promise<void> {
  return await signOut(auth)
}

export { logIn, logOut }
