import React, { useState } from 'react';

function ResultView({ names, compatibility, onRestart }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const getResultMessage = (score) => {
    if (score >= 90) return "💯 천생연분이에요! 완벽한 궁합!";
    if (score >= 70) return "💕 정말 좋은 궁합이에요!";
    if (score >= 50) return "😊 나쁘지 않은 궁합이네요!";
    if (score >= 30) return "🤔 조금 더 노력이 필요해요!";
    return "💪 서로를 더 이해하려고 노력해보세요!";
  };

  const shareText = `나(${names.name1})랑 너(${names.name2}) 궁합 ${compatibility}%래! 💖\n너도 해봐! ${window.location.href}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      alert('복사에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleKakaoShare = () => {
    // 카카오톡 공유 (Kakao SDK 필요)
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '너와 나의 이름점 💖',
          description: `${names.name1} ❤️ ${names.name2} 궁합 ${compatibility}%!`,
          imageUrl: window.location.origin + '/og-image.png',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '나도 테스트하기',
            link: {
              mobileWebUrl: window.location.origin,
              webUrl: window.location.origin,
            },
          },
        ],
      });
    } else {
      // Kakao SDK가 없으면 링크 복사
      handleCopyLink();
      alert('카카오톡 공유는 준비 중입니다.\n링크가 복사되었어요!');
    }
  };

  const handleSMSShare = () => {
    const smsBody = encodeURIComponent(shareText);
    window.location.href = `sms:?&body=${smsBody}`;
  };

  const handleTwitterShare = () => {
    const twitterText = encodeURIComponent(`${names.name1}❤️${names.name2} 궁합 ${compatibility}%! 너도 해봐! 💖`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${twitterText}&url=${url}`, '_blank');
  };

  return (
    <div className="glass-card" style={{ textAlign: 'center' }}>
      <h2 style={{ 
        color: '#FF69B4', 
        marginBottom: '10px',
        fontSize: '20px'
      }}>
        ✨ 궁합 테스트 결과 ✨
      </h2>

      <div style={{
        margin: '30px 0',
        padding: '30px',
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '15px'
      }}>
        <p style={{ 
          color: '#333', 
          fontSize: '18px', 
          marginBottom: '20px',
          fontWeight: '600'
        }}>
          {names.name1} ❤️ {names.name2}
        </p>

        <div style={{
          fontSize: '72px',
          fontWeight: 'bold',
          color: '#FF1493',
          margin: '20px 0',
          textShadow: '2px 2px 4px rgba(255, 105, 180, 0.3)'
        }}>
          {compatibility}%
        </div>

        <p style={{
          color: '#FF69B4',
          fontSize: '16px',
          fontWeight: '600',
          marginTop: '20px'
        }}>
          {getResultMessage(compatibility)}
        </p>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.2)',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.6' }}>
          💡 이름 궁합은 재미로만 봐주세요!<br />
          진짜 궁합은 서로를 이해하고 배려하는 마음이에요 💕
        </p>
      </div>

      {/* 공유 버튼들 */}
      <div style={{ marginBottom: '15px' }}>
        <p style={{ 
          color: '#FF69B4', 
          fontSize: '14px', 
          fontWeight: '600',
          marginBottom: '12px'
        }}>
          친구들에게 공유하기 📢
        </p>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '10px'
        }}>
          <button
            onClick={handleKakaoShare}
            style={{
              background: '#FEE500',
              color: '#3C1E1E',
              border: 'none',
              borderRadius: '12px',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            💬 카카오톡
          </button>

          <button
            onClick={handleCopyLink}
            style={{
              background: copySuccess 
                ? 'linear-gradient(135deg, #4CAF50, #45a049)' 
                : 'linear-gradient(135deg, #9C27B0, #7B1FA2)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {copySuccess ? '✅ 복사됨!' : '🔗 링크복사'}
          </button>
        </div>
      </div>

      <button
        className="btn-secondary"
        onClick={onRestart}
        style={{ width: '100%' }}
      >
        🔄 다시 해보기
      </button>
    </div>
  );
}

export default ResultView;
