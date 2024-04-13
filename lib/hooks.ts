import { auth } from "@/firebase"
import { User, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function useUserSession(initialUser: User | null = null) {
  const [user, setUser] = useState(initialUser)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser)
    })
    return () => {
      unsubscribe()
    }
  }, [auth])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (user === undefined) return
      if (user?.email !== authUser?.email) {
        router.refresh()
      }
    })

    return () => {
      unsubscribe()
    }
  }, [user, auth, router])

  return user
}

export { useUserSession }
