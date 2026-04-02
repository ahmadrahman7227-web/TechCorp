import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useRef } from "react"
// import { useNavigate } from "react-router-dom"

const words = ["Future", "AI", "Innovation", "Tech"] 

export default function HeroText() {

  // PINDAH KE DALAM COMPONENT
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [phase, setPhase] = useState("intro") 
  const chatRef = useRef(null)
// "intro" | "choice" | "chat"
const isMobile = window.innerWidth < 768

//   useEffect(() => {
//   if (chatRef.current) {
//     chatRef.current.scrollTop = chatRef.current.scrollHeight
//   }
// }, [messages, isTyping])

  //  MOUSE EFFECT
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMouse({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  //  TYPING EFFECT
  useEffect(() => {
    if (index === words.length) return

    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000)
      return
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1))
      setText(words[index].substring(0, subIndex))
    }, deleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [subIndex, index, deleting])

   
  // animasi button explore the future
   const [showModal, setShowModal] = useState(false)
   const [aiText, setAiText] = useState("")
   const [step, setStep] = useState(0)
  

  //  useEffect(() => {
  // if (!showModal) return
  useEffect(() => {
  if (!showModal || phase !== "intro") return

  const messages = [
    "👋 Hello, welcome to TechCorp AI.",
    "We build intelligent systems for the future.",
    "What would you like to explore?"
  ]

  let i = 0
  let current = ""

  const interval = setInterval(() => {
    if (i < messages[step].length) {
      current += messages[step][i]
      setAiText(current)
      i++
    } else {
      clearInterval(interval)

      //  AUTO LANJUT KE STEP BERIKUTNYA
      setTimeout(() => {
        // if (step < messages.length - 1) {
        //   setStep(prev => prev + 1)
        //   setAiText("")
        // }
        if (step < messages.length - 1) {
      setStep(prev => prev + 1)
      setAiText("")
    } else {
      setPhase("choice") // pindah ke pilihan
    }
      }, 800)
    }
  }, 30)

  return () => clearInterval(interval)
}, [step, showModal])

  // AI chatbot 
  const [messages, setMessages] = useState([
  { text: "Welcome to TechCorp AI. What would you like to explore?", sender: "ai" }
])

const [input, setInput] = useState("")
const [isTyping, setIsTyping] = useState(false)

useEffect(() => {
  if (chatRef.current) {
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  }
}, [messages, isTyping])

  // logic AI
  const getResponse = (message) => {
  const msg = message.toLowerCase()

  if (msg.includes("service")) {
    return "We provide Web Development, Mobile Apps, and Cloud Solutions 🚀"
  }

  if (msg.includes("ai")) {
    return "TechCorp builds AI-powered systems to shape the future 🤖"
  }

  if (msg.includes("team")) {
    return "Our team consists of talented engineers, designers, and AI specialists 👨‍💻"
  }

  if (msg.includes("blog")) {
    return "You can explore our latest insights in the Blog section ✨"
  }

  return "Interesting question! Our AI team is constantly innovating to bring the best solutions 🚀"
}

  // handle set message
  const handleSend = () => {
  if (!input.trim()) return

  const userMessage = { text: input, sender: "user" }

  setMessages(prev => [...prev, userMessage])
  setInput("")
  setIsTyping(true)
  setShowSuggestions(false) // sembunyikan setelah user mulai

  setTimeout(() => {
    const reply = getResponse(input)

    setMessages(prev => [
      ...prev,
      { text: reply, sender: "ai" }
    ])

    setIsTyping(false)
  }, 1000)
}

    // tambahan
    const startChat = (topic) => {
  setPhase("chat")

  const reply = getResponse(topic)

  setMessages([
    { text: topic, sender: "user" },
    { text: reply, sender: "ai" }
  ])
}

    // suggestion
    const [showSuggestions, setShowSuggestions] = useState(true)

    const handleQuick = (text) => {
      setInput(text)
      handleSend()
}

  return (
    <motion.div
  className="text-white px-6 md:px-12 max-w-7xl mx-auto"
      style={{
  transform: isMobile ? "none" : `translate(${mouse.x}px, ${mouse.y}px)`
}}
    >

      {/* BADGE */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 inline-block px-4 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full"
      >
         AI Technology • Web Innovation • Future Ready
      </motion.div>

      {/* HEADING */}
      {/* <motion.h1 className="text-5xl md:text-6xl font-bold leading-tight"> */}
      <motion.h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight break-words">
        Build the{" "}
        <span className="text-blue-400 relative">
          {text}
          <span className="animate-pulse">|</span>

          <motion.span
            className="absolute inset-0 blur-md opacity-30 text-blue-400"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {text}
          </motion.span>
        </span>
      </motion.h1>

      {/* PARAGRAPH */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        // className="mt-4 opacity-80 max-w-lg"
        className="mt-4 opacity-80 max-w-md sm:max-w-lg"
      >
        We craft intelligent systems and immersive AI-driven experiences
        that redefine how technology interacts with humans.
      </motion.p>

      {/* BUTTON */}
      <motion.button
  // onClick={() => {
  //   setShowModal(true)
  //   setStep(0)
  //   setAiText("")
  // }}
  onClick={() => {
  setShowModal(true)
  setStep(0)
  setAiText("")
  setPhase("intro") 
}}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  whileHover={{
    scale: 1.1,
    boxShadow: "0px 0px 25px #3b82f6"
  }}
  transition={{ delay: 0.8 }}
  className="mt-6 px-5 py-3 text-sm sm:text-base rounded-lg transition w-full sm:w-auto
  bg-gradient-to-r from-blue-500 to-purple-500 
  hover:scale-105 
  shadow-[0_0_25px_rgba(59,130,246,0.5)]"
>
  Explore the Future →
</motion.button>


{/* button dalam chatbot */}


{/* MODAL */}
{showModal && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    // className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
    className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center z-50"
  >
    <motion.div
      initial={{ y: 100, scale: 0.8 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    //   className="relative bg-black/40 border border-blue-500/30 rounded-2xl p-6 max-w-md w-full text-white shadow-[0_0_80px_rgba(59,130,246,0.6)] overflow-hidden"
    className="relative bg-black/40 border border-blue-500/30 rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 w-full h-[90vh] sm:h-auto max-w-md text-white shadow-[0_0_80px_rgba(59,130,246,0.6)] flex flex-col"
    >

      {/* GLOW */}
      <div className="absolute inset-0 bg-blue-500/10 blur-3xl animate-pulse"></div>

      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg flex items-center gap-2">
            🤖 AI Assistant
          </h2>
          <button onClick={() => setShowModal(false)}>✕</button>
        </div>

        {/* CHAT BOX */}
        <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10 mb-4 min-h-[100px]">
          <p className="text-blue-400 text-sm">AI:</p>
          {/* <p className="text-gray-200">{aiText}</p> */}


          {/* CHAT BOX */}
<div ref={chatRef} className="bg-white/5 backdrop-blur-xl p-3 sm:p-4 rounded-xl border border-white/10 mb-4 flex-1 overflow-y-auto">

  {/*  INTRO */}
  {phase === "intro" && (
    <p className="text-blue-300">{aiText}</p>
  )}

  {/*  PILIHAN */}
  {phase === "choice" && (
    <div className="flex flex-wrap gap-2">

      <button onClick={() => startChat("services")}
        className="bg-blue-500/20 hover:bg-blue-500/40 px-3 py-1 rounded text-sm">
        🚀 Services
      </button>

      <button onClick={() => startChat("ai")}
        className="bg-purple-500/20 hover:bg-purple-500/40 px-3 py-1 rounded text-sm">
        🤖 AI
      </button>

      <button onClick={() => startChat("team")}
        className="bg-pink-500/20 hover:bg-pink-500/40 px-3 py-1 rounded text-sm">
        👨‍💻 Team
      </button>

      <button onClick={() => startChat("blog")}
        className="bg-green-500/20 hover:bg-green-500/40 px-3 py-1 rounded text-sm">
        ✨ Blog
      </button>

    </div>
  )}

  {/*  CHAT */}
  {phase === "chat" && (
    <>
      {/* {messages.map((msg, i) => (
        <div
          key={i}
          className={`mb-2 ${
            msg.sender === "ai"
              ? "text-blue-300"
              : "text-white text-right"
          }`}
        >
          {msg.sender === "ai" ? "AI: " : "You: "}
          {msg.text}
        </div>
      ))} */}
      {messages.map((msg, i) => (
  <div
    key={i}
    className={`mb-2 flex ${
      msg.sender === "ai" ? "justify-start" : "justify-end"
    }`}
  >
    <div
      className={`px-3 py-2 rounded-xl max-w-[80%] ${
        msg.sender === "ai"
          ? "bg-blue-500/20 text-blue-300"
          : "bg-white/10 text-white"
      }`}
    >
      {msg.text}
    </div>
  </div>
))}

      {isTyping && (
        <p className="text-gray-400 text-sm animate-pulse">AI is typing...</p>
      )}
    </>
  )}
</div>


{/* INPUT */}
<div className="flex gap-2 flex-col sm:flex-row">
  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleSend()
    }}
    placeholder="Type your message..."
    className="flex-1 p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none"
  />

  <button
    onClick={handleSend}
    // className="bg-blue-500 px-4 py-3 rounded w-full sm:w-auto"
    className="bg-blue-500 px-4 py-3 rounded-lg w-full sm:w-auto hover:scale-105 transition"
  >
    Send
  </button>
</div>
        </div>


        {/* RESPONSE */}
        {/* {step === 3 && (
          <p className="text-green-400 mt-2">
            Redirecting you to our services...
          </p>
        )}

        {step === 4 && (
          <p className="text-purple-400 mt-2">
            AI is transforming the world through automation and intelligence.
          </p>
        )} */}

      </div>
    </motion.div>
  </motion.div>
)}

    </motion.div>
  )
}