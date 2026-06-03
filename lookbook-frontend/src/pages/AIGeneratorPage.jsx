//2

// import React, { useState } from 'react';

// const AIGeneratorPage = () => {
//   const [event, setEvent] = useState('');
//   const [weather, setWeather] = useState('');
//   const [outfit, setOutfit] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const generateAIOutfit = async () => {
//     if (!event || !weather) return alert('Please fill both fields!');
//     setLoading(true);
//     try {
//       const res = await fetch('http://localhost:5000/api/generate-outfit', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ event, weather }),
//       });
//       const data = await res.json();
//       setOutfit(data);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to generate outfit.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', paddingBottom: '80px' }}>
//       <h2>🧠 AI Outfit Generator</h2>
//       <div style={{ margin: '20px auto', maxWidth: '400px' }}>
//         <input
//           type="text"
//           placeholder="Event (e.g. wedding, office, beach)"
//           value={event}
//           onChange={e => setEvent(e.target.value)}
//           style={{ width: '100%', marginBottom: 10, padding: 8 }}
//         />
//         <input
//           type="text"
//           placeholder="Weather (e.g. sunny, rainy, cold)"
//           value={weather}
//           onChange={e => setWeather(e.target.value)}
//           style={{ width: '100%', marginBottom: 10, padding: 8 }}
//         />
//         <button onClick={generateAIOutfit} disabled={loading}>
//           {loading ? 'Generating...' : '✨ Generate AI Outfit'}
//         </button>
//       </div>

//       {outfit && (
//         <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
//           {Object.entries(outfit).map(([type, item]) => (
//             item ? (
//               <div key={type} style={{ border: '1px solid #ccc', padding: 10, width: 160 }}>
//                 <img src={item.imageUrl} alt={type} style={{ width: '100%' }} />
//                 <p>{item.name}</p>
//                 <p>{type} | {item.style}</p>
//               </div>
//             ) : null
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AIGeneratorPage;

// src/pages/AIGeneratorPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AIGeneratorPage = () => {
  const [eventType, setEventType] = useState('');
  const [weather, setWeather] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!eventType || !weather) {
      alert('Please select both event type and weather.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/generate-outfit', {
        eventType,
        weather,
      });
      setSuggestion(res.data.suggestion);
    } catch (err) {
      console.error(err);
      alert('Error generating outfit suggestion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">🤖 AI Outfit Generator</h1>
        <p className="text-gray-600 mb-6">
          Describe your event and weather to get AI-based outfit suggestions!
        </p>

        <div className="flex flex-col gap-4 mb-6">
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            <option value="">Select Event Type</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="party">Party</option>
            <option value="ethnic">Ethnic</option>
          </select>

          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            <option value="">Select Weather</option>
            <option value="hot">Hot</option>
            <option value="cold">Cold</option>
            <option value="rainy">Rainy</option>
            <option value="humid">Humid</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`px-6 py-3 rounded-xl text-white font-semibold shadow-md transition-all duration-300 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500'
          }`}
        >
          {loading ? '✨ Generating...' : '🎨 Generate Outfit'}
        </button>

        {suggestion && (
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-md p-6 text-left border border-gray-200">
            <h3 className="text-xl font-bold text-purple-700 mb-3">💫 Suggested Outfit:</h3>
            <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {suggestion}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGeneratorPage;
