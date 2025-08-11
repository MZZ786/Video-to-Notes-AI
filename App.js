import React, { useState, useEffect } from 'react';

function App() {
  const DAILY_LIMIT = 3;
  const MAX_VIDEO_MINUTES = 5;
  const [uploadsToday, setUploadsToday] = useState(0);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('usageDate');
    const storedCount = parseInt(localStorage.getItem('usageCount') || '0', 10);

    if (storedDate !== today) {
      localStorage.setItem('usageDate', today);
      localStorage.setItem('usageCount', '0');
      setUploadsToday(0);
    } else {
      setUploadsToday(storedCount);
    }
  }, []);

  const handleUpload = (videoDurationMinutes) => {
    if (videoDurationMinutes > MAX_VIDEO_MINUTES) {
      alert(`Free plan allows max ${MAX_VIDEO_MINUTES} minutes per video.`);
      return;
    }
    if (uploadsToday >= DAILY_LIMIT) {
      setLimitReached(true);
      return;
    }

    const newCount = uploadsToday + 1;
    setUploadsToday(newCount);
    localStorage.setItem('usageCount', newCount.toString());

    alert("Video processed successfully! (placeholder)");
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Video-to-Notes AI</h1>
      <p>Free Plan: {DAILY_LIMIT} videos/day, {MAX_VIDEO_MINUTES} min max per video</p>
      <button onClick={() => handleUpload(3)}>Simulate 3-min Video</button>
      <button onClick={() => handleUpload(6)}>Simulate 6-min Video</button>
      <br /><br />
      <button style={{ background: 'gold', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              onClick={() => window.location.href = 'https://your-upgrade-link.com'}>
        Upgrade to Pro 🚀
      </button>

      {limitReached && (
        <div style={{ marginTop: 20, padding: 10, background: '#fee', border: '1px solid red' }}>
          <h3>Daily Limit Reached</h3>
          <p>Come back tomorrow or <a href="https://your-upgrade-link.com">upgrade to Pro</a> for unlimited access.</p>
        </div>
      )}
    </div>
  );
}

export default App;
