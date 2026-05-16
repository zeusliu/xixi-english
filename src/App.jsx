import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import SplashScreen from './components/SplashScreen';
import { lettersData } from './data';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  // Default active item is Letter A
  const [activeItem, setActiveItem] = useState({
    type: 'letter',
    data: lettersData[0]
  });

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      
      {!showSplash && (
        <div className="main-layout">
          <div className="scrolling-banner">
            <div className="scrolling-text">
              ✨ 加油各位小朋友，好好学习英语哦，软件不好用就找溪溪粑粑哈 ✨
            </div>
          </div>
          <div className="app-container">
            <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
            <ContentArea activeItem={activeItem} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
