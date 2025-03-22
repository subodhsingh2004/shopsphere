import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import { ThemeProvider } from "./contexts/Theme.js"
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"

function App() {
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
