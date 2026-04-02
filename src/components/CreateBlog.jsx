import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"
import { AuthContext } from "../context/AuthContext"

export default function CreateBlog() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  //  TAMBAHAN: LIST CATEGORY
  const categories = [
    "AI",
    "Web Development",
    "Mobile Apps",
    "Cloud Computing",
    "Cyber Security",
    "DevOps",
    "UI/UX Design",
    "Data Science",
    "Machine Learning",
    "Blockchain",
    "Startup",
    "Digital Marketing",
    "SaaS",
    "Productivity"
  ]

  const [form, setForm] = useState({
    title: "",
    category: "AI",
    desc: "",
    content: "",
    img: "",
  })

  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0])
  }

  //  CLOUDINARY UPLOAD
  const uploadImage = async (file) => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "blog_upload")

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dpjq6tgd3/image/upload",
      {
        method: "POST",
        body: data,
      }
    )

    const result = await res.json()

    console.log("HASIL CLOUDINARY:", result) 

    if (!result.secure_url) {
      throw new Error("Upload gagal ke Cloudinary")
    }

    return result.secure_url
  }

  // HANDLE SUBMIT 
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!imageFile) {
      alert("Pilih gambar dulu!")
      return
    }

    if (!user) {
      alert("User belum login!")
      return
    }

    setLoading(true)

    try {
      console.log("START UPLOAD")

      const imageUrl = await uploadImage(imageFile)
      console.log("IMAGE URL:", imageUrl)

      const docRef = await addDoc(collection(db, "blogs"), {
        ...form,
        img: imageUrl,
        date: new Date().toDateString(),
        likes: 0,
        author: user.email,
        userId: user.uid,
        status: "draft", 
      })

      console.log("FIRESTORE SUCCESS:", docRef.id)

      navigate("/")
    } catch (error) {
      console.error("ERROR:", error)
      alert("Gagal upload blog")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex justify-center items-center px-6 py-20 bg-gray-50">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border border-gray-200">

        <h1 className="text-4xl font-bold mb-8 text-center">
          ✍️ Create New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm text-gray-500">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl"
              required
            />
          </div>

          
          <div>
            <label className="text-sm text-gray-500">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl"
              required
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-500">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="6"
              className="w-full mt-1 p-3 border rounded-xl"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 text-white rounded-xl"
          >
            {loading ? "Uploading..." : "Submit Blog"}
          </button>

        </form>
      </div>
    </section>
  )
}