import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { motion } from "framer-motion"
import { increment } from "firebase/firestore"
import { serverTimestamp } from "firebase/firestore"

import { db } from "../firebase"

import { 
  doc, getDoc, deleteDoc, updateDoc,
  addDoc, collection,
  query, where, orderBy,
  onSnapshot, getDocs
} from "firebase/firestore"

import { AuthContext } from "../context/AuthContext"

// 🔥 ASSETS
import blog1 from "../assets/blog-1.jpg"
import blog2 from "../assets/blog-2.jpg"
import blog3 from "../assets/blog-3.jpg"

// 🔥 STATIC BLOG (TIDAK DIUBAH)
const staticBlogs = [
  {
    id: "static-1",
    title: "The Future of AI in Everyday Life",
    category: "AI",
    date: "Jan 2026",
    img: blog1,
    likes: 0,
    content: `Artificial Intelligence is rapidly transforming the way we live and work. From smart assistants to autonomous vehicles, AI is becoming deeply embedded in everyday experiences.

In recent years, AI-powered tools have significantly improved productivity across industries. Businesses now rely on machine learning models to analyze data, predict trends, and automate repetitive tasks. This allows professionals to focus on more strategic and creative work.

In healthcare, AI is revolutionizing diagnostics and patient care. Advanced algorithms can detect diseases earlier than traditional methods, improving survival rates and treatment outcomes. Telemedicine platforms powered by AI are also making healthcare more accessible globally.

Education is another sector experiencing transformation. Personalized learning systems adapt to each student's pace and style, making education more efficient and engaging. AI tutors and virtual classrooms are becoming increasingly common.

However, the rise of AI also brings challenges. Ethical concerns such as data privacy, bias in algorithms, and job displacement must be addressed. Governments and organizations are working to establish regulations to ensure responsible AI usage.

Looking ahead, AI will continue to evolve and integrate into our daily lives. From smart homes to intelligent transportation systems, the future promises a seamless interaction between humans and machines.

The key to success lies in balancing innovation with responsibility, ensuring that AI benefits society as a whole while minimizing potential risks.`,
  },
  {
    id: "static-2",
    title: "Design Trends for 2026",
    category: "Design",
    date: "Feb 2026",
    img: blog2,
    likes: 0,
    content: `Design in 2026 is all about blending minimalism with immersive and futuristic experiences. Modern interfaces are becoming cleaner while still delivering powerful interactions.

One of the biggest trends is the use of glassmorphism and neumorphism, creating soft and layered UI elements. These styles enhance depth and realism without overwhelming the user.

Dark mode continues to dominate, not just for aesthetics but also for reducing eye strain. Designers are experimenting with neon accents and gradients to create visually striking interfaces.

Motion design is also evolving. Micro-interactions, smooth transitions, and dynamic animations play a crucial role in user engagement. They provide feedback and guide users intuitively through applications.

Another key trend is accessibility. Designers are prioritizing inclusive design by ensuring that interfaces are usable by people with different abilities. This includes better contrast, readable typography, and keyboard navigation support.

AI-driven design tools are helping designers generate layouts, color palettes, and even entire UI systems. This accelerates the design process while maintaining creativity.

In conclusion, design in 2026 focuses on simplicity, usability, and emotional connection. The goal is to create experiences that are not only functional but also enjoyable and memorable.`,
  },
  {
    id: "static-3",
    title: "Cloud Computing Evolution",
    category: "Cloud",
    date: "Mar 2026",
    img: blog3,
    likes: 0,
    content: `Cloud computing has become the backbone of modern digital infrastructure. As businesses continue to scale, cloud solutions provide flexibility, scalability, and cost efficiency.

The shift towards cloud-native applications has accelerated development processes. Technologies like containers and Kubernetes enable developers to build, deploy, and manage applications more efficiently.

Multi-cloud and hybrid cloud strategies are gaining popularity. Organizations are no longer relying on a single provider but instead distributing workloads across multiple platforms to improve reliability and performance.

Serverless computing is another major advancement. Developers can focus on writing code without worrying about infrastructure management, leading to faster development cycles.

Security remains a top priority. Cloud providers are investing heavily in advanced security measures, including encryption, identity management, and threat detection systems.

Edge computing is emerging as a complementary technology. By processing data closer to the source, it reduces latency and improves performance for real-time applications such as IoT and autonomous systems.

In the future, cloud computing will continue to evolve, integrating with AI and machine learning to provide smarter and more efficient services. Businesses that embrace cloud technologies will have a significant competitive advantage.`,
  },
]

export default function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔥 KOMENTAR SYSTEM
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState("")
  const [replyText, setReplyText] = useState({})
  const [showReply, setShowReply] = useState({})
  const [limit, setLimit] = useState(5)

  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")

  const isOwner = user?.uid === blog?.userId
  const isAdmin = user?.email === "techcorp.alif@gmail.com"

  // 🔥 REALTIME COMMENTS
  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("blogId", "==", id),
      orderBy("createdAt", "desc")
    )

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setComments(data)
    })

    return () => unsub()
  }, [id])

  // 🔥 FETCH BLOG (ASLI)
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true)

      try {
        if (id.startsWith("static")) {
          const found = staticBlogs.find(b => b.id === id)
          setBlog(found)
          setLoading(false)
          return
        }

        const docRef = doc(db, "blogs", id)
        const snap = await getDoc(docRef)

        if (snap.exists()) {
          setBlog({
            id: snap.id,
            ...snap.data(),
          })
          setLoading(false)
          return
        }

        const stored = JSON.parse(localStorage.getItem("blogs")) || []
        const foundLocal = stored.find(b => b.id == id)

        if (foundLocal) setBlog(foundLocal)

      } catch (err) {
        console.error(err)
      }

      setLoading(false)
    }

    fetchBlog()
  }, [id])

  // ❤️ LIKE BLOG
  const handleLike = async () => {
  if (!blog?.id) return
  if (!user) return alert("Login dulu")

  const ref = doc(db, "blogs", blog.id)

  const alreadyLiked = blog.likedBy?.includes(user.uid)

  if (alreadyLiked) {
    // 💔 UNLIKE
    await updateDoc(ref, {
      likes: increment(-1),
      likedBy: blog.likedBy.filter(id => id !== user.uid)
    })

    setBlog(prev => ({
      ...prev,
      likes: (prev.likes || 0) - 1,
      likedBy: prev.likedBy.filter(id => id !== user.uid)
    }))
  } else {
    // ❤️ LIKE
    await updateDoc(ref, {
      likes: increment(1),
      likedBy: [...(blog.likedBy || []), user.uid]
    })

    setBlog(prev => ({
      ...prev,
      likes: (prev.likes || 0) + 1,
      likedBy: [...(prev.likedBy || []), user.uid]
    }))
  }
}

  // ⭐ BOOKMARK
  // const handleBookmark = () => {
  //   const saved = JSON.parse(localStorage.getItem("bookmark")) || []
  //   localStorage.setItem("bookmark", JSON.stringify([...saved, blog]))
  //   alert("Disimpan!")
  // }
  const handleBookmark = () => {
  const saved = JSON.parse(localStorage.getItem("bookmark")) || []

  const exist = saved.find((b) => b.id === blog.id)

  if (exist) {
    alert("Sudah ada di bookmark!")
    return
  }

  const updated = [...saved, blog]
  localStorage.setItem("bookmark", JSON.stringify(updated))

  alert("Disimpan!")
}

  // 🔗 SHARE
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("Link disalin!")
  }

  // 💬 ADD COMMENT
  const handleAddComment = async () => {

    if (!user) {
      alert("Login dulu")
  return
    }

    if (!commentText.trim()) return

    await addDoc(collection(db, "comments"), {
      blogId: id,
      text: commentText,
      userEmail: user.email,
      userId: user?.uid || "guest",
      parentId: null,
      createdAt: serverTimestamp(),
      pinned: false
      // createdAt: new Date()
    })

    setCommentText("")
  }

  // 💬 REPLY
  const handleReply = async (parentId) => {
    if (!replyText[parentId]) return

    await addDoc(collection(db, "comments"), {
      blogId: id,
      text: replyText[parentId],
      userEmail: user?.email || "guest",
      userId: user?.uid || "guest",
      parentId,
      createdAt: serverTimestamp(),
      likes: 0,
      likedBy: []
      // createdAt: new Date()
    })

    setReplyText(prev => ({ ...prev, [parentId]: "" }))
  }

  // 🗑 DELETE BLOG (ASLI)
  const handleDelete = async () => {
    if (!blog?.id) return

    const confirmDelete = confirm("Yakin mau hapus blog ini?")
    if (!confirmDelete) return

    // await deleteDoc(doc(db, "blogs", blog.id))
    if (!isOwner) return alert("Tidak diizinkan")
    navigate("/")
  }

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>
  }

  if (!blog) {
    return <div>Blog tidak ditemukan</div>
  }

  // const parentComments = comments.filter(c => !c.parentId).slice(0, limit)
  const getReplies = (id) => comments.filter(c => c.parentId === id)

  const repliesMap = comments.reduce((acc, c) => {
  if (c.parentId) {
    if (!acc[c.parentId]) acc[c.parentId] = []
    acc[c.parentId].push(c)
  }
  return acc
}, {})

  const handlePublishToggle = async () => {
  if (!isAdmin) return alert("Hanya admin!")

  const ref = doc(db, "blogs", blog.id)

  const newStatus = blog.status === "published" ? "draft" : "published"

  await updateDoc(ref, {
    status: newStatus
  })

  //  UPDATE UI LANGSUNG
  setBlog(prev => ({
    ...prev,
    status: newStatus
  }))
}


  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return ""

    return timestamp.toDate().toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const timeAgo = (timestamp) => {
  if (!timestamp?.toDate) return "Just now"

  const now = new Date()
  const time = timestamp.toDate()
  const diff = Math.floor((now - time) / 1000)

  if (diff < 60) return "Just now"
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`

  return time.toLocaleString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

    // delete coment
    const handleDeleteComment = async (id) => {
  const confirmDelete = confirm("Hapus komentar?")
  if (!confirmDelete) return

  await deleteDoc(doc(db, "comments", id))
}

    // edit coment
    const handleEdit = (comment) => {
  setEditingId(comment.id)
  setEditText(comment.text)
}

const handleUpdate = async (id) => {
  if (!editText.trim()) return

  const ref = doc(db, "comments", id)

  await updateDoc(ref, {
    text: editText
  })

  setEditingId(null)
  setEditText("")
}

    // like coment
//     const handleLikeComment = async (id) => {
//   const ref = doc(db, "comments", id)

//   await updateDoc(ref, {
//     likes: increment(1)
//   })
// }
    const handleLikeComment = async (comment) => {
  if (!user) return alert("Login dulu")

  const ref = doc(db, "comments", comment.id)

  const alreadyLiked = comment.likedBy?.includes(user.uid)

  if (alreadyLiked) {
    // 💔 UNLIKE
    await updateDoc(ref, {
      likes: increment(-1),
      likedBy: comment.likedBy.filter(id => id !== user.uid)
    })
  } else {
    // ❤️ LIKE
    await updateDoc(ref, {
      likes: increment(1),
      likedBy: [...(comment.likedBy || []), user.uid]
    })
  }
}

  // pin coment
    const handlePinComment = async (comment) => {
  if (!isOwner) return alert("Hanya owner blog")

  const q = query(
    collection(db, "comments"),
    where("blogId", "==", id)
  )

  const snap = await getDocs(q)

  const batch = []

  snap.forEach(docSnap => {
    const data = docSnap.data()

    if (!data.parentId) {
      batch.push(updateDoc(doc(db, "comments", docSnap.id), {
        pinned: false
      }))
    }
  })

  await Promise.all(batch)

  await updateDoc(doc(db, "comments", comment.id), {
    pinned: true
  })

  // 🔥 UPDATE UI LANGSUNG
  setComments(prev =>
    prev.map(c =>
      c.id === comment.id
        ? { ...c, pinned: true }
        : { ...c, pinned: false }
    )
  )
}

  const parentComments = comments
  .filter(c => !c.parentId)
  .sort((a, b) => (b.pinned === true) - (a.pinned === true))
  .slice(0, limit)


    return (
  <section className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black py-24 px-6 flex justify-center">
    
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl text-white"
    >

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-pink-400 hover:text-pink-300 transition"
      >
        ← Back
      </button>

      {/* OWNER BUTTON */}
      {isOwner && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => navigate(`/edit/${blog.id}`)}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:scale-105 transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 rounded-lg hover:scale-105 transition"
          >
            Delete
          </button>

          {/* NEW BUTTON */}
    {isAdmin && (
      <button
        onClick={handlePublishToggle}
        className={`px-4 py-2 rounded-lg transition ${
          blog.status === "published"
            ? "bg-gray-500"
            : "bg-green-500"
        }`}
      >
        {blog.status === "published" ? "Unpublish" : "Publish"}
      </button>
    )}
        </div>
      )}

      {/* IMAGE */}
      <motion.img
        whileHover={{ scale: 1.03 }}
        src={blog.img}
        className="w-full h-[400px] object-cover rounded-2xl mb-10 shadow-lg"
      />

      {/* META */}
      <p className="text-sm text-pink-400 mb-2">
        {blog.category} • {blog.date}
      </p>

      <h1 className="text-4xl font-bold mb-4 leading-tight">
        {blog.title}
      </h1>

      <p className="text-gray-400 mb-6 text-sm">
        {blog.author}
      </p>

      {/* ACTION BUTTON */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={handleLike}
          className="bg-red-500 px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          ❤️ {blog.likes || 0}
        </button>

        <button
          onClick={handleBookmark}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          ⭐ Save
        </button>

        <button
          onClick={handleShare}
          className="bg-blue-500 px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          🔗 Share
        </button>
      </div>

      {/* CONTENT */}
      <div className="text-gray-300 leading-relaxed space-y-4 mb-10">
        {(blog.content || "").split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      {/* COMMENTS */}
      <h2 className="text-2xl font-bold mb-6">Komentar</h2>

      {parentComments.map((c) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur p-4 rounded-xl mb-4 border border-white/10"
        >

          {/* 📌 PIN LABEL */}
          {c.pinned && (
            <p className="text-yellow-400 text-xs mb-1">📌 Pinned</p>
          )}

          {/* USER */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-sm font-bold">
              {c.userEmail?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm text-gray-300">{c.userEmail}</p>
              <p className="text-xs text-gray-500">
                {timeAgo(c.createdAt)}
              </p>
            </div>
          </div>

          {editingId === c.id ? (
            <div>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-2 rounded bg-black/40 text-white"
              />
              <button
                onClick={() => handleUpdate(c.id)}
                className="mt-2 bg-green-500 px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-white mb-3">{c.text}</p>
          )}

          {/* EDIT DELETE */}
          {user?.uid === c.userId && (
            <div className="flex gap-3 text-sm mt-2">
              <button onClick={() => handleEdit(c)} className="text-yellow-400">
                Edit
              </button>
              <button onClick={() => handleDeleteComment(c.id)} className="text-red-400">
                Delete
              </button>
            </div>
          )}

          {/* ❤️ LIKE + 📌 PIN */}
          <div className="flex items-center gap-4 mt-2 text-sm">
            <button
              onClick={() => handleLikeComment(c)}
              className={`${
                c.likedBy?.includes(user?.uid)
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              ❤️ {c.likes || 0}
            </button>

            {isOwner && (
              <button
                onClick={() => handlePinComment(c)}
                className="text-yellow-400"
              >
                📌 Pin
              </button>
            )}
          </div>

          {/* REPLY BUTTON */}
          <button
            onClick={() =>
              setShowReply((prev) => ({
                ...prev,
                [c.id]: !prev[c.id],
              }))
            }
            className="text-blue-400 text-sm"
          >
            Reply
          </button>

          {/* REPLY INPUT */}
          {showReply[c.id] && (
            <div className="mt-2">
              <input
                value={replyText[c.id] || ""}
                onChange={(e) =>
                  setReplyText((prev) => ({
                    ...prev,
                    [c.id]: e.target.value,
                  }))
                }
                className="w-full p-2 rounded bg-black/40 text-white"
              />
              <button
                onClick={() => handleReply(c.id)}
                className="mt-2 bg-blue-500 px-3 py-1 rounded"
              >
                Kirim
              </button>
            </div>
          )}

          {/* REPLIES */}
          {(repliesMap[c.id] || []).map((r) => (
            <div key={r.id} className="ml-6 mt-3 p-3 bg-black/30 rounded-lg">
              
              <div className="flex justify-between">
                <p className="text-sm text-gray-400">{r.userEmail}</p>
                <p className="text-xs text-gray-500">
                  {timeAgo(r.createdAt)}
                </p>
              </div>

              {editingId === r.id ? (
                <div>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 rounded bg-black/40 text-white"
                  />
                  <button
                    onClick={() => handleUpdate(r.id)}
                    className="mt-2 bg-green-500 px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p>{r.text}</p>
              )}

              {user?.uid === r.userId && (
                <div className="flex gap-3 text-sm mt-2">
                  <button onClick={() => handleEdit(r)} className="text-yellow-400">
                    Edit
                  </button>
                  <button onClick={() => handleLikeComment(r)} className="text-red-400">
                    Delete
                  </button>
                </div>
              )}

              {/* ❤️ LIKE REPLY */}
              <div className="flex items-center gap-4 mt-2 text-sm">
                <button
                  onClick={() => handleLikeComment(r)}
                  className={`${
                    r.likedBy?.includes(user?.uid)
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  ❤️ {r.likes || 0}
                </button>
              </div>

            </div>
          ))}
        </motion.div>
      ))}

      <button
        onClick={() => setLimit(limit + 5)}
        className="mb-6 text-blue-400"
      >
        Load More
      </button>

      {/* ADD COMMENT */}
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Tulis komentar..."
        className="w-full p-3 rounded-xl bg-black/40 text-white border border-white/10"
      />

      <button
        onClick={handleAddComment}
        className="mt-3 w-full bg-green-500 py-3 rounded-xl hover:scale-[1.02] transition"
      >
        Kirim Komentar
      </button>

    </motion.div>
  </section>
)
}