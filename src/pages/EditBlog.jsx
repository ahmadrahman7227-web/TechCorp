import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { db } from "../firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"

// AUTH
import { AuthContext } from "../context/AuthContext"

export default function EditBlog() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [form, setForm] = useState({
    title: "",
    category: "",
    img: "",
    content: "",
  })

  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState("")

  // ✅ HANDLE TEXT INPUT (FIX ERROR)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // FETCH DATA
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id)
        const snap = await getDoc(docRef)

        if (snap.exists()) {
          const data = snap.data()

          // 🔐 proteksi owner
          if (user && user.uid !== data.userId) {
            alert("Bukan blog kamu!")
            navigate("/")
            return
          }

          setForm(data)
          setPreview(data.img) // ✅ tampilkan gambar lama
        } else {
          // fallback local
          const stored = JSON.parse(localStorage.getItem("blogs")) || []
          const blog = stored.find((b) => b.id == id)

          if (blog) {
            setForm(blog)
            setPreview(blog.img)
          }
        }
      } catch (err) {
        console.error(err)
      }

      setLoading(false)
    }

    fetchBlog()
  }, [id, user])

  // ✅ HANDLE IMAGE (FIX PREVIEW)
  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar!")
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 2MB!")
      return
    }

    setImageFile(file)

    const previewUrl = URL.createObjectURL(file)
    setPreview(previewUrl)
  }

  // CLOUDINARY
  const uploadImage = async (file) => {
  const data = new FormData()
  data.append("file", file)
  data.append("upload_preset", "blog_upload") // ⚠️ pastikan ini benar

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dpjq6tgd3/image/upload",
      {
        method: "POST",
        body: data,
      }
    )

    const result = await res.json()

    console.log("CLOUDINARY RESULT:", result) // 🔥 WAJIB

    // ❌ kalau gagal
    if (!result.secure_url) {
      alert("Upload gagal ke Cloudinary")
      return null
    }

    // ✅ kalau sukses
    return result.secure_url

  } catch (error) {
    console.error("UPLOAD ERROR:", error)
    return null
  }
}
  // SUBMIT
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setLoading(true)

  //   try {
  //     let imageUrl = form.img

  //     if (imageFile) {
  //       imageUrl = await uploadImage(imageFile)
  //       console.log("Image URL:", imageUrl)
  //     }

  //     // FIRESTORE
  //     try {
  //       const docRef = doc(db, "blogs", id)

  //       await updateDoc(docRef, {
  //         ...form,
  //         img: imageUrl,
  //       })
  //     } catch (err) {
  //       console.log("Firestore gagal, fallback ke local")
  //     }

  //     // LOCALSTORAGE
  //     const stored = JSON.parse(localStorage.getItem("blogs")) || []

  //     const updated = stored.map((b) =>
  //       b.id == id ? { ...b, ...form, img: imageUrl } : b
  //     )

  //     localStorage.setItem("blogs", JSON.stringify(updated))

  //     navigate(`/blog/${id}`)
  //   } catch (err) {
  //     console.error(err)
  //     alert("Gagal update")
  //   }

  //   setLoading(false)
  // }

  const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)

  try {
    let imageUrl = form.img

    // 🔥 WAJIB: kalau ada gambar baru → upload
    // if (imageFile) {
    //   console.log("FILE ADA:", imageFile) 
    //   imageUrl = await uploadImage(imageFile)
    //   console.log("🔥 IMAGE BARU:", imageUrl)
    // }
    if (imageFile) {
  const uploadedUrl = await uploadImage(imageFile)

  if (!uploadedUrl) {
    alert("Upload gagal, cek Cloudinary!")
    setLoading(false)
    return
  }

  imageUrl = uploadedUrl
}

    //  UPDATE FIRESTORE
    const docRef = doc(db, "blogs", id)

    await updateDoc(docRef, {
      ...form,
      img: imageUrl, 
    })

    //  UPDATE LOCAL 
    const stored = JSON.parse(localStorage.getItem("blogs")) || []

    const updated = stored.map((b) =>
      b.id == id ? { ...b, ...form, img: imageUrl } : b
    )

    localStorage.setItem("blogs", JSON.stringify(updated))

    navigate(`/blog/${id}`)

  } catch (err) {
    console.error(err)
    alert("Gagal update")
  }

  setLoading(false)
}

  // LOADING
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <section className="min-h-screen flex justify-center items-center px-6 py-20 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Edit Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          {/*  PREVIEW  */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-60 object-cover rounded"
            />
          )}

          {/*  INPUT FILE (FIX: hanya 1 & pakai handler) */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="6"
            className="w-full p-3 border rounded"
          />

          <button
            disabled={loading} 
            className="w-full bg-green-500 text-white py-3 rounded">
            {loading ? "Updating..." : "Update Blog"}
          </button>

        </form>
      </div>
    </section>
  )
}