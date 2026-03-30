import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase"
import { 
  collection, onSnapshot, doc, 
  updateDoc, deleteDoc 
} from "firebase/firestore"
import { AuthContext } from "../context/AuthContext"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [blogs, setBlogs] = useState([])
  const [filter, setFilter] = useState("draft")
  const [loading, setLoading] = useState(true)

  // 🔐 ADMIN CHECK
  const adminEmails = ["alif123@gmail.com"]
  const isAdmin = adminEmails.includes(user?.email)

  // 📡 FETCH BLOG REALTIME + FIX STATUS
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "blogs"), (snap) => {
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        status: doc.data().status || "draft" // 🔥 FIX WAJIB
      }))

      setBlogs(data)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  // ✅ PUBLISH
  const handlePublish = async (blog) => {
    if (!confirm("Publish blog ini?")) return

    try {
      await updateDoc(doc(db, "blogs", blog.id), {
        status: "published"
      })
    } catch (err) {
      console.error(err)
      alert("Gagal publish")
    }
  }

  // 🔄 UNPUBLISH
  const handleUnpublish = async (blog) => {
    try {
      await updateDoc(doc(db, "blogs", blog.id), {
        status: "draft"
      })
    } catch (err) {
      console.error(err)
      alert("Gagal unpublish")
    }
  }

  // 🗑 DELETE
  const handleDelete = async (blog) => {
    const confirmDelete = confirm("Hapus blog ini?")
    if (!confirmDelete) return

    try {
      await deleteDoc(doc(db, "blogs", blog.id))
    } catch (err) {
      console.error(err)
      alert("Gagal delete")
    }
  }

  // 🔍 FILTER (SUDAH FIX)
  const filteredBlogs = blogs.filter((b) => {
    if (filter === "draft") return b.status === "draft"
    if (filter === "published") return b.status === "published"
    return true
  })

  // 📊 STATS (SUDAH AKURAT)
  const totalBlogs = blogs.length
  const totalDraft = blogs.filter(b => b.status === "draft").length
  const totalPublished = blogs.filter(b => b.status === "published").length

  // 🔒 PROTECT
  if (!isAdmin) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        ❌ Akses ditolak (Admin only)
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white px-6 py-24">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 max-w-6xl mx-auto gap-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        <button
          onClick={() => navigate("/")}
          className="text-blue-400 hover:underline"
        >
          ← Back to Home
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-400">Loading data...</p>
      )}

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
          <p className="text-gray-400 text-sm">Total Blogs</p>
          <h2 className="text-3xl font-bold">{totalBlogs}</h2>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
          <p className="text-gray-400 text-sm">Draft</p>
          <h2 className="text-3xl font-bold text-yellow-400">
            {totalDraft}
          </h2>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
          <p className="text-gray-400 text-sm">Published</p>
          <h2 className="text-3xl font-bold text-green-400">
            {totalPublished}
          </h2>
        </div>

      </div>

      {/* FILTER */}
      <div className="flex gap-4 mb-10 max-w-6xl mx-auto">
        {["draft", "published", "all"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full transition ${
              filter === f
                ? "bg-gradient-to-r from-blue-500 to-purple-500"
                : "bg-white/10"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* EMPTY */}
      {!loading && filteredBlogs.length === 0 && (
        <p className="text-center text-gray-400 mt-20">
          Tidak ada blog di kategori ini 🚫
        </p>
      )}

      {/* BLOG GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur transition duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,150,255,0.25)]"
          >

            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={blog.img || "https://via.placeholder.com/400"}
                className="w-full h-44 object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6 relative z-10">
              <h2 className="text-xl font-bold mb-1">
                {blog.title}
              </h2>

              <p className="text-gray-400 text-sm mb-1">
                {blog.category}
              </p>

              <p className="text-xs text-gray-500 mb-3">
                {blog.date}
              </p>

              {/* STATUS */}
              <p className={`text-sm mb-4 ${
                blog.status === "published"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}>
                ● {blog.status}
              </p>

              {/* ACTION */}
              <div className="flex flex-wrap gap-3">

                {blog.status !== "published" ? (
                  <button
                    onClick={() => handlePublish(blog)}
                    className="px-4 py-2 bg-green-500 rounded-lg hover:scale-105 transition"
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnpublish(blog)}
                    className="px-4 py-2 bg-gray-500 rounded-lg hover:scale-105 transition"
                  >
                    Unpublish
                  </button>
                )}

                <button
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="px-4 py-2 bg-blue-500 rounded-lg hover:scale-105 transition"
                >
                  View
                </button>

                <button
                  onClick={() => handleDelete(blog)}
                  className="px-4 py-2 bg-red-500 rounded-lg hover:scale-105 transition"
                >
                  Delete
                </button>

              </div>
            </div>

            {/* GLOW */}
           <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500 bg-blue-500/10 blur-xl" />
          </div>
        ))}

      </div>

    </section>
  )
}