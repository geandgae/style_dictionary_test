const fs = require("fs");
const path = require("path");

// JSON 파일 경로
const inputFilePath = path.join(__dirname, "./tokens/figmaToken/figmaToken.json");
const outputDir = path.join(__dirname, "./tokens/figmaTokens");
const outputFilePath = path.join(outputDir, "transformed_tokens.json");

// JSON 파일 읽기
const jsonData = JSON.parse(fs.readFileSync(inputFilePath, "utf8"));

// 전체 토큰 데이터 구조
let allTokens = {};

// value 변환 함수
function transformValue(value, allTokens) {
  if (typeof value === "string") {
    const pattern = /{([^}]+)}/g;
    return value.replace(pattern, (match, ref) => {
      const refPath = resolveReferencePath(ref, allTokens);
      if (refPath) {
        return `{${refPath}}`;
      }
      return match; // 참조 경로를 찾을 수 없으면 원래 값을 반환
    });
  }
  return value;
}

// 참조 경로를 해결하는 함수
function resolveReferencePath(ref, allTokens) {
  for (const tokenSet in allTokens) {
    if (findTokenInSet(ref, allTokens[tokenSet])) {
      return `${tokenSet}.${ref}`;
    }
  }
  return null;
}

// 특정 참조가 주어진 토큰 세트에 존재하는지 확인하는 함수
function findTokenInSet(reference, tokenData) {
  const keys = reference.split('.');
  let currentData = tokenData;
  for (const key of keys) {
    if (currentData[key]) {
      currentData = currentData[key];
    } else {
      return false;
    }
  }
  return true;
}

// JSON 데이터 변환
function transformJsonData(data, parentKey = '', allTokens = {}, visited = new Set()) {
  if (visited.has(data)) {
    return;
  }
  visited.add(data);

  for (const key in data) {
    const currentKey = parentKey ? `${parentKey}.${key}` : key;

    if (data[key] && typeof data[key] === "object" && data[key] !== null && !Array.isArray(data[key])) {
      
      // 토큰 데이터 구조에 현재 키 추가
      if (!allTokens[parentKey]) {
        allTokens[parentKey] = {};
      }
      allTokens[parentKey][key] = data[key];

      // value 필드가 존재하고 문자열인 경우에만 변환
      if (data[key].value && typeof data[key].value === "string") {
        data[key].value = transformValue(data[key].value, allTokens);
      } else if (data[key].value && typeof data[key].value === "object") {
        data[key].value = null;
        data[key].type = null;
      }
      // 재귀적으로 하위 객체 처리
      transformJsonData(data[key], currentKey, allTokens, visited);
    }
  }
}

// 전체 토큰 데이터 구조 초기화
allTokens = {};

// 변환 실행
transformJsonData(jsonData, '', allTokens);

// 디렉토리가 없는 경우 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 변환된 JSON 데이터 저장
fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2), "utf8");

console.log("변환 완료: transformed_tokens.json");
