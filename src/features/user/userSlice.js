// IMPORT ---------------------------------------------------
// SECTION
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserToLocalStorage,
} from "../../utils/localStorage"

import { auth, db } from "../../firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth"
import {
  serverTimestamp,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import { getRandomColor } from "../../utils/helpers"
import { toast } from "react-toastify"

// CONTENT -----------------------------------------------------
// SECTION
const provider = new GoogleAuthProvider()

const initialState = {
  isLoading: false,
  loggedIn: false,
  user: getUserFromLocalStorage(),
}

const storeImage = async (image) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage()
    const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused")
            break
          case "running":
            console.log("Upload is running")
            break
        }
      },
      (err) => {
        reject(err)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL)
        })
      }
    )
  })
}

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (formData, thunkAPI) => {
    const { firstName, lastName } = formData
    console.log(auth.currentUser)
    try {
      // update firebase auth
      if (firstName) {
        if (auth.currentUser.displayName !== `${firstName} ${lastName}`) {
          await updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`,
          })
        }
      } else {
        if (auth.currentUser.displayName !== lastName) {
          await updateProfile(auth.currentUser, {
            displayName: lastName,
          })
        }
      }

      // update firestore
      let formCopy = { ...formData }
      formCopy.timestamp = serverTimestamp()
      delete formCopy.password
      const docRef = doc(db, "users", auth.currentUser.uid)
      console.log(auth.currentUser)
      await updateDoc(docRef, formCopy)
      delete formCopy.timestamp
      return formCopy
    } catch (err) {
      return thunkAPI.rejectWithValue(
        `Could not update the profile. ${err.message}`
      )
    }
  }
)

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, thunkAPI) => {
    const { lastName, firstName, email, password, profileImg } = formData
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      updateProfile(auth.currentUser, {
        displayName: firstName ? `${firstName} ${lastName}` : lastName,
      })

      const { user } = userCredential
      let photoURL = ""

      if (profileImg) {
        photoURL = await Promise.resolve(storeImage(profileImg)).catch(
          (err) => {
            toast.error("image not uploaded")
            return
          }
        )
      }

      const formCopy = {
        ...formData,
        profileColor: getRandomColor(),
        profileImg: photoURL,
      }

      delete formCopy.password
      formCopy.timestamp = serverTimestamp()
      await setDoc(doc(db, "users", user.uid), formCopy)
      delete formCopy.timestamp
      return formCopy
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const loginUserWithGoogle = createAsyncThunk(
  "user/loginUserWithGoogle",
  async () => {
    try {
      const res = await signInWithPopup(auth, provider)
      const { user } = res

      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      const myUser = {
        name: user.displayName,
        email: user.email,
        title: "",
        lastName: "",
        firstName: "",
        birthday: "",
        profileImg: user.photoURL,
        profileColor: getRandomColor(),
        timestamp: serverTimestamp(),
      }

      if (!docSnap.exists()) await setDoc(docRef, myUser)
      delete myUser.timestamp
      return myUser
    } catch (error) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      // get data from firestore
      const { user } = userCredential
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      const userData = docSnap.data()
      delete userData.timestamp

      return userData
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (email, thunkAPI) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkAuthStatus: (state) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          state.loggedIn = true
        }
        state.isLoading = false
      })
    },
    logoutUser: (state) => {
      state.isLoading = true
      auth.signOut()
      state.isLoading = false
      state.loggedIn = false
      state.user = null
      removeUserToLocalStorage()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.loggedIn = true
        state.user = payload
        addUserToLocalStorage(payload)
        toast.success(`Welcome to XTORE, ${payload.title}. ${payload.lastName}`)
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(loginUserWithGoogle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUserWithGoogle.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.loggedIn = true
        state.user = payload
        addUserToLocalStorage(payload)
        toast.success(`Welcome back, ${payload.name}.`)
      })
      .addCase(loginUserWithGoogle.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.loggedIn = true
        state.user = payload
        addUserToLocalStorage(payload)
        toast.success(`Welcome back. ${payload.lastName}`)
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.loggedIn = true
        removeUserToLocalStorage()
        addUserToLocalStorage(payload)
        toast.success(`Profile updated.`)
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export const { checkAuthStatus, logoutUser } = userSlice.actions
export default userSlice.reducer
