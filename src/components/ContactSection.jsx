import { motion } from "framer-motion"
import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"
import toast from "react-hot-toast"

export default function ContactSection() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    setLoading(true)

    try {
      await addDoc(collection(db, "contacts"), {
        ...form,
        createdAt: serverTimestamp()
      })

      toast.success("Message sent successfully 🚀")

      setSuccess(true)

      setForm({
        name: "",
        email: "",
        message: ""
      })

      setTimeout(() => setSuccess(false), 2000)

    } catch (error) {
      console.error(error)
      toast.error("Failed to send message ❌")
    }

    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <section id="contact" className="py-24 px-6 relative">

      <div className="max-w-4xl mx-auto text-center">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Contact Us
        </motion.h2>

        <p className="text-gray-400 mb-10">
          Have a project in mind? Let’s build something amazing together.
        </p>

        <form onSubmit={handleSubmit} className="grid gap-6">

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Your Name"
            className="p-4 rounded-lg bg-white/5 border border-white/10 focus:outline-none"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Your Email"
            className="p-4 rounded-lg bg-white/5 border border-white/10 focus:outline-none"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Your Message"
            rows="5"
            className="p-4 rounded-lg bg-white/5 border border-white/10 focus:outline-none"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              "Sending..."
            ) : success ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2"
              >
                ✔ Sent
              </motion.span>
            ) : (
              "Send Message 🚀"
            )}
          </button>

        </form>
      </div>

    </section>
  )
}