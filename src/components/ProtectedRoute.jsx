import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import LoadingScreen from "./LoadingScreen"

export default function ProtectedRoute({ children }) {
  const context = useContext(AuthContext)

  //  safety check (anti undefined context)
  if (!context) {
    console.error("AuthContext tidak terbaca")
    return <Navigate to="/login" replace />
  }

  const { user, loading } = context

  console.log("PROTECTED USER:", user)
  console.log("PROTECTED LOADING:", loading)

  // tunggu firebase
  if (loading) {
    return <LoadingScreen />
  }

  //  kalau belum login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  //  kalau sudah login
  return children
}