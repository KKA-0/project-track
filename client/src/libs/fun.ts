export interface PlaylistSlice {
    playlists: any,
    videoPlayer: string
}

interface Video {
    link: string;
    duration: string;
    durationRaw: number;
    done: number | boolean;
}

interface Section {
    [videoTitle: string]: Video;
}

interface Playlist {
    title: string;
    info: string;
    completed: number;
    playlistId: string;
    channelName: string;
    totalDuration: {
        formatted: string;
        hours: number;
        minutes: number;
        seconds: number;
        totalSeconds: number;
    };
    totalVideos: number;
    sections: {
        [sectionTitle: string]: Section;
    };
}

interface Playlists {
    [playlistId: string]: Playlist;
}

export function calculateProgress(playlistData: any, videoTitle: string, checked: boolean, section: string) {
    // Update the 'done' status of the specified video
    console.log(playlistData)
    playlistData.sections[section][videoTitle].done = checked ? 1 : 0;

    let completedVideos = 0;
    let totalVideos = 0;

    // Iterate through all sections and videos to calculate progress
    for (const sectionKey in playlistData.sections) {
        if (playlistData.sections.hasOwnProperty(sectionKey)) {
            const videos = playlistData.sections[sectionKey];
            if (typeof videos !== 'object') {
                continue;
            }

            for (const videoKey in videos) {
                if (videos.hasOwnProperty(videoKey)) {
                    const videoData = videos[videoKey];
                    if (videoData.done === 1 || videoData.done === true) {
                        completedVideos += 1;
                    }
                    totalVideos += 1;
                }
            }
        }
    }

    const progress = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;
    // console.log(progress)
    return progress;
}