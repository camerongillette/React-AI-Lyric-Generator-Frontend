// src/App.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './App.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log('Backend URL:', backendUrl);

// ---- DATA TYPES
type Topic = {
    id: number; 
    name: string;
}

const TOPICS: Topic[] = [
    { id: 0, name: 'ANY TOPIC' },
    { id: 1, name: 'LOVE' },
    { id: 2, name: 'DEATH' },
    { id: 3, name: 'BREAK UP' },
    { id: 4, name: 'LONELINESS' },
    { id: 5, name : "BETRAYAL"},
     { id: 6, name :"HEARTBREAK"},
     {id : 7, name :"MANIPULATION"}
]

const LyricGenerator: React.FC = () => {
  const [lyrics, setLyrics] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLyrics = async (topicId: string, model: string) => {
    setLoading(true);
    setError(null);
    setLyrics('');
    try {
      const res = await axios.get(backendUrl+'/lyricgenerator/sleeptoken', {
        params: {
          topicId: topicId,
          model: model
        }
      });
      setLyrics(res.data.lyrics);
    } catch (err: any) {
      const msg =
        err.response?.data?.error ||
        err.message ||
        'Unknown error occurred';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {    
    e.preventDefault();
    const form = e.currentTarget;
    const topicId = (form.elements.namedItem('selectedTopic') as HTMLSelectElement).value;
    const model = (form.elements.namedItem('model') as HTMLSelectElement).value;
    fetchLyrics(topicId, model);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(lyrics);
  };

  return (
    <div className='main-container'>
      <img
        src='/images/bw_logo.png'
        alt="Header"
        className="header-image"
        style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
      />

      {lyrics && (
        <div className="lyrics-container"
          style={{
          }}
        >
          <pre style={{ whiteSpace: 'pre-wrap' }}>{lyrics}</pre>
          <button onClick={copyToClipboard}>COPY TO CLIPBOARD</button>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
            <div>
                <label>TOPIC</label>
            </div>
            <div>
            <select name="selectedTopic">
              <option value="" disabled>
              Select a topic...
              </option>
              {TOPICS.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
              ))}
            </select>
            <select defaultValue="" name="model">
              <option value="" disabled>
              SELECT A MODEL
              </option>
              <option value="OpenAi">OPENAI</option>
              <option value="ollama">OLLAMA</option>
            </select>
            </div>
          <div>
            <button type="submit" disabled={loading}>
              {loading ? 'Generating...' : 'GENERATE CHORUS'}
            </button>
          </div>
        </form>
      </div>
      <footer className="footer">
        <p><a href='https://ko-fi.com/babywolfcam'>BUY ME A TINY COFFEE SO WE CAN KEEP THIS FREE :)</a></p>
      </footer>
    </div>
  );
};

export default LyricGenerator;
