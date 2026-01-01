
import { useEffect, useRef, useState } from 'react'
import './App.css'
import type { Track } from './types/track';
import { tracks } from './data/tracks';

function App() {

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // defining states
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentTrack: Track = tracks[currentTrackIndex];
  
  
  // Play Pause Logic
  const togglePlay = () => {

    if(!audioRef.current) return;
    if(isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  // Track Navigation 

  const playNext = () => {
    setCurrentTrackIndex((prev) => prev === tracks.length - 1? 0 : prev + 1)
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) => prev === 0? tracks.length - 1: prev - 1)
  }

  useEffect(() => {
    if(!audioRef) return;

    if(isPlaying) {
      audioRef.current?.load();
      audioRef.current?.play();
    }
  }, [currentTrackIndex])

  // 

  return (
    <>
    <div className="music-player">
    <div className="track">
    <div className="cover-img">
    <img src={currentTrack.cover} alt="" />
    </div>
      <audio ref={audioRef} src={currentTrack.src}/>
      <h2>{currentTrack.title}</h2>
      <p>{currentTrack.artist}</p>
      </div>
      <div className="controller">
        <button onClick={playPrev}>&lt; Prev</button>
        <button onClick={togglePlay}>{isPlaying? "❚❚" : "▶"}</button>
        <button onClick={playNext}>Next {">"}</button>
      </div>
      </div>
    </>
  )
}

export default App
