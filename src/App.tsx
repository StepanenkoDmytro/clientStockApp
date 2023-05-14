
import { Outlet, Navigate } from 'react-router-dom'
import './App.css'
import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header.tsx'



function App() {

  return (
    <>
      {location.pathname === "/" && <Navigate to="/coins" />}
      <Header/>
      <Outlet />
      <Footer />
    </>
  )
}

export default App
