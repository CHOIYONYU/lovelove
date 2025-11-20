import React, { useState, useEffect } from 'react';
import './App.css';
import HomeView from './views/HomeView';
import AdGateView from './views/AdGateView';
import ResultView from './views/ResultView';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'ad', 'result'
  const [names, setNames] = useState({ name1: '', name2: '' });
  const [compatibility, setCompatibility] = useState(0);

  // Kakao SDK 초기화
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('YOUR_KAKAO_APP_KEY'); // 실제 앱 키로 교체 필요
      console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
    }
  }, []);

  const handleStartTest = (name1, name2) => {
    setNames({ name1, name2 });
    setCurrentView('ad');
  };

  const handleShowResult = (score) => {
    setCompatibility(score);
    setCurrentView('result');
  };

  const handleRestart = () => {
    setCurrentView('home');
    setNames({ name1: '', name2: '' });
    setCompatibility(0);
  };

  return (
    <div className="App">
      {currentView === 'home' && (
        <HomeView onStartTest={handleStartTest} />
      )}
      {currentView === 'ad' && (
        <AdGateView names={names} onShowResult={handleShowResult} />
      )}
      {currentView === 'result' && (
        <ResultView 
          names={names} 
          compatibility={compatibility} 
          onRestart={handleRestart} 
        />
      )}
    </div>
  );
}

export default App;
