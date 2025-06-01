"use client"
import * as React from "react"
import VideoCard from "./../videoCard/videoCard"
import { useSelector } from "react-redux"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"

interface VideoCardProps {
  videoData: Array<object>
}

const plan = {
  "Introduction to Go": {
    "start_date": "2025-05-25",
    "end_date": "2025-05-28",
    "videos": {
      "Welcome to series on GO programming language": {
        "date": "2025-05-28"
      },
      "Before you start with golang": {
        "date": "2025-05-28"
      },
      "Golang installation and hello world": {
        "date": "2025-05-28"
      },
      "GOPATH and reading go docs": {
        "date": "2025-05-29"
      },
      "Lexer in golang and Types": {
        "date": "2025-05-29"
      }
    }
  },
  "Variables and Data Types": {
    "start_date": "2025-05-28",
    "end_date": "2025-06-01",
    "videos": {
      "Variables, types and constants": {
        "date": "2025-05-30"
      },
      "Conversions in golang": {
        "date": "2025-05-30"
      },
      "Handling time in golang": {
        "date": "2025-05-31"
      },
      "Comma ok syntax and packages in golang": {
        "date": "2025-06-01"
      }
    }
  },
  "Control Flow": {
    "start_date": "2025-06-02",
    "end_date": "2025-06-03",
    "videos": {
      "If else in golang": {
        "date": "2025-06-02"
      },
      "Loop break continue and goto in golang": {
        "date": "2025-06-02"
      },
      "Switch case in golang and online playground": {
        "date": "2025-06-03"
      }
    }
  },
  "Functions and Methods": {
    "start_date": "2025-06-04",
    "end_date": "2025-06-05",
    "videos": {
      "Functions in golang": {
        "date": "2025-06-04"
      },
      "Methods in golang": {
        "date": "2025-06-04"
      },
      "Defer in golang": {
        "date": "2025-06-05"
      }
    }
  },
  "Data Structures": {
    "start_date": "2025-06-06",
    "end_date": "2025-06-09",
    "videos": {
      "Array in golang": {
        "date": "2025-06-06"
      },
      "Slices in golang": {
        "date": "2025-06-06"
      },
      "Maps in golang": {
        "date": "2025-06-07"
      },
      "Structs in golang": {
        "date": "2025-06-08"
      },
      "How to remove a value from slice based on index in golang": {
        "date": "2025-06-09"
      }
    }
  },
  "File Handling": {
    "start_date": "2025-06-10",
    "end_date": "2025-06-10",
    "videos": {
      "Working with files in golang": {
        "date": "2025-06-10"
      }
    }
  },
  "Building and Memory Management": {
    "start_date": "2025-06-11",
    "end_date": "2025-06-12",
    "videos": {
      "Pointers in golang": {
        "date": "2025-06-11"
      },
      "Memory management in golang": {
        "date": "2025-06-11"
      },
      "Build for windows, linux and mac": {
        "date": "2025-06-12"
      }
    }
  },
  "MongoDB with Go": {
    "start_date": "2025-06-13",
    "end_date": "2025-06-16",
    "videos": {
      "Making a connection to database in golang": {
        "date": "2025-06-13"
      },
      "Insert data in mongodb in golang": {
        "date": "2025-06-13"
      },
      "Get all movies from DB in golang": {
        "date": "2025-06-14"
      },
      "Update a record in mongodb in golang": {
        "date": "2025-06-14"
      },
      "Delete 1 and all movie in golang": {
        "date": "2025-06-15"
      },
      "Delete one and delete many in mongodb in golang": {
        "date": "2025-06-15"
      },
      "Get all collection in mongodb in golang": {
        "date": "2025-06-16"
      },
      "Defining models for netflix in golang": {
        "date": "2025-06-16"
      },
      "MongoDB setup for API in golang": {
        "date": "2025-06-16"
      },
      "Mark movie as watched in golang": {
        "date": "2025-06-16"
      }
    }
  },
  "Web Development with Go": {
    "start_date": "2025-06-17",
    "end_date": "2025-06-20",
    "videos": {
      "Handling web request in golang": {
        "date": "2025-06-17"
      },
      "Handling URL in golang": {
        "date": "2025-06-17"
      },
      "How to make GET request in golang": {
        "date": "2025-06-18"
      },
      "How to make POST request with JSON data in golang": {
        "date": "2025-06-18"
      },
      "How to consume JSON data in golang": {
        "date": "2025-06-19"
      },
      "How to create JSON data in golang": {
        "date": "2025-06-19"
      },
      "How to send form data in golang": {
        "date": "2025-06-20"
      },
      "Creating server for golang frontend": {
        "date": "2025-06-20"
      }
    }
  },
  "Building APIs with Go": {
    "start_date": "2025-06-21",
    "end_date": "2025-06-24",
    "videos": {
      "Building API in golang - Models": {
        "date": "2025-06-21"
      },
      "Add a course controller in golang": {
        "date": "2025-06-21"
      },
      "Update a course controller in golang": {
        "date": "2025-06-22"
      },
      "Delete a course controller in golang": {
        "date": "2025-06-22"
      },
      "Get one course based on request id in golang": {
        "date": "2025-06-23"
      },
      "Sending a API json response for all courses in golang": {
        "date": "2025-06-23"
      },
      "Handling routes and testing routes in golang": {
        "date": "2025-06-24"
      }
    }
  },
  "Advanced Go Concepts": {
    "start_date": "2025-06-25",
    "end_date": "2025-06-25",
    "videos": {
      "A long video on MOD in golang": {
        "date": "2025-06-25"
      }
    }
  }
}

// Custom Accordion Components
const Accordion = ({
  children,
  expanded,
  onChange,
  id,
}: {
  children: React.ReactNode
  expanded: boolean
  onChange: () => void
  id: string
}) => (
  <div className="accordion-item border border-gray-200/60 dark:border-gray-700/60 border-b-0 last:border-b rounded-lg mb-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
    {children}
  </div>
)

const AccordionSummary = ({
  children,
  onClick,
  expanded,
}: {
  children: React.ReactNode
  onClick: () => void
  expanded: boolean
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between p-5 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-inset ${expanded
      ? "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750"
      : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750"
      }`}
  >
    <div className="flex-1">{children}</div>
    <div className={`transform transition-transform duration-300 ml-4 ${expanded ? "rotate-90" : "rotate-0"}`}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-500 dark:text-gray-400"
      >
        <polyline points="9,18 15,12 9,6"></polyline>
      </svg>
    </div>
  </button>
)

const AccordionDetails = ({
  children,
  expanded,
}: {
  children: React.ReactNode
  expanded: boolean
}) => (
  <div
    className={`accordion-content overflow-hidden transition-all duration-300 ease-in-out ${expanded ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
      }`}
  >
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="p-6 max-h-[calc(85vh-2rem)] min-h-fit overflow-y-auto  custom-scrollbar">
        <div className="video-cards-container">{children}</div>
      </div>
    </div>
  </div>
)

const Typography = ({
  children,
  variant = "body1",
}: {
  children: React.ReactNode
  variant?: string
}) => <span className="text-gray-800 dark:text-gray-100 font-semibold text-base tracking-wide">{children}</span>

export default function CustomizedAccordions({ currentlyPlaying }: { currentlyPlaying: string }) {
  const [expanded, setExpanded] = React.useState<string | false>("panel1")

  const handleChange = (panel: string) => () => {
    setExpanded(expanded === panel ? false : panel)
  }

  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())
  const paramsPlaylistid = params.playlistId
  const StatePlaylists = useSelector((state: any) => state.store.playlists[paramsPlaylistid]?.sections)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.97);
          border-radius: 4px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(255, 255, 255);
          background-clip: content-box;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(255, 255, 255);
          background-clip: content-box;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(255, 255, 255);
          background-clip: content-box;
        }
        
        /* Video card styling improvements */
        .video-cards-container :global(.video-card) {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(255, 255, 255, 0.93);
          border: 1px solid rgb(255, 255, 255);
          margin-bottom: 12px;
          padding: 16px;
          transition: all 0.2s ease;
        }
        
        .video-cards-container :global(.video-card:hover) {
          box-shadow: 0 4px 16px rgb(255, 255, 255);
          transform: translateY(-1px);
        }
        
        .dark .video-cards-container :global(.video-card) {
          background: rgb(255, 255, 255);
          border-color: rgb(255, 255, 255);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        .dark .video-cards-container :global(.video-card:hover) {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }
        
        /* Video title always visible */
        .video-cards-container :global(.video-title) {
          opacity: 1 !important;
          visibility: visible !important;
          font-weight: 500;
          color: black;
          font-size: 14px;
          line-height: 1.4;
          margin-bottom: 8px;
        }
        
        .dark .video-cards-container :global(.video-title) {
          color: black;
        }
        
        /* Checkbox centering */
        .video-cards-container :global(.video-checkbox) {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        
        .video-cards-container :global(input[type="checkbox"]) {
          width: 18px;
          height: 18px;
          accent-color: #3b82f6;
          cursor: pointer;
        }
      `}</style>

      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400"></div>
            <span className="ml-4 text-gray-600 dark:text-gray-400 font-medium">Loading sections...</span>
          </div>
        }
      >
        {StatePlaylists ? (
          <div className="space-y-3">
            {Object.keys(StatePlaylists).map((key) => (
              <Accordion key={key} expanded={expanded === key} onChange={handleChange(key)} id={key}>
                <AccordionSummary onClick={handleChange(key)} expanded={expanded === key}>
                  <Typography>{key}
                    {((plan[key].start_date) <= new Date().toISOString() && (plan[key].end_date) >= new Date().toISOString()) ? <Badge className="ml-2 bg-green-500/10 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-800 shrink-0">
                      Continue
                    </Badge> : ((plan[key].end_date) < new Date().toISOString()) ? <Badge className="ml-2 bg-red-500/10 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-800 shrink-0">
                      Over Due
                    </Badge> : ""}</Typography>
                </AccordionSummary>
                <AccordionDetails expanded={expanded === key}>
                  <VideoCard videoData={StatePlaylists[key]} section={key} currentlyPlaying={currentlyPlaying} />
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No sections available</p>
          </div>
        )}
      </Suspense>
    </div>
  )
}
