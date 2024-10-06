const {VertexAI} = require('@google-cloud/vertexai');
const textsi_1 = {text: `Given a JSON object with a list of videos (each having a title and link), categorize the videos into sections based on topics like React, Node.js, etc. For each section, create a list of videos with title and link. The final structure should have a title, a short summary, completion status, and sections with categorized videos just like shown below json structure
{
  "title": "Playlist Name",
  "info": "Brief summary in 15 words.",
  "completed": 0,
  "playlistId": "unique_playlist_id",
  "sections": {
    "React Tutorials": {
      "React Tutorial: Introduction to React": {
        "link": "dfxrdoEQe00",
        "done": 0
      },
      "React State Management with Redux": {
        "link": "gywke3XiNC0",
        "done": 0
      }
    },
    "Node.js Tutorials": {
      "Node.js Tutorial: Getting Started": {
        "link": "gywke3XiNC0",
        "done": 0
      }
    }
  }
}

`};

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({project: 'project-tracking-432716', location: 'asia-south1'});
const model = 'gemini-1.5-pro-001';

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


async function generateContent(playlistData, playlistId) {
  const playlistDataString = JSON.stringify(playlistData)
  const req = {
    contents: [
        {role: 'user', parts: [{text: playlistDataString + `playlistId: ${playlistId}`}]}
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