# Node Frontend Lyric Generator

A React component that generates SleepToken-style lyrics based on selected topics. Note, this is the pretty frontend that connects to any of the backends found here:

https://github.com/camerongillette/Node-Lyric-Generator-Backend

https://github.com/camerongillette/Java-Spring-Custom-Lyric-Generator

https://github.com/camerongillette/AI-Sleep-Token-Lyric-Backend

They all do mostly the same thing, just written in different languages

## Features

- Generate lyrics in Sleep Token's distinctive style
- Choose from different emotional topics
- One-click copy to clipboard functionality


## API Integration

The component makes requests to a backend service at `VITE_BACKEND_URL/lyricgenerator/sleeptoken` with the following parameters:
- `topicId`: Number (0-4) representing the selected topic

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
 