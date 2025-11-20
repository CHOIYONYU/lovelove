# 너와 나의 이름점 💖

React 기반의 이름 궁합 테스트 웹 애플리케이션

## 1. 프로젝트 개요

### 1.1. 프로젝트명
**너와 나의 이름점 💖**

### 1.2. 프로젝트 목표
- **사용자 목표**: 자신과 상대방의 이름을 입력하여 간단하고 재미있는 '이름 궁합' 결과를 확인
- **비즈니스 목표**: 사용자 유입부터 활성화(Activation), 수익화(Revenue)까지 이어지는 마케팅 퍼널을 React 앱 환경에서 설계, 측정, 개선하는 과정을 포트폴리오로 구성

### 1.3. 핵심 타겟
- 10대~20대 초반의 여성 사용자 (주 타겟)
- 썸이나 짝사랑 상대가 있는 솔로, 혹은 재미를 추구하는 커플

## 2. 디자인 컨셉 및 기술 스택

### 2.1. 디자인 컨셉
- **핵심 키워드**: 글래스모피즘 (Glassmorphism), 모바일 최적화, 큐트 & 러블리
- **레이아웃**: 모바일 퍼스트 (Mobile-First) - 375px 기준
- **컬러 팔레트**:
  - Primary: `#FF69B4` (핫 핑크)
  - Secondary: `#FFC0CB` (라이트 핑크)
  - Background: `#FFF0F5` (라벤더 블러시)
  - Text: `#333333`, `#FFFFFF`

### 2.2. 기술 스택
- **프레임워크**: React (Create React App)
- **스타일링**: Tailwind CSS
- **분석**: Google Analytics
- **수익화**: Google AdSense
- **배포**: Vercel / GitHub Pages

## 3. 화면 구조

### Flow
`HomeView (입력)` → `AdGateView (광고)` → `ResultView (결과)`

### 3.1. HomeView (메인 페이지)
- 이름 입력 폼 (2개)
- CTA 버튼: "우리 궁합 확인하기"

### 3.2. AdGateView (광고 게이트)
- 광고 노출 영역
- 결과 확인 버튼

### 3.3. ResultView (결과 페이지)
- 궁합 지수 표시
- "다시 해보기" / "결과 복사하기" 버튼

## 4. 핵심 기능

### 4.1. 이름 궁합 계산 로직
- 두 이름을 한 글자씩 교차하여 계산
- 일관성 있는 결과 보장 (같은 입력 → 같은 출력)
- 0~100 사이의 궁합 지수 출력

## 5. 개발 환경

### 시작하기
```bash
npm start
```

### 빌드
```bash
npm run build
```

### 배포
```bash
npm run deploy
```

## 6. 프로젝트 구조
```
src/
  ├── views/
  │   ├── HomeView.js
  │   ├── AdGateView.js
  │   └── ResultView.js
  ├── components/
  │   └── GlassCard.js
  ├── utils/
  │   └── calculateCompatibility.js
  ├── App.js
  └── index.js
```

## 7. KPI 측정
- HomeView 방문 대비 CTA 버튼 클릭률
- 광고 노출 수 및 클릭률
- 결과 복사하기 클릭률
