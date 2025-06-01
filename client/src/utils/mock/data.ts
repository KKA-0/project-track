import { Course } from '../types/course';

export const mockCourseData: Course = {
    id: "course-1",
    title: "Advanced React Development Masterclass",
    sections: [
        {
            id: "section-1",
            title: "Getting Started with React",
            description: "Learn the fundamentals of React and set up your development environment.",
            videos: [
                {
                    id: "video-1-1",
                    title: "Introduction to React",
                    duration: "12:45",
                    thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    progress: 100,
                    isCompleted: true
                },
                {
                    id: "video-1-2",
                    title: "Setting Up Your Dev Environment",
                    duration: "18:30",
                    thumbnail: "https://images.pexels.com/photos/4065864/pexels-photo-4065864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    progress: 100,
                    isCompleted: true
                },
                {
                    id: "video-1-3",
                    title: "Your First React Component",
                    duration: "22:15",
                    thumbnail: "https://images.pexels.com/photos/4065899/pexels-photo-4065899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    progress: 75,
                    isCompleted: false,
                    dueDate: new Date()
                }
            ]
        },
        {
            id: "section-2",
            title: "React Hooks Deep Dive",
            description: "Master React hooks for state management and side effects.",
            videos: [
                {
                    id: "video-2-1",
                    title: "useState Hook Explained",
                    duration: "15:20",
                    thumbnail: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    progress: 100,
                    isCompleted: true
                },
                {
                    id: "video-2-2",
                    title: "useEffect for Side Effects",
                    duration: "24:10",
                    thumbnail: "https://images.pexels.com/photos/4065883/pexels-photo-4065883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    progress: 50,
                    isCompleted: false,
                    dueDate: new Date()
                },
                {
                    id: "video-2-3",
                    title: "Custom Hooks",
                    duration: "19:45",
                    thumbnail: "https://images.pexels.com/photos/11035382/pexels-photo-11035382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    progress: 0,
                    isCompleted: false
                },
                {
                    id: "video-2-4",
                    title: "useContext for Global State",
                    duration: "21:30",
                    thumbnail: "https://images.pexels.com/photos/4065891/pexels-photo-4065891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    progress: 0,
                    isCompleted: false
                }
            ]
        },
        {
            id: "section-3",
            title: "State Management with Redux",
            description: "Learn how to manage application state with Redux.",
            videos: [
                {
                    id: "video-3-1",
                    title: "Redux Fundamentals",
                    duration: "28:15",
                    thumbnail: "https://images.pexels.com/photos/4065896/pexels-photo-4065896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    progress: 0,
                    isCompleted: false
                },
                {
                    id: "video-3-2",
                    title: "Actions and Reducers",
                    duration: "23:40",
                    thumbnail: "https://images.pexels.com/photos/11035386/pexels-photo-11035386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    progress: 0,
                    isCompleted: false
                },
                {
                    id: "video-3-3",
                    title: "Redux Toolkit",
                    duration: "26:50",
                    thumbnail: "https://images.pexels.com/photos/4065885/pexels-photo-4065885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    progress: 0,
                    isCompleted: false
                }
            ]
        },
        {
            id: "section-4",
            title: "Building a Full-Stack App",
            description: "Apply your React knowledge by building a complete application.",
            videos: [
                {
                    id: "video-4-1",
                    title: "Project Setup and Planning",
                    duration: "17:30",
                    thumbnail: "https://images.pexels.com/photos/4065156/pexels-photo-4065156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    progress: 0,
                    isCompleted: false
                },
                {
                    id: "video-4-2",
                    title: "Backend Integration",
                    duration: "32:45",
                    thumbnail: "https://images.pexels.com/photos/11035351/pexels-photo-11035351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    progress: 0,
                    isCompleted: false
                },
                {
                    id: "video-4-3",
                    title: "Authentication and Authorization",
                    duration: "29:20",
                    thumbnail: "https://images.pexels.com/photos/4065884/pexels-photo-4065884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    progress: 0,
                    isCompleted: false
                },
                {
                    id: "video-4-4",
                    title: "Deployment and Performance",
                    duration: "25:10",
                    thumbnail: "https://images.pexels.com/photos/11035516/pexels-photo-11035516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    progress: 0,
                    isCompleted: false
                }
            ]
        }
    ]
};