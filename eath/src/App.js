import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const askHistory = async () => {
    setError(''); // Clear previous error
    setResponse(''); // Clear previous response
    try {
      const result = await axios.post('http://localhost:5000/askHistory', { question });
      // Assuming the response structure matches this path
      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      setError(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div>
      <h1>Ask a Historian</h1>
      <input 
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your history question"
      />
      <button onClick={askHistory}>Ask</button>
      {response && <p>Response: {response}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
