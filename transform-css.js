// node
const StyleDictionary = require("style-dictionary");

// 이름 변환 함수
function transformName(prop, removeFirstPathSegment) {
  if (removeFirstPathSegment) {
    const path = prop.path;
    path[0] = removeFirstPathSegment
    return path.join("-");
  } else {
    return prop.path.slice(1).join("-");
  }
}

// 커스텀 포매터 정의
StyleDictionary.registerFormat({
  name: "custom/format",
  formatter: function(dictionary, config) {
    const typeComments = {}; // 주석을 추적하기 위한 객체
    const tokens = dictionary.allProperties.map(prop => {
      const name = transformName(prop, "gemode");
      const comment = typeComments[prop.type] ? "" : `  /* ${prop.type} */\n`;
      typeComments[prop.type] = true;
      return `${comment}  --${name}: ${prop.value};`;
    }).join('\n');
    return `:root {\n${tokens}\n}`;
  }
});

// 모듈 실행
module.exports = {
  source: ["tokens/figmaToken.json"],
  platforms: {
    css: {
      // transforms: ['attribute/cti', 'name/cti/kebab', 'size/rem'],
      transformGroup: "css",
      buildPath: "build/",
      files: [
        {
          destination: "variables-ge.css",
          format: "custom/format",
        },
      ],
    },
  },
}

console.log("transform-css!!");



// // 다른방식 package run : "node transform-css.js",
// // Style Dictionary 설정
// const StyleDictionaryConfig = {
//   source: ["tokens/figmaToken.json"],
//   platforms: {
//     css: {
//       // transforms: ['attribute/cti', 'name/cti/kebab', 'size/rem'],
//       transformGroup: "css",
//       buildPath: "build/",
//       files: [
//         {
//           destination: "variables-ge.css",
//           format: "custom/format",
//         },
//       ],
//     },
//   },
// };
// // Style Dictionary 확장
// const StyleDictionaryExtended = StyleDictionary.extend(StyleDictionaryConfig);
// // 빌드 실행
// StyleDictionaryExtended.buildAllPlatforms();