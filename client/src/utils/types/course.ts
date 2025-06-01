export interface Video {
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    progress: number; // 0-100
    isCompleted: boolean;
    dueDate?: Date; // Optional due date for the video
}

export interface CourseSection {
    id: string;
    title: string;
    description: string;
    videos: Video[];
    isExpanded?: boolean;
}

export interface Course {
    id: string;
    title: string;
    sections: CourseSection[];
}