import { useState } from "react";
import { Outlet } from "react-router-dom"
import { ThemeProvider } from "./components/theme/theme-provider";
import Navbar from "./components/Navbar";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div className="App">
      {isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="loading-text"></div>
        </div>
      ) : (
        <>
          <Navbar />
          <main>
            <Outlet />
          </main>
        </>
      )}
    </div>
  </ThemeProvider>
  )
}

export default App
