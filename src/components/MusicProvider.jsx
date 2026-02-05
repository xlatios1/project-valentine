import { createContext, useRef, useContext } from "react";
import musicFile from "../assets/music/blue.mp3";

// Create the context
const MusicContext = createContext();

// Provider component
export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch((e) => console.log("Autoplay blocked", e));
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <MusicContext.Provider value={{ playMusic, pauseMusic }}>
      <audio ref={audioRef} src={musicFile} loop />
      {children}
    </MusicContext.Provider>
  );
};

// Custom hook for convenience
export const useMusic = () => useContext(MusicContext);
