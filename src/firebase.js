import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBDybKTry_vo9teerkUSwBW4O64eC0WgTM",

  authDomain: "blog-app-2b10e.firebaseapp.com",

  projectId: "blog-app-2b10e",

  storageBucket: "blog-app-2b10e.appspot.com",

  messagingSenderId: "663644649985",

  appId: "1:663644649985:web:95cea1fda102c9b6889e00"

}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)


setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("🔥 Auth persistence AKTIF")
  })
  .catch((err) => {
    console.log("❌ Persistence error:", err)
  })