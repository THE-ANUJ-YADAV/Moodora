import React, { useState, useRef, useEffect } from 'react';
import { SongContext } from '../song.context';
import { useSong } from '../hooks/useSong';
import '../styles/player.scss';

const Player = () => {
  const audioRef = useRef(null);
  const { song } = useSong(SongContext);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: no repeat, 1: repeat all, 2: repeat one
  const [isLoved, setIsLoved] = useState(false);

  // Update current time as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleNext = () => {
    // Next song logic can be implemented here
    console.log('Next song');
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  if (!song) {
    return null;
  }

  return (
    <div className="spotify-player">
      <audio
        ref={audioRef}
        src={song?.url}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Progress Bar at Top */}
      <div className="progress-bar-container">
        <div className="progress-time">{formatTime(currentTime)}</div>
        <input
          type="range"
          min="0"
          max="100"
          value={progressPercent}
          onChange={handleProgressChange}
          className="progress-bar"
        />
        <div className="progress-time">{formatTime(duration)}</div>
      </div>

      {/* Main Player Content */}
      <div className="player-content">
        
        {/* Left Section - Song Info */}
        <div className="player-left">
          <div className="album-art">
            {song?.posterUrl ? (
              <img src={song.posterUrl} alt="Album art" />
            ) : (
              <div className="placeholder-art"></div>
            )}
          </div>
          <div className="song-meta">
            <h4 className="song-title">{song?.title || 'Unknown Song'}</h4>
            <p className="song-artist">{song?.mood || 'Playlist'}</p>
          </div>
          <button 
            className={`love-btn ${isLoved ? 'loved' : ''}`}
            onClick={() => setIsLoved(!isLoved)}
            title={isLoved ? 'Remove from liked songs' : 'Add to liked songs'}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        {/* Center Section - Controls */}
        <div className="player-center">
          <button
            className={`control-btn shuffle-btn ${isShuffle ? 'active' : ''}`}
            onClick={() => setIsShuffle(!isShuffle)}
            title="Shuffle"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.59 9.38L6.12 4.9A2 2 0 006 4H4a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 00.12-.38l4.47 4.47M14.5 4c1.1 0 2 .89 2 2v.5h2V6a4 4 0 00-4-4h-2v2h2v.5zM4 10a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 00-2-2v-2h2v-2H4zm16 2a2 2 0 00-2-2h-2v2h2v2a2 2 0 002-2v-2z"/>
            </svg>
          </button>

          <button
            className="control-btn prev-btn"
            onClick={handlePrevious}
            title="Previous"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z"/>
            </svg>
          </button>

          <button
            className="control-btn play-btn"
            onClick={togglePlayPause}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          <button
            className="control-btn next-btn"
            onClick={handleNext}
            title="Next"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 18h2V6h-2v12zM2 5v14l8.5-7L2 5z"/>
            </svg>
          </button>

          <button
            className={`control-btn repeat-btn ${repeatMode > 0 ? 'active' : ''}`}
            onClick={() => setRepeatMode((repeatMode + 1) % 3)}
            title="Repeat"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
            </svg>
            {repeatMode === 2 && <span className="repeat-one">1</span>}
          </button>
        </div>

        {/* Right Section - Volume */}
        <div className="player-right">
          <svg className="volume-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => setVolume(e.target.value / 100)}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;