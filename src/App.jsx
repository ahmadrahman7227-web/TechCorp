import { useEffect, useState, useContext } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { motion } from "framer-motion"
import { Routes, Route, useNavigate } from "react-router-dom"
import { auth } from "./firebase"
import { signOut } from "firebase/auth"
import { Toaster } from "react-hot-toast"


// context
import { AuthContext } from "./context/AuthContext"

// Components
import ParticlesBg from "./components/ParticlesBg"
import CustomCursor from "./components/CursorGlow"
import ParallaxSection from "./components/ParallaxSection"
import Reveal from "./components/Reveal"
import Hero3D from "./components/Hero3D"
import HeroText from "./components/HeroText"
import LoadingScreen from "./components/LoadingScreen"
import AboutSection from "./components/AboutSection"
import TeamSection from "./components/TeamSection"
import BlogSection from "./components/BlogSection"
import CreateBlog from "./components/CreateBlog"
import ProtectedRoute from "./components/ProtectedRoute"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import ClientsSection from "./components/ClientsSection"
import CompanyIntro from "./components/CompanyIntro"
import CompanyParallax from "./components/CompanyParallax"



// Pages
import BlogDetail from "./pages/BlogDetail"
import EditBlog from "./pages/EditBlog"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Services from "./pages/Services"
import ServiceDetail from "./pages/ServiceDetail"
import AdminDashboard from "./pages/AdminDashboard"


// Assets
import webImg from "./assets/coding laptop.avif"
import mobileImg from "./assets/mobile app.avif"
import cloudImg from "./assets/cloud server.avif"

export default function App() {
  // const ADMIN_EMAIL = "techcorp.alif@gmail.com"

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  console.log("Firebase connect:", auth)
  console.log("USER:", user)

  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("Home")
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  

  // RESPONSIVE
//   useEffect(() => {
//   const checkScreen = () => {
//     setIsMobile(window.innerWidth < 768)
//   }

//   checkScreen()
//   window.addEventListener("resize", checkScreen)

//   return () => window.removeEventListener("resize", checkScreen)
// }, [])

  // LOADING (PUNYA KAMU, TETAP)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  // AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])

  // SCROLL NAVBAR
  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50)

    // 🔥 AUTO CLOSE MOBILE MENU
    if (isOpen) setIsOpen(false)
  }

  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}, [isOpen])
  // useEffect(() => {
  //   const handleScroll = () => setScrolled(window.scrollY > 50)
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])

  const navLinks = ["Home", "About", "Services", "Teams", "Blog"]
  console.log("APP USER:", user)


  const [currentTestimonial, setCurrentTestimonial] = useState(0)

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTestimonial((prev) => (prev + 1) % 3)
  }, 3000)

  return () => clearInterval(interval)
}, [])


  return (
    <>

    <Toaster position="top-right" />

    <Routes>

      

      {/* HOME */}
      <Route
        path="/"
        element={
          <div className="font-[Poppins] bg-black text-white scroll-smooth overflow-x-hidden">

            {/* LOADING */}
            {loading && <LoadingScreen />}
            
            {/* {!isMobile && <ParticlesBg />} */}
            <ParticlesBg />
            {/* <CustomCursor /> */}

            {/* BACKGROUND */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black via-blue-950 to-black animate-gradient"></div>

              <div className="absolute w-[500px] h-[500px] pointer-events-none bg-blue-500/20 blur-3xl rounded-full top-[-100px] left-[-100px] animate-aurora"></div>

              <div className="absolute w-[400px] h-[400px] pointer-events-none bg-purple-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-aurora2"></div>
              {/* {!isMobile && (
            <>
              <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full top-[-100px] left-[-100px] animate-aurora"></div>

              <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-aurora2"></div>
            </>
          )} */}
            </div>

            {/* NAVBAR */}
            <motion.nav
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`fixed top-0 left-0 w-full z-50 px-4 md:px-16 transition-all duration-500 ${
                scrolled
                  ? "bg-black/60 backdrop-blur-xl py-2 border-b border-white/10 shadow-lg"
                  : "bg-transparent py-3"
              }`}
            >
              <div className="flex justify-between items-center max-w-7xl mx-auto">

                {/* LOGO */}
                <motion.h1
                  whileHover={{ scale: 1.1 }}
                  className="text-blue-400 font-bold text-xl cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  TechCorp
                </motion.h1>

                {/* HAMBURGER */}
              <div
                className="md:hidden text-white text-2xl cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? "✕" : "☰"}
              </div>

                {/* MENU */}
                <div className="hidden md:flex items-center space-x-8">
                  {navLinks.map((item) => (
                    <motion.div
                      key={item}
                      className="relative group"
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <a
                        href={`#${item.toLowerCase()}`}
                        onClick={(e) => {
                          e.preventDefault()
                          setActive(item)

                          const section = document.getElementById(item.toLowerCase())
                          if (section) {
                            section.scrollIntoView({ behavior: "smooth" })
                          }
                        }}
                        className={`relative z-10 px-3 py-2 transition ${
                          active === item
                            ? "text-blue-400"
                            : "text-white/70 group-hover:text-white"
                        }`}
                      >
                        {item}
                      </a>

                      {/* ACTIVE BG */}
                      {active === item && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute inset-0 bg-blue-500/10 rounded-lg blur-md"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}

                      {/* RIPPLE */}
                      <span className="absolute inset-0 rounded-lg overflow-hidden">
                        <span className="absolute inset-0 scale-0 group-active:scale-150 bg-blue-400/20 rounded-full transition-transform duration-500"></span>
                      </span>

                      {/* GLOW */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-blue-500/20 blur-xl rounded-lg transition duration-300"></div>

                      {/* UNDERLINE */}
                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] bg-blue-400 transition-all duration-300 ${
                          active === item ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* RIGHT SIDE */}
                <div className="hidden md:flex items-center gap-4">

                  {user && (
                    <span className="text-white text-sm">{user.email}</span>
                  )}

                  <motion.button
                    onClick={() => navigate(user ? "/create" : "/login")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
                  >
                    {user ? "Create Blog" : "Login"}
                  </motion.button>

                  {user && (
                    <button
                      onClick={async () => {
                        await signOut(auth)
                        navigate("/")
                      }}
                      className="text-red-400 hover:text-red-500"
                    >
                      Logout
                    </button>
                  )}

                </div>
              </div>
              {isOpen && (
  <div className="md:hidden absolute left-4 right-4 top-full mt-2 bg-black/90 backdrop-blur-xl rounded-2xl p-5 space-y-4 border border-white/10">

    {navLinks.map((item) => (
      <a
        key={item}
        href={`#${item.toLowerCase()}`}
        onClick={(e) => {
          e.preventDefault()
          setIsOpen(false)
          setActive(item)

          const section = document.getElementById(item.toLowerCase())
          if (section) {
            section.scrollIntoView({ behavior: "smooth" })
          }
        }}
        className="block text-white border-b border-white/10 pb-2 hover:text-blue-400"
      >
        {item}
      </a>
    ))}

    {/* LOGIN / BUTTON */}
    <button
      onClick={() => {
        setIsOpen(false)
        navigate(user ? "/create" : "/login")
      }}
      className="w-full bg-blue-500 py-2 rounded"
    >
      {user ? "Create Blog" : "Login"}
    </button>

    {user && (
      <button
        onClick={async () => {
          await signOut(auth)
          navigate("/")
        }}
        className="w-full text-red-400"
      >
        Logout
      </button>
    )}

  </div>
)}
            </motion.nav>


            <div className="pt-20 overflow-x-hidden">
            {/* HERO */}
          
            <section  id="home" className="min-h-[100svh] flex items-center px-6 md:px-16 max-w-7xl mx-auto pb-16 pt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center w-full">
              
                <HeroText />

                {/* <div className="relative w-full h-[400px] flex items-center justify-center"> */}
                <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] flex items-center justify-center">
                  
                  <Hero3D />

                  {/* {!isMobile ? <Hero3D /> : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl" />
              )} */}

                  {/* <div className="absolute w-[300px] h-[300px] border border-blue-400/20 rounded-full animate-[spin_10s_linear_infinite]"></div> */}
                  <div className="absolute w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] border border-blue-400/20 rounded-full animate-[spin_10s_linear_infinite]"></div>

                  {/* <div className="absolute w-[200px] h-[200px] bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div> */}
                  <div className="absolute w-[150px] sm:w-[200px] md:w-[200px] h-[150px] sm:h-[200px] md:h-[200px] bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
                </div>
              </div>
            </section>


              <ParallaxSection />
              <ClientsSection />
              <CompanyIntro />
              <CompanyParallax />
              <AboutSection />
            </div>
            

            {/* TESTIMONIAL SLIDER */}
<section className="py-24 px-6 relative bg-black overflow-hidden">

  <h2 className="text-4xl font-bold text-center mb-16 
    bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 
    bg-clip-text text-transparent">
    What Our Clients Say
  </h2>

  <div className="max-w-4xl mx-auto text-center relative min-h-[300px] px-4 flex items-center justify-center">
    {[
      {
        name: "John Carter",
        role: "Startup Founder",
        text: "TechCorp transformed our business with a powerful and scalable platform.",
        img: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Lisa Wong",
        role: "Product Manager",
        text: "The UI/UX quality is top-notch. Everything feels smooth and modern.",
        img: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        name: "Michael Lee",
        role: "CTO",
        text: "Their cloud solutions helped us scale without worrying about infrastructure.",
        img: "https://randomuser.me/api/portraits/men/76.jpg"
      }
    ].map((t, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: currentTestimonial === i ? 1 : 0,
          scale: currentTestimonial === i ? 1 : 0.9,
        }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 flex flex-col items-center justify-center ${
          currentTestimonial === i ? "z-10" : "z-0"
        }`}
      >

        {/* AVATAR */}
        <img 
          src={t.img} 
          loading="lazy"
          className="w-20 h-20 rounded-full mb-4 border-2 border-blue-400" 
        />
        {/* <img
          src={t.img}
          className="w-20 h-20 rounded-full mb-4 border-2 border-blue-400"
        /> */}

        {/* TEXT */}
        <p className="text-gray-300 mb-4 text-lg max-w-xl">
          “{t.text}”
        </p>

        {/* ⭐ RATING */}
        <div className="flex gap-1 mb-2">
          {"★★★★★".split("").map((star, idx) => (
            <span key={idx} className="text-yellow-400">{star}</span>
          ))}
        </div>

        {/* NAME */}
        <h4 className="font-semibold">{t.name}</h4>
        <p className="text-sm text-blue-400">{t.role}</p>

      </motion.div>
    ))}

  </div>
</section>

           
            {/* SERVICES */}
<section id="services" className="py-24 px-6 md:px-12 relative">

  <div className="absolute inset-0 pointer-events-none">
    <div className="w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full absolute top-0 left-0"></div>
    <div className="w-[300px] h-[300px] bg-purple-500/10 blur-3xl rounded-full absolute bottom-0 right-0"></div>
  </div>

  <Reveal>
    <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
      Our Services
    </h2>
  </Reveal>

  <Reveal>
    <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
      We deliver cutting-edge digital solutions designed to scale your business 
      and bring your ideas to life with modern technology.
    </p>
  </Reveal>

  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
    {[
      {
        title: "Web Development",
        img: webImg,
        desc: "High-performance & SEO optimized websites",
        icon: "🌐",
        price: "Starting from $199",
        badge: "Popular",
        link: "/services/web"
      },
      {
        title: "Mobile Apps",
        img: mobileImg,
        desc: "Cross-platform apps with smooth user experience",
        icon: "📱",
        price: "Starting from $299",
        badge: "Best Choice",
        link: "/services/mobile"
      },
      {
        title: "Cloud Solutions",
        img: cloudImg,
        desc: "Scalable, secure and reliable infrastructure",
        icon: "☁️",
        price: "Starting from $399",
        badge: "New",
        link: "/services/cloud"
      }
    ].map((s, i) => (
      <Reveal key={i}>
        <div className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur border border-white/10 transition duration-500 hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,150,255,0.2)]">

          {/* BADGE */}
          {s.badge && (
            <div className="absolute top-3 left-3 bg-blue-500 text-xs px-3 py-1 rounded-full z-20">
              {s.badge}
            </div>
          )}

          {/* IMAGE */}
          <div className="overflow-hidden">
            <img
              src={s.img}
              className="w-full h-48 object-cover transition duration-500 group-hover:scale-110"
            />
          </div>

          {/* CONTENT */}
          <div className="p-6 relative z-10">
            <div className="text-2xl mb-2">{s.icon}</div>
            <h3 className="text-xl font-bold mb-2">{s.title}</h3>

            <p className="text-blue-400 text-sm mb-2">{s.price}</p>
            <p className="text-gray-400 text-sm mb-4">{s.desc}</p>

            {/*  FIXED BUTTON */}
            <button
              onClick={() => navigate(s.link)}
              className="text-blue-400 text-sm hover:underline"
            >
              Learn More →
            </button>
          </div>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-purple-500/10 blur-xl" />
        </div>
      </Reveal>
    ))}
  </div>

  {/*  FIXED GLOBAL CTA */}
  <div className="text-center mt-16 relative z-10">
    <button
      onClick={() => navigate("/services")}
      className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                 hover:scale-105 transition shadow-lg"
    >
      View All Services →
    </button>
  </div>

</section>

            <TeamSection />

            <BlogSection />

            <ContactSection />

            <Footer />

          </div>
        }
      />

      {/* ROUTES */}
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/teams" element={<TeamSection />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:type" element={<ServiceDetail />} />
      <Route path="/admin" element={<AdminDashboard />} />
      
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<h1>404 Not Found</h1>} />

      

    </Routes>
    </>
  )
}