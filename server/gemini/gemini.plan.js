const path = require('path');
const { VertexAI } = require('@google-cloud/vertexai');
const textsi_1 = {
    text: `You will be given a playlist JSON, Current Date and duration of time to complete the playlist (1 Week, 2 Week, 1 Month, 6 Month, 1 Year) and watch time per day (1 hour, 2 hours, 3 hours), you will have to create a plan for the playlist.
    according to the duration, you will have to divide the playlist/videos into sections and assign a duration to each section.
    given below is the playlist JSON structure
{
  "title": "Playlist Name",
  "info": "Brief summary in 15 words.",
  "completed": 0,
  "playlistid": "unique_playlist_id",
  "channelname": "channnelName",
  "totalduration": {
    "formatted": "00:00:00",
    "hours": 0,
    "minutes": 0,
    "seconds": 0,
    "totalSeconds": 0
  },
  "totalvideos": 0,
  "sections": {
    "React Tutorials": {
      "React Tutorial: Introduction to React": {
        "link": "dfxrdoEQe00",
        "duration": "00:00:00",
        "durationRaw": 0,
        "done": 0
      },
      "React State Management with Redux": {
        "link": "gywke3XiNC0",
        "duration": "00:00:00",
        "durationRaw": 0,
        "done": 0
      }
    },
    "Node.js Tutorials": {
      "Node.js Tutorial: Getting Started": {
        "link": "gywke3XiNC0",
        "duration": "00:00:00",
        "durationRaw": 0,
        "done": 0
      }
    }
  }
}

Understand the topics by title and duration, and divide the playlist into sections and assign a duration to each section.
User might have conditions like you will not watch videos on saturday and sunday, you will not watch videos on holidays, you will not watch videos on weekends, etc. (user will provide the conditions) default conditions are available everyday.
If a video is marked as done, you should not watch it again.

!IMPORTANT: Plan structure should look like
!IMPORTANT: Plan structure should have structure just like the playlist provided, as we will map the playlist to the plan.
!IMPORTANT: Plan structures object represent sections, while sub-objects represent videos.
!IMPORTANT: Plan structure should have start_date and end_date for each section
!IMPORTANT: Videos should be in there sections in the order they are in the playlist.
!IMPORTANT: Make sure all the sections and videos are in the plan.

Here, the plan is an object with keys as section names and values as another object with keys as video names and values as date.
{
    "plan": {
        "section_name": { 
            start_date: "2025-05-25",
            end_date: "2025-05-26",
            videos: {
                "video_name": {
                    date: "2025-05-25"
                },
                "video_name": {
                    date: "2025-05-25"
                },
                "video_name": {
                    date: "2025-05-26"
                },
            }
        },
        "section_name": {
            start_date: "2025-05-27",
            end_date: "2025-05-28",
            videos: {
                "video_name": {
                    date: "2025-05-27"
                },
                "video_name": {
                    date: "2025-05-27"
                },
            }
        },
        "section_name": {
            start_date: "2025-05-28",
            end_date: "2025-05-29",
            videos: {
                "video_name": {
                    date: "2025-05-28"
                },
                "video_name": {
                    date: "2025-05-29"
                },
            }
        },
    }
}


`};

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: 'project-tracking-432716', location: 'asia-south1' });
const model = 'gemini-1.5-flash-002';


// Resolve the path to the service account file dynamically
const serviceAccountPath = path.join(__dirname, 'sample.json');

// Set the environment variable to the service account file's location
process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountPath;

// Debugging: Log the resolved path to ensure it's correct in Lambda
console.log('Service Account Path:', process.env.GOOGLE_APPLICATION_CREDENTIALS);


// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: model,
    generationConfig: {
        'maxOutputTokens': 8192,
        'temperature': 0,
        'topP': 0.95,
    },
    safetySettings: [
        {
            'category': 'HARM_CATEGORY_HATE_SPEECH',
            'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
            'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
            'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
            'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
            'category': 'HARM_CATEGORY_HARASSMENT',
            'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
        }
    ],
    systemInstruction: {
        parts: [textsi_1]
    },
});


async function generateContent(playlistData, current_date, duration, watch_time) {
    const playlistDataString = JSON.stringify(playlistData)
    const req = {
        contents: [
            { role: 'user', parts: [{ text: playlistDataString + `current_date: ${current_date}` + `duration: ${duration}` + `watch_time: ${watch_time}` }] }
        ],
    };

    const streamingResp = await generativeModel.generateContentStream(req);
    const res = ((await streamingResp.response).candidates[0].content.parts[0].text)
    const jsonString = res.replace(/```json|```/g, '').trim();
    const jsonObject = JSON.parse(jsonString);

    console.log(jsonObject);
    return jsonObject
}

module.exports = generateContent;