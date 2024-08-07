const fs = require('fs');
const path = require('path');

// JSON 파일 경로
const inputFilePath = path.join(__dirname, './tokens/figmaToken.json');
const outputFilePath = path.join(__dirname, './tokens/figmaTokens/transformed_tokens.json');

// JSON 파일 읽기
const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

// value 변환 함수
function transformValue(value) {
  if (typeof value === 'string') {
    const pattern = /^\{(\w+)\.(.+)\}$/;
    const match = value.match(pattern);
    if (match) {
      const prefix = match[1];
      const rest = match[2];
      return `{primitive.${prefix}.${rest}}`;
    }
  }
  return value;
}

// JSON 데이터 변환
function transformJsonData(data) {
  for (const key in data) {
    if (data[key] && typeof data[key] === 'object' && !Array.isArray(data[key])) {
      if (data[key].value) {
        data[key].value = transformValue(data[key].value);
      }
      transformJsonData(data[key]);
    }
  }
}

// 변환 실행
transformJsonData(jsonData);

// 변환된 JSON 데이터 저장
fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2), 'utf8');

console.log('변환 완료: transformed_tokens.json');