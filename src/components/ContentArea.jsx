import React from 'react';
import AudioButton from './AudioButton';

const ContentArea = ({ activeItem }) => {
  if (!activeItem) {
    return (
      <div className="content-area" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ color: 'var(--text-light)', fontSize: '2rem' }}>👈 请在左侧选择要学习的内容</h1>
      </div>
    );
  }

  if (activeItem.type === 'letter') {
    const { letter, image, words, sentences } = activeItem.data;
    return (
      <div className="content-area">
        <div className="content-header">
          <h1 className="content-title">{letter}</h1>
          <img src={image} alt={`Letter ${letter}`} className="main-image" />
          <AudioButton text={letter} />
        </div>
        
        <h2 style={{ marginBottom: '20px', color: 'var(--secondary)' }}>Words (单词):</h2>
        <div className="cards-grid" style={{ marginBottom: '40px' }}>
          {words.map((item, idx) => (
            <div className="word-card" key={idx}>
              <img src={item.image} alt={item.text} className="card-image" />
              <span className="card-text">{item.text}</span>
              <AudioButton text={item.text} />
            </div>
          ))}
        </div>

        <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Sentences (句子):</h2>
        <div className="cards-grid">
          {sentences.map((item, idx) => (
            <div className="word-card" key={idx}>
              <img src={item.image} alt={item.text} className="card-image" />
              <span className="card-text" style={{ fontSize: '1.4rem' }}>{item.text}</span>
              <AudioButton text={item.text} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeItem.type === 'sentence') {
    const { title, items } = activeItem.data;
    return (
      <div className="content-area">
        <div className="content-header">
          <h1 className="content-title" style={{ fontSize: '3rem' }}>{title}</h1>
        </div>
        
        <div className="cards-grid">
          {items.map((item, idx) => (
            <div className="word-card" key={idx}>
              <img src={item.image} alt="Illustration" className="card-image" />
              <span className="card-text" style={{ fontSize: '1.5rem' }}>{item.text}</span>
              <AudioButton text={item.text} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default ContentArea;
