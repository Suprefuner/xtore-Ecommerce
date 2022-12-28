import { useState, useEffect } from "react"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      }
      setIsLoading(false)
    })
  }, [])

  return { loggedIn, isLoading }
}
