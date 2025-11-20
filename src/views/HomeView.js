import React, { useState } from 'react';

function HomeView({ onStartTest }) {
  const [step, setStep] = useState(1); // 1: 내 이름, 2: 상대 이름
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (name1.trim()) {
      setStep(2);
    }
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (name2.trim()) {
      onStartTest(name1.trim(), name2.trim());
    }
  };

  const handleBack = () => {
    setStep(1);
    setName2('');
  };

  return (
    <div className="glass-card">
      {/* 별 장식 */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{ fontSize: '24px', margin: '0 10px' }}>✨</span>
        <span style={{ fontSize: '32px' }}>💖</span>
        <span style={{ fontSize: '24px', margin: '0 10px' }}>✨</span>
      </div>

      <h2 style={{ 
        textAlign: 'center', 
        color: '#FF69B4', 
        marginBottom: '15px',
        fontSize: '26px',
        fontWeight: 'bold'
      }}>
        우리의 궁합은 몇점일까?
      </h2>

      {/* 진행 상태 표시 */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: step >= 1 
            ? 'linear-gradient(135deg, #FF69B4, #FF1493)' 
            : 'rgba(255, 255, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: step >= 1 ? '0 4px 10px rgba(255, 105, 180, 0.4)' : 'none'
        }}>
          1
        </div>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: step >= 2 
            ? 'linear-gradient(135deg, #FF69B4, #FF1493)' 
            : 'rgba(255, 255, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: step >= 2 ? '0 4px 10px rgba(255, 105, 180, 0.4)' : 'none'
        }}>
          2
        </div>
      </div>

      {step === 1 ? (
        <form onSubmit={handleStep1Submit}>
          <p style={{ 
            textAlign: 'center', 
            color: '#666', 
            marginBottom: '25px',
            fontSize: '15px',
            lineHeight: '1.6'
          }}>
            먼저 당신의 이름을 알려주세요 💕
          </p>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              color: '#333',
              fontWeight: '600',
              fontSize: '15px'
            }}>
              내 이름
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="이름을 입력하세요"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              maxLength={10}
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={!name1.trim()}
          >
            다음 단계로 
          </button>
        </form>
      ) : (
        <form onSubmit={handleStep2Submit}>
          <p style={{ 
            textAlign: 'center', 
            color: '#666', 
            marginBottom: '10px',
            fontSize: '14px'
          }}>
            <strong style={{ color: '#FF69B4' }}>{name1}</strong>님,
          </p>
          <p style={{ 
            textAlign: 'center', 
            color: '#666', 
            marginBottom: '25px',
            fontSize: '15px',
            lineHeight: '1.6'
          }}>
            마음속 그 사람의 이름을 입력해주세요 💖
          </p>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              color: '#333',
              fontWeight: '600',
              fontSize: '15px'
            }}>
              상대방 이름
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="상대방 이름을 입력하세요"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              maxLength={10}
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={!name2.trim()}
            style={{ marginBottom: '10px' }}
          >
            우리 궁합 확인하기 ❤️
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={handleBack}
            style={{ width: '100%' }}
          >
            이전으로
          </button>
        </form>
      )}
    </div>
  );
}

export default HomeView;
