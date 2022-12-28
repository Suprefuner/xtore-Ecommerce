// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-OM2OQUT7smI7i6hy61gVkufuGz1Kric",
  authDomain: "xtore-clone.firebaseapp.com",
  projectId: "xtore-clone",
  storageBucket: "xtore-clone.appspot.com",
  messagingSenderId: "805804147165",
  appId: "1:805804147165:web:3b7950eb1a9cdc545d3634",
}

// Initialize Firebase
// export const app = initializeApp(firebaseConfig)
export const auth = getAuth(initializeApp(firebaseConfig))
export const db = getFirestore()
