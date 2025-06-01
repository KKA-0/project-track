"use client"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { IoMdPlayCircle } from "react-icons/io"
import { Clock, Play, Check } from "lucide-react"
import Cookies from "js-cookie"
import { useSelector } from "react-redux"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch } from "./../../../libs/hooks/hooks"
import { videoStatus, currentVideo } from "./../../../libs/features/playlists.slice"
import { usePost } from "@/utils/api/apiService"
import { calculateProgress } from "@/libs/fun"

export default function VideoCard({
  videoData,
  section,
  currentlyPlaying,
}: {
  videoData: any
  section: any
  currentlyPlaying: string
}) {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())
  const playlistId = params?.playlistId
  const post = usePost("playlists/video/status")
  const playlists = useSelector((state: any) => state.store.playlists)

  const handleVideoPlayer = (link: { link: string }) => {
    dispatch(currentVideo(link))
  }

  const handleCheckbox = (videoTitle: any, checked: boolean) => {
    const token = Cookies.get("access_token") || null
    if (token) {
      const editablePlaylist = structuredClone(playlists[playlistId])
      const progress = calculateProgress(editablePlaylist, videoTitle, checked, section)
      console.log({ progress })
      dispatch(videoStatus({ videoTitle, checked, playlistId, section, isUser: true, progress }))
      post.mutate(
        { playlistId, section, videoTitle, checked, completedState: progress },
        {
          onSuccess: (data: any) => {
            console.log("YOo bro")
          },
        },
      )
    } else {
      dispatch(videoStatus({ videoTitle, checked, playlistId, section, isUser: false }))
    }
  }

  return (
    <TooltipProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        }
      >
        <div className="space-y-3">
          {videoData &&
            Object.keys(videoData).map((key) => (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <Card
                    className={`group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border shadow-md bg-white backdrop-blur-sm ${videoData[key].link === currentlyPlaying
                      ? "ring-2 ring-primary border-primary shadow-primary/20"
                      : "hover:border-primary/50"
                      }`}
                    onClick={() => handleVideoPlayer(videoData[key].link)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {/* Play indicator */}
                        <div className="flex-shrink-0">
                          {videoData[key].link === currentlyPlaying ? (
                            <div className="relative">
                              <IoMdPlayCircle className="w-10 h-10 text-primary animate-pulse" />
                              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-200 group-hover:scale-110">
                              <Play className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                          )}
                        </div>

                        {/* Content - Title always visible */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            {/* Duration badge */}
                            <Badge variant="secondary" className="flex items-center gap-1 text-xs font-medium shrink-0">
                              <Clock className="w-3 h-3" />
                              {videoData[key].duration}
                            </Badge>

                            {/* Completion indicator */}
                            {(videoData[key].done) ? (
                              <Badge className="bg-green-500/10 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-800 shrink-0">
                                ✓ Completed
                              </Badge>
                            ) : ""}
                            {1 && (
                              <Badge className="bg-orange-500/10 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-800 shrink-0">
                                Due Today
                              </Badge>
                            )}
                          </div>

                          {/* Title - Always visible and prominent */}
                          <h3 className="text-sm font-medium text-primary leading-relaxed line-clamp-2 group-hover:text-primary transition-colors">
                            {key}
                          </h3>
                        </div>

                        {/* Checkbox - Centered vertically */}
                        <div className="flex-shrink-0 flex items-center justify-center">
                          <div className="flex items-center justify-center w-12 h-12">
                            <Checkbox
                              checked={videoData[key].done}
                              onCheckedChange={(checked) => handleCheckbox(key, checked)}
                              className="w-5 h-5 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white border-2 transition-all duration-200 hover:scale-110"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-sm font-medium">{key}</p>
                  <p className="text-xs text-muted-foreground mt-1">Duration: {videoData[key].duration}</p>
                </TooltipContent>
              </Tooltip>
            ))}
        </div>
      </Suspense>
    </TooltipProvider>
  )
}
