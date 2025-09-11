import { use, useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import { ThemeProvider } from "./contexts/Theme.js"
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import { useDispatch } from "react-redux"

function App() {
  const dispatch = useDispatch()
  const [themeMode, setThemeMode] = useState("light")

  const lightTheme = () => {
    setThemeMode("light")
  }

  const darkTheme = () => {
    setThemeMode("dark")
  }

  useEffect(() => {
    document.body.classList.remove("light", "dark")
    document.body.classList.add(themeMode)
  }, [themeMode])

  useEffect(() => {
    const token = sessionStorage.getItem("token")
  }, [])


  return (
    <>
      <ThemeProvider value={{ lightTheme, darkTheme, themeMode }}>
        <Navbar />
        <Outlet />
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
