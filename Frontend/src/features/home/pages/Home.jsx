import React, { useState } from 'react'
import FaceExpression from "../../Expression/components/FaceExpression"
import Player from "../components/Player"
import { useSong } from '../hooks/useSong'
import '../styles/home.scss'

const Home = () => {

   const { handleGetSong } = useSong()
   const [showPlayer, setShowPlayer] = useState(false)

   const handleDetection = (expression) => {
      handleGetSong({ mood: expression })
      setShowPlayer(true)
   }

  return (
    <div className="home-container">
      <main className="home-content">
        <FaceExpression
          onclick={handleDetection}
        />
        {showPlayer && <Player />}
      </main>
    </div>
  )
}

export default Home
