import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show splash screen for 3 seconds, then start fade out
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Wait for fade animation to finish before removing from DOM
      setTimeout(() => {
        onFinish();
      }, 800); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <img src="/src/assets/splash.png" alt="Splash Background" className="splash-image" />
      <div className="splash-content">
        <h1 className="splash-title">English Kids</h1>
        <p className="splash-subtitle">Let's Learn and Play!</p>
        <p className="splash-dedication" style={{ marginTop: '20px', fontSize: '1.4rem', color: '#E91E63', fontWeight: 'bold' }}>🎈 送给 溪溪 小朋友的学习软件 🎈</p>
      </div>
    </div>
  );
};

export default SplashScreen;
