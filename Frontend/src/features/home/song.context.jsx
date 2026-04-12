import {  createContext, useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({ children }) =>{

    const [song, setSong] = useState({

        "url": "https://ik.imagekit.io/grexd5jze/moodora/songs/So_High__RiskyjaTT.CoM__nUyh9eBzl.mp3",
        "posterUrl": "https://ik.imagekit.io/grexd5jze/moodora/posters/So_High__RiskyjaTT.CoM__r6vMumHB_.jpeg",
        "title": "So High (RiskyjaTT.CoM)",
        "mood": "happy",

    })

    const [loading, setLoading] = useState(false)

    return(
        <SongContext.Provider
          value={{ loading, setLoading, song, setSong }}
        >
            {children}
        </SongContext.Provider>
    )
}