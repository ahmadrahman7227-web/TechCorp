import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

const Register = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate("/") //  langsung ke home
    } catch (err) {
      setError("Gagal daftar! Email sudah digunakan atau tidak valid")
    }
  }

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
          Register
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">

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
            className="bg-green-500 hover:bg-green-600 p-2 rounded mt-2"
          >
            Register
          </button>
        </form>

        {/*  KE LOGIN */}
        <p className="text-sm text-white mt-4 text-center">
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login di sini
          </span>
        </p>

      </div>
    </div>
  )
}

export default Register