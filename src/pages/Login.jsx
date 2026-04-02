import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
  e.preventDefault()
  setError("")

  try {
    const res = await signInWithEmailAndPassword(auth, email, password)

    const user = res.user

    //  CEK ADMIN
    if (user.email === "alif123@gmail.com") {
      navigate("/admin")
    } else {
      navigate("/")
    }

  } catch (err) {
    setError("Email atau password salah / akun belum terdaftar")
  }
}

  // const handleLogin = async (e) => {
  //   e.preventDefault()
  //   setError("")

  //   try {
  //     await signInWithEmailAndPassword(auth, email, password)
  //     navigate("/") //  kembali ke home setelah login
  //   } catch (err) {
  //     setError("Email atau password salah / akun belum terdaftar")
  //   }
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl w-[350px] shadow-lg">

        {/*  BACK KE HOME */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-blue-400 hover:underline"
        >
          ← Kembali ke Home
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Masukkan email"
            className="p-2 rounded bg-black/40 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Masukkan password"
            className="p-2 rounded bg-black/40 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 p-2 rounded mt-2"
          >
            Login
          </button>
        </form>

        {/* 🔗 KE REGISTER */}
        <p className="text-sm text-white mt-4 text-center">
          Belum punya akun?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Daftar di sini
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login