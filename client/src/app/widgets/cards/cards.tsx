"use client"
import * as React from 'react';
import Link from 'next/link';
import { MoreVertical, Play } from 'lucide-react';

export default function Cards({ title, info, completed, playlistId, channelName, duration, totalVideos }: { title: string, info: string, completed: number, playlistId: string, channelName: string, duration: string, totalVideos: number }) {
  function ProgressBar({ value }: { value: number }) {
    return (
      <div className="relative w-full h-2 bg-indigo-700 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-purple-500 rounded-full transition-all duration-300 glow"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  }
  return (
    <div className="group relative w-[330px] bg-gradient-to-br via-indigo-800 to-indigo-900 rounded-xl overflow-hidden border border-indigo-700 hover:border-purple-500 transition-all duration-300 m-2">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px_16px]" />

      <div className="relative p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-500 transition-colors">
            {title}
          </h3>
          <button className="p-1 hover:bg-indigo-700 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <p className="text-gray-400 text-sm">
          {info}
        </p>
        <div className="flex items-center space-x-2 text-purple-500">
          <span className="text-sm text-gray-400">{duration.split(':').slice(0, 2).join('h ') + 'm'}</span>
          <span className="text-sm text-gray-400">{totalVideos} Videos</span>
        </div>

        <div className="flex items-center space-x-2 text-purple-500">
          <span className="text-sm font-medium">{channelName}</span>
        </div>

        <div className="space-y-3">
          <ProgressBar value={completed} />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">{(completed || 0).toFixed(1)}% Complete</span>
            <Link href={{ pathname: '/playlists/player', query: { playlistId: playlistId } }}>
              <button className="flex items-center space-x-1 bg-purple-500 hover:bg-purple-600 text-black font-medium px-3 py-1 rounded-full transition-colors">
                <Play className="w-4 h-4" />
                {
                  completed === 0 ? (
                    <span>Start Now</span>
                  ) : completed < 100 ? (
                    <span>Continue</span>
                  ) : (
                    <span>Completed</span>
                  )
                }
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none border border-purple-500/20 rounded-xl" />
    </div>
  );
}
