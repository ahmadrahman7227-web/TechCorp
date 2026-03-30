import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { doc, updateDoc, increment } from "firebase/firestore"

//  FIREBASE
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

//  ASSETS
import blog1 from "../assets/blog-1.jpg"
import blog2 from "../assets/blog-2.jpg"
import blog3 from "../assets/blog-3.jpg"

//  STATIC BLOG (BLOG LAMA)
const staticBlogs = [
  {
    id: "static-1",
    title: "The Future of AI in Everyday Life",
    category: "AI",
    date: "Jan 2026",
    desc: "Explore how AI is transforming industries and daily experiences.",
    img: blog1,
    featured: true,
    likes: 0,
  },
  {
    id: "static-2",
    title: "Design Trends for 2026",
    category: "Design",
    date: "Feb 2026",
    desc: "Minimalism meets futuristic UI in the next wave of design.",
    img: blog2,
    likes: 0,
  },
  {
    id: "static-3",
    title: "Cloud Computing Evolution",
    category: "Cloud",
    date: "Mar 2026",
    desc: "Why cloud-native apps are dominating modern development.",
    img: blog3,
    likes: 0,
  },
]

export default function BlogSection() {
  const navigate = useNavigate()

  const [allBlogs, setAllBlogs] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState("latest")

  //  PAGINATION
  const [visible, setVisible] = useState(6)

  //  REALTIME FIREBASE
  useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "blogs"),
    (snapshot) => {
      const firebaseBlogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      //  FILTER: hanya published
      const publishedBlogs = firebaseBlogs.filter(
        blog => blog.status === "published"
      )

      //  GABUNG STATIC + FIREBASE
      // const merged = [...staticBlogs, ...publishedBlogs]

      //  HAPUS DUPLIKAT (BERDASARKAN TITLE)
      //   const uniqueBlogs = merged.filter(
      //   (blog, index, self) =>
      //     index === self.findIndex(b => b.title === blog.title)
      // )

      // setAllBlogs(uniqueBlogs)

      // HANYA BLOGS DARI FIREBASE
      setAllBlogs(publishedBlogs)
      
    },
    (error) => {
      console.error("Realtime error:", error)
      // setAllBlogs(staticBlogs)
      setAllBlogs([])
    }
  )

  return () => unsubscribe()
}, [])



  //  CATEGORY
  const categories = ["All", ...new Set(allBlogs.map(b => b.category))]

  // 🔍 FILTER (diganti)
  // const filteredBlogs = allBlogs
  //   .filter(blog =>
  //     blog.title.toLowerCase().includes(search.toLowerCase())
  //   )
  //   .filter(blog =>
  //     category === "All" ? true : blog.category === category
  //   )
  const filteredBlogs = allBlogs
  .filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter(blog =>
    category === "All" ? true : blog.category === category
  )
  .sort((a, b) => {
    if (sort === "popular") return (b.likes || 0) - (a.likes || 0)
    // return new Date(b.date) - new Date(a.date)
    return new Date(b.date || 0) - new Date(a.date || 0)
  })

  //  DISPLAY LIMIT
  const displayedBlogs = filteredBlogs.slice(0, visible)

  // ❤️ LIKE
  const handleLike = async (id) => {
  try {
    const ref = doc(db, "blogs", id)

    await updateDoc(ref, {
      likes: increment(1)
    })

  } catch (err) {
    console.error("Like error:", err)
  }
}
//   const handleLike = async (id) => {
//   const isStatic = id.startsWith("static")

//   //  STATIC BLOG (fallback local)
//   if (isStatic) {
//     const updated = allBlogs.map(b =>
//       b.id === id ? { ...b, likes: (b.likes || 0) + 1 } : b
//     )
//     setAllBlogs(updated)
//     return
//   }

//   // FIREBASE BLOG
//   try {
//     const ref = doc(db, "blogs", id)

//     await updateDoc(ref, {
//       likes: increment(1)
//     })

//   } catch (err) {
//     console.error("Like error:", err)
//   }
// }

   
  

  return (
    <section id="blog" className="py-24 px-6 max-w-7xl mx-auto">

      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold">
          Latest Insights & Trends
        </h2>
        <p className="text-gray-400 mt-4">
          Explore the future of technology, AI, and innovation.
        </p>
      </motion.div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">

        <input
          type="text"
          placeholder="Search blog..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-2/3 p-3 rounded-xl border bg-white/10 backdrop-blur text-white"
        />

        <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="p-2 rounded-lg bg-white/10 text-white"
      >
        <option value="latest">Latest</option>
        <option value="popular">Most Liked</option>
      </select> 

        {/* CATEGORY BUTTON FILTER */} {/* tambahan */}
      <div className="flex flex-wrap gap-3 mb-6">

        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              category === cat
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {cat}
          </button>
        ))}

      </div>
        {/* yang diganti dan dipindahkan ke atas*/}
        {/* <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/3 p-3 rounded-xl border bg-white/10 text-white"
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select> */}
        {/* pengganti dan dipindah ke atas*/}
        {/* <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="p-2 rounded-lg bg-white/10 text-white"
      >
        <option value="latest">Latest</option>
        <option value="popular">Most Liked</option>
      </select>*/}

      </div>

      {/* GRID UPGRADE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {displayedBlogs.map((blog, i) => (
          <motion.div
            key={blog.id}
            onClick={() => navigate(`/blog/${blog.id}`)}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}

            className={`group relative overflow-hidden rounded-2xl cursor-pointer
            ${blog.featured ? "lg:col-span-2 lg:row-span-2 h-[420px]" : "h-[260px]"}
            bg-white/5 backdrop-blur border border-white/10
            hover:scale-[1.03] transition duration-500
            hover:shadow-[0_0_50px_rgba(0,150,255,0.3)]
            `}
          >

            {/* IMAGE */}
            <img
              src={blog.img || "https://via.placeholder.com/800"}
              alt={blog.title}
              className="w-full h-full object-cover 
              group-hover:scale-110 transition duration-700"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* CONTENT */}
            <div className="absolute bottom-0 p-6 z-10">
              
              {/* yang diganti */}
              {/* <p className="text-xs text-pink-400 mb-2 tracking-wide">
                {blog.category} • {blog.date}
              </p> */}

              <div className="flex items-center gap-2 mb-2">

                <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                  {blog.category}
                </span>

                <span className="text-xs text-gray-400">
                  {blog.date}
                </span>

              </div>

              <h3 className={`font-bold mb-2 transition
                ${blog.featured ? "text-2xl" : "text-lg"}
                group-hover:text-blue-400`}>
                {blog.title}
              </h3>

              <p className="text-gray-100 text-sm opacity-0 
                group-hover:opacity-100 transition duration-300">
                {blog.desc}
              </p>

              <div className="mt-3 text-sm text-white opacity-0 
                group-hover:opacity-100 transition duration-300">
                Read More →
              </div>

              {/* ❤️ LIKE */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleLike(blog.id)
                }}
                className="mt-2 text-sm text-red-400 opacity-0 
                group-hover:opacity-100 transition duration-300"
              >
                ❤️ {blog.likes || 0}
              </button>

            </div>

            {/* GLOW */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
              transition duration-500 blur-2xl bg-blue-500/20"></div>

          </motion.div>
        ))}

      </div>

      {filteredBlogs.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
            No blogs found 😢
        </p>
      )}

      {/*  LOAD MORE */}
      {visible < filteredBlogs.length && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisible(prev => prev + 6)}
            className="px-6 py-3 bg-blue-500 rounded-xl hover:scale-105 transition"
          >
            Load More 
          </button>
        </div>
      )}

    </section>
  )
}