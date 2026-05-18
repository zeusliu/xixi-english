import React, { useState, useEffect } from 'react';

const AudioButton = ({ text }) => {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    // 确保语音包在组件挂载时加载完毕 (某些浏览器是异步加载的)
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handlePlay = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // 停止当前正在播放的语音

      // 优化 'a' 和 'A' 作为冠词在句子或短语中的发音，避免被读成字母 A (ay)
      let spokenText = text;
      if (spokenText && spokenText.trim().length > 1) {
        // 使用正则替换独立的 'a' 或 'A' 为 'uh'，保留单词内部的 'a'（如 cat, apple 等）
        spokenText = spokenText.replace(/\b[aA]\b/g, 'uh');
      }

      const utterance = new SpeechSynthesisUtterance(spokenText);
      
      // 筛选出美式发音
      const usVoices = voices.filter(v => v.lang === 'en-US' || v.lang === 'en_US');
      
      // 优先选择公认的女声 (macOS/iOS 上的 Samantha, 谷歌浏览器的 Google US English, 或 Victoria/Zira 等)
      let selectedVoice = usVoices.find(v => 
        v.name.includes('Samantha') || 
        v.name.includes('Google US English') ||
        v.name.includes('Victoria') ||
        v.name.includes('Karen') ||
        v.name.includes('Zira')
      );

      // 如果找不到特定的女声，默认选择第一个美式发音
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      } else if (usVoices.length > 0) {
        utterance.voice = usVoices[0];
      }

      // 调整发音参数，模拟少儿声音
      utterance.rate = 0.65; // 语速调慢，适合小朋友跟读
      utterance.pitch = 1.4; // 提高音调 (pitch 大于 1)，听起来更像小女孩的声音
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert("抱歉，您的浏览器不支持语音朗读功能。");
    }
  };

  return (
    <button className="audio-btn" onClick={handlePlay} aria-label={`Listen to ${text}`} title="点击听美式少儿发音">
      <span>🔊</span> 听发音
    </button>
  );
};

export default AudioButton;
