import React, { useEffect, useState } from 'react';
import calculateCompatibility from '../utils/calculateCompatibility';

function AdGateView({ names, onShowResult }) {
  const [isReady, setIsReady] = useState(false);
  const [calculationSteps, setCalculationSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // 계산 과정 생성
  useEffect(() => {
    const name1 = names.name1.replace(/\s/g, '');
    const name2 = names.name2.replace(/\s/g, '');
    
    // 이름 교차 배열 생성
    const getCharValues = (name) => name.split('').map(char => char.charCodeAt(0) % 10);
    const values1 = getCharValues(name1);
    const values2 = getCharValues(name2);
    
    const maxLength = Math.max(values1.length, values2.length);
    let combined = [];
    let combinedChars = [];
    
    for (let i = 0; i < maxLength; i++) {
      if (i < name1.length) {
        combined.push(values1[i]);
        combinedChars.push(name1[i]);
      }
      if (i < name2.length) {
        combined.push(values2[i]);
        combinedChars.push(name2[i]);
      }
    }
    
    const steps = [{ values: combined, chars: combinedChars }];
    
    // 계산 단계 생성
    let current = [...combined];
    while (current.length > 2) {
      const newCombined = [];
      for (let i = 0; i < current.length - 1; i++) {
        newCombined.push((current[i] + current[i + 1]) % 10);
      }
      steps.push({ values: newCombined, chars: null });
      current = newCombined;
    }
    
    setCalculationSteps(steps);
  }, [names]);

  // 단계별 표시 (카운트다운 제거)
  useEffect(() => {
    if (currentStep < calculationSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else if (calculationSteps.length > 0) {
      setIsReady(true);
    }
  }, [currentStep, calculationSteps.length]);

  const handleShowResult = () => {
    const score = calculateCompatibility(names.name1, names.name2);
    onShowResult(score);
  };

  return (
    <div className="glass-card" style={{ textAlign: 'center' }}>
      <h2 style={{ 
        color: '#FF69B4', 
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        {'💕 운명을 계산 중 💕'}
      </h2>

      <div style={{
        margin: '20px 0',
        padding: '25px 15px',
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '20px',
        minHeight: '350px',
        overflow: 'auto',
        maxHeight: '450px'
      }}>
        {/* 계산 과정 트리 시각화 - 하트 모양 */}
        {calculationSteps.slice(0, currentStep + 1).map((step, stepIndex) => (
          <div 
            key={stepIndex} 
            style={{
              marginBottom: '25px',
              animation: 'fadeInDown 0.5s ease-out'
            }}
          >
            {/* 하트들 */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'nowrap'
            }}>
              {step.values.map((value, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'relative',
                    width: '55px',
                    height: '55px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'popIn 0.4s ease-out',
                    animationDelay: `${idx * 0.08}s`,
                    animationFillMode: 'both'
                  }}
                >
                  {/* 하트 모양 배경 */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    fontSize: '55px',
                    color: stepIndex === 0 
                      ? '#FF6B9D'
                      : stepIndex === calculationSteps.length - 1
                      ? '#E91E63'
                      : '#FF1493',
                    filter: 'drop-shadow(0 4px 12px rgba(255, 20, 147, 0.5))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    ❤️
                  </div>
                  
                  {/* 텍스트 */}
                  <div style={{
                    position: 'relative',
                    zIndex: 1,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: stepIndex === 0 ? '17px' : '16px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}>
                    {stepIndex === 0 && step.chars ? step.chars[idx] : value}
                  </div>
                </div>
              ))}
            </div>
            
            {/* 화살표 */}
            {stepIndex < calculationSteps.length - 1 && currentStep > stepIndex && (
              <div style={{
                margin: '8px 0',
                color: '#FF1493',
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                animation: 'fadeIn 0.3s ease-out',
                lineHeight: '1'
              }}>
                ↓
              </div>
            )}
          </div>
        ))}
        
        {isReady && (
          <div style={{ 
            marginTop: '30px',
            animation: 'bounceIn 0.6s ease-out'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>✨</div>
            <p style={{ 
              color: '#FF1493', 
              fontSize: '18px', 
              fontWeight: '700',
              textShadow: '0 2px 4px rgba(255, 20, 147, 0.4)'
            }}>
              계산 완료!
            </p>
          </div>
        )}
      </div>

      {/* 광고 영역 */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.2)',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
        border: '1px dashed #FF69B4',
        marginTop: '20px'
      }}>
        <p style={{ color: '#999', fontSize: '12px' }}>
          [ 광고 영역 ]
        </p>
        <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
          Google AdSense
        </p>
      </div>

      <button
        className="btn-primary"
        onClick={handleShowResult}
        disabled={!isReady}
      >
        결과 확인하기! 💕
      </button>

      <style>
        {`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes popIn {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.15);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes bounceIn {
            0% {
              transform: scale(0.3);
              opacity: 0;
            }
            50% {
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes drawLine {
            from {
              stroke-dasharray: 100;
              stroke-dashoffset: 100;
            }
            to {
              stroke-dasharray: 100;
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </div>
  );
}

export default AdGateView;
