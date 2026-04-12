import { useState } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes.jsx'
import "./features/shared/styles/global.scss"
import { AuthProvider } from './features/auth/auth.context.jsx'
import { SongContextProvider } from './features/home/song.context.jsx'
import Navbar from './features/shared/components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
   <AuthProvider>
    <SongContextProvider>
      <Navbar />
      <RouterProvider router={router} />
    </SongContextProvider> 
   </AuthProvider>
  )
}

export default App
