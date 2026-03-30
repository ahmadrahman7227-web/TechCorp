import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
// import { useState } from "react"

import team1 from "../assets/developer-1.avif"
import team2 from "../assets/developer-2.avif"
import team3 from "../assets/developer-3.avif"
import team4 from "../assets/developer-4.avif"
import team5 from "../assets/developer-5.avif"
import team6 from "../assets/developer-6.avif"
import team7 from "../assets/developer-7.avif"
import team8 from "../assets/developer-8.avif"



export default function TeamSection() {
    // const [team, setTeam] = useState([])

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

  const teamWithSocial = team.map((member) => ({
    ...member,
    social: generateSocial(member.name),
  }))

  //  2 TRACK
  const track1 = useRef(null)
  const track2 = useRef(null)
  const isPaused = useRef(false)

//   useEffect(() => {
//   const fetchTeam = async () => {
//     try {
//       const res = await fetch("https://randomuser.me/api/?results=8&nat=CN,JP,KR")
//       const data = await res.json()

//       const mapped = data.results.map((user) => ({
//         name: `${user.name.first} ${user.name.last}`,
//         role: "Software Engineer",
//         email: user.email,
//         img: user.picture.large,
//       }))

//       setTeam(mapped)

//     } catch (err) {
//       console.error(err)
//     }
//   }

//   fetchTeam()
// }, [])

//     const roles = [
//   "Frontend Developer",
//   "Backend Engineer",
//   "UI/UX Designer",
//   "Cloud Engineer",
//   "AI Engineer",
//   "Mobile Developer",
// ]

// const mapped = data.results.map((user) => ({
//   name: `${user.name.first} ${user.name.last}`,
//   role: roles[Math.floor(Math.random() * roles.length)],
//   email: user.email,
//   img: user.picture.large,
// }))

  useEffect(() => {
  let raf
  let x1 = 0
  let x2 = 0
  let lastTime = performance.now()

  const speed = 100 // px per detik (INI BARU KERASA!)

  const animate = (now) => {
    const t1 = track1.current
    const t2 = track2.current
    if (!t1 || !t2) return

    const delta = (now - lastTime) / 1000 // detik
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
      className="group relative text-center w-64 flex-shrink-0 mr-10"
    >
      <div className="relative p-[2px] rounded-2xl 
        bg-gradient-to-br from-pink-500/40 to-purple-500/40
        hover:from-pink-500 hover:to-purple-500 transition duration-500"
      >
        <div className="bg-black rounded-2xl p-4 backdrop-blur">

          <img
            src={member.img}
            alt={member.name}
            className="w-40 h-40 mx-auto object-cover rounded-xl group-hover:scale-110 transition duration-500"
          />

          <div className="mt-4 space-y-1">
            <h3 className="font-bold text-lg">{member.name}</h3>
            <p className="text-pink-400 text-sm">{member.role}</p>
             <p className="text-gray-400 text-xs">{member.email}</p>

            <div className="flex justify-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition">
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
    <section id="teams" className="py-24 px-6 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-16">
        Meet Our Experts
      </h2>

      <div className="relative overflow-hidden space-y-10"
        onMouseEnter={() => (isPaused.current = true)}
        onMouseLeave={() => (isPaused.current = false)}
      >

        {/* GRADIENT */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />

        {/* 🔥 ROW 1 */}
        <div ref={track1} className="flex w-max">
          {[...teamWithSocial, ...teamWithSocial].map(Card)}
        </div>

        {/* 🔥 ROW 2 (REVERSE) */}
        <div ref={track2} className="flex w-max">
          {[...teamWithSocial, ...teamWithSocial].map(Card)}
        </div>

      </div>
    </section>
  )
}