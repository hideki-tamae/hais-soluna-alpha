// components/ThemeSongPlayer.tsx

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";

export default function ThemeSongPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 曲のパス
  const SONG_PATH = "/soluna_rnb.mp3";

  // --- 🎵 外部からの制御イベントをリッスン ---
  useEffect(() => {
    // 1. 一時停止命令を受け取る関数
    const handlePauseRequest = () => {
      if (audioRef.current && !audioRef.current.paused) {
        // フェードアウト演出（0.5秒かけて音量を0にしてから停止）
        const fadeOut = setInterval(() => {
          if (audioRef.current && audioRef.current.volume > 0.1) {
            audioRef.current.volume -= 0.1;
          } else {
            clearInterval(fadeOut);
            audioRef.current?.pause();
            if (audioRef.current) audioRef.current.volume = 1.0; // 音量を戻しておく
            setIsPlaying(false);
          }
        }, 50);
      }
    };

    // 2. イベントリスナーを登録 ('pause-theme-song' という合言葉)
    window.addEventListener('pause-theme-song', handlePauseRequest);

    return () => {
      window.removeEventListener('pause-theme-song', handlePauseRequest);
    };
  }, []);
  // ----------------------------------------

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioData);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const clickX = e.nativeEvent.offsetX;
    const width = e.currentTarget.clientWidth;
    const newTime = (clickX / width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 animate-fade-in-up">
      {/* プレイヤー本体 */}
      <div className={`
        relative flex items-center gap-4 p-4 rounded-2xl border backdrop-blur-md transition-all duration-500 shadow-2xl
        ${isPlaying 
          ? "bg-black/60 border-blue-500/30 w-full max-w-sm" 
          : "bg-black/40 border-white/10 w-auto hover:bg-black/60"
        }
      `}>
        <audio ref={audioRef} src={SONG_PATH} preload="metadata" />

        {/* 再生/停止ボタン */}
        <button
          onClick={togglePlay}
          className={`
            flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 shadow-lg group
            ${isPlaying 
              ? "bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-blue-500/30" 
              : "bg-white/10 text-white hover:bg-white/20"
            }
          `}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-1" />
          )}
        </button>

        {/* 再生中の情報表示エリア */}
        <div className={`
          flex-1 overflow-hidden transition-all duration-500 flex flex-col justify-center
          ${isPlaying ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0 hidden"}
        `}>
          <div className="flex justify-between items-end mb-1">
            <span className="text-xs font-bold text-blue-200 tracking-wider flex items-center gap-1">
              <Music className="w-3 h-3" />
              SOLUNA
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {formatTime(audioRef.current?.currentTime || 0)} / {formatTime(duration)}
            </span>
          </div>

          <div 
            className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer overflow-hidden relative group"
            onClick={handleSeek}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* 閉じた状態の時のラベル */}
        {!isPlaying && (
          <div 
            onClick={togglePlay}
            className="hidden md:block text-xs font-medium text-slate-300 pr-2 cursor-pointer hover:text-white transition-colors"
          >
            <span className="block text-[10px] text-blue-400 tracking-widest uppercase mb-0.5">Theme Song</span>
            Play "SOLUNA"
          </div>
        )}
      </div>

      {isPlaying && (
        <button 
          onClick={toggleMute}
          className="p-2 rounded-full bg-black/40 border border-white/5 text-slate-400 hover:text-white hover:bg-black/60 transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}