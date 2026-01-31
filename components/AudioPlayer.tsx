import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { SongSample } from '../types';

interface AudioPlayerProps {
  samples: SongSample[];
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ samples }) => {
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (id: number, url: string) => {
    if (currentSong === id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
      setCurrentSong(id);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Ouve a Qualidade</h3>
        <p className="text-gray-600">Exemplos reais criados para outros casais.</p>
      </div>
      
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} className="hidden" />

      <div className="space-y-4">
        {samples.map((sample) => (
          <div 
            key={sample.id}
            className={`flex items-center justify-between p-4 rounded-xl transition-all border ${
              currentSong === sample.id ? 'bg-brand-50 border-brand-200' : 'bg-gray-50 border-transparent hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => togglePlay(sample.id, sample.url)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  currentSong === sample.id && isPlaying 
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-brand-300'
                }`}
              >
                {currentSong === sample.id && isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
              </button>
              <div>
                <h4 className={`font-bold ${currentSong === sample.id ? 'text-brand-700' : 'text-gray-900'}`}>
                  {sample.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Music size={12} />
                  <span>{sample.genre}</span>
                </div>
              </div>
            </div>
            
            {currentSong === sample.id && isPlaying && (
              <div className="flex gap-1 h-4 items-end">
                <div className="w-1 bg-brand-500 animate-[bounce_1s_infinite] h-2"></div>
                <div className="w-1 bg-brand-500 animate-[bounce_1.2s_infinite] h-4"></div>
                <div className="w-1 bg-brand-500 animate-[bounce_0.8s_infinite] h-3"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
