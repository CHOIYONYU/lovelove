/**
 * 이름 궁합 계산 함수
 * @param {string} name1 - 첫 번째 이름
 * @param {string} name2 - 두 번째 이름
 * @returns {number} - 0~100 사이의 궁합 점수
 */
function calculateCompatibility(name1, name2) {
  // 공백 제거
  const cleanName1 = name1.replace(/\s/g, '');
  const cleanName2 = name2.replace(/\s/g, '');

  // 각 글자의 유니코드 값을 획수처럼 사용
  const getCharValues = (name) => {
    return name.split('').map(char => char.charCodeAt(0) % 10);
  };

  const values1 = getCharValues(cleanName1);
  const values2 = getCharValues(cleanName2);

  // 두 배열을 교차하여 합치기
  const maxLength = Math.max(values1.length, values2.length);
  let combined = [];

  for (let i = 0; i < maxLength; i++) {
    if (i < values1.length) combined.push(values1[i]);
    if (i < values2.length) combined.push(values2[i]);
  }

  // 궁합 계산 로직 (획수 더하기 방식)
  while (combined.length > 2) {
    const newCombined = [];
    for (let i = 0; i < combined.length - 1; i++) {
      newCombined.push((combined[i] + combined[i + 1]) % 10);
    }
    combined = newCombined;
  }

  // 최종 두 자리 숫자를 궁합 점수로 변환
  let score;
  if (combined.length === 2) {
    score = combined[0] * 10 + combined[1];
  } else if (combined.length === 1) {
    score = combined[0] * 10;
  } else {
    score = 50; // 기본값
  }

  // 0~100 범위로 조정
  if (score > 100) score = score % 100;
  if (score === 0) score = 50; // 0%는 너무 안 좋으니 50%로

  // 일관성을 위해 같은 이름 조합은 항상 같은 결과
  // (이미 위 로직이 deterministic하므로 별도 처리 불필요)

  return score;
}

export default calculateCompatibility;
