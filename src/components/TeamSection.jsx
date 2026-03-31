import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

import team1 from "../assets/developer-1.avif"
import team2 from "../assets/developer-2.avif"
import team3 from "../assets/developer-3.avif"
import team4 from "../assets/developer-4.avif"
import team5 from "../assets/developer-5.avif"
import team6 from "../assets/developer-6.avif"
import team7 from "../assets/developer-7.avif"
import team8 from "../assets/developer-8.avif"

export default function TeamSection() {

  const team = [
    { name: "Alex Johnson", role: "Frontend Developer", email: "alex@techcorp.com", img: team1 },
    { name: "Michael Chen", role: "Backend Engineer", email: "michael@techcorp.com", img: team2 },
    { name: "David Kim", role: "UI/UX Designer", email: "david@techcorp.com", img: team3 },
    { name: "Ryan Smith", role: "Cloud Engineer", email: "ryan@techcorp.com", img: team4 },
    { name: "Sophie Williams", role: "Mobile Developer", email: "sophie@techcorp.com", img: team5 },
    { name: "Alice Lee", role: "AI Engineer", email: "alice@techcorp.com", img: team6 },
    { name: "Emma Brown", role: "Product Designer", email: "emma@techcorp.com", img: team7 },
    { name: "Lucy Martin", role: "Cyber Security", email: "lucy@techcorp.com", img: team8 },
  ]

  const generateSocial = (name) => {
    const username = name.toLowerCase().replace(/\s+/g, "")
    return {
      linkedin: `https://linkedin.com/in/${username}`,
      github: `https://github.com/${username}`,
      twitter: `https://twitter.com/${username}`,
      instagram: `https://instagram.com/${username}`,
    }
  }

  const teamWithSocial = team.map((m) => ({
    ...m,
    social: generateSocial(m.name),
  }))

  const track1 = useRef(null)
  const track2 = useRef(null)
  const isPaused = useRef(false)

  useEffect(() => {
    let raf
    let x1 = 0
    let x2 = 0
    let lastTime = performance.now()

    // 🔥 RESPONSIVE SPEED
    const speed = window.innerWidth < 768 ? 40 : 80

    const animate = (now) => {
      const t1 = track1.current
      const t2 = track2.current
      if (!t1 || !t2) return

      const delta = (now - lastTime) / 1000
      lastTime = now

      const width = t1.scrollWidth / 2

      if (!isPaused.current) {
        x1 -= speed * delta
        x2 += speed * delta
      }

      if (Math.abs(x1) >= width) x1 = 0
      if (Math.abs(x2) >= width) x2 = 0

      t1.style.transform = `translate3d(${x1}px,0,0)`
      t2.style.transform = `translate3d(${-width + x2}px,0,0)`

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  const Card = (member, i) => (
    <motion.div
      key={i}
      className="
        group relative text-center flex-shrink-0
        w-[180px] sm:w-[200px] md:w-[240px]
        mr-4 sm:mr-6 md:mr-10
      "
    >
      <div className="
        relative p-[2px] rounded-xl md:rounded-2xl
        bg-gradient-to-br from-pink-500/40 to-purple-500/40
        hover:from-pink-500 hover:to-purple-500 transition duration-500
      ">
        <div className="bg-black rounded-xl md:rounded-2xl p-3 sm:p-4 backdrop-blur">

          <img
            src={member.img}
            alt={member.name}
            className="
              w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36
              mx-auto object-cover rounded-lg md:rounded-xl
              group-hover:scale-110 transition duration-500
            "
          />

          <div className="mt-3 space-y-1">
            <h3 className="font-semibold text-sm sm:text-base md:text-lg">
              {member.name}
            </h3>

            <p className="text-pink-400 text-xs sm:text-sm">
              {member.role}
            </p>

            <p className="text-gray-400 text-[10px] sm:text-xs">
              {member.email}
            </p>

            <div className="
              flex justify-center gap-2 mt-2
              opacity-100 md:opacity-0 md:group-hover:opacity-100
              transition
            ">
              <a href={member.social.linkedin}><i className="ri-linkedin-fill"></i></a>
              <a href={member.social.github}><i className="ri-github-fill"></i></a>
              <a href={member.social.twitter}><i className="ri-twitter-x-fill"></i></a>
              <a href={member.social.instagram}><i className="ri-instagram-line"></i></a>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )

  return (
    <section id="teams" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden">

      {/* TITLE */}
      <h2 className="
        text-2xl sm:text-3xl md:text-4xl 
        font-bold text-center mb-10 md:mb-16
      ">
        Meet Our Experts
      </h2>

      <div
        className="relative overflow-hidden space-y-6 md:space-y-10"
        onMouseEnter={() => (isPaused.current = true)}
        onMouseLeave={() => (isPaused.current = false)}
      >

        {/* EDGE FADE (RESPONSIVE) */}
        <div className="absolute left-0 top-0 w-12 sm:w-20 md:w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 w-12 sm:w-20 md:w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />

        {/* ROW 1 */}
        <div ref={track1} className="flex w-max">
          {[...teamWithSocial, ...teamWithSocial].map(Card)}
        </div>

        {/* ROW 2 */}
        <div ref={track2} className="flex w-max">
          {[...teamWithSocial, ...teamWithSocial].map(Card)}
        </div>

      </div>
    </section>
  )
}