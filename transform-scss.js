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
  name: "custom/scss-format",
  formatter: function(dictionary, config) {
    const typeGroups = dictionary.allProperties.reduce((acc, prop) => {
      const type = prop.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      const name = transformName(prop, "");
      acc[type].push(`  ${name}: ${prop.value},`);
      return acc;
    }, {});

    const scssContent = Object.entries(typeGroups)
      .map(([type, tokens]) => {
        return `$${type}s: (\n${tokens.join("\n")}\n);`;
      })
      .join("\n\n");

    return scssContent;
  }
});

// 모듈 실행
module.exports = {
  source: ["tokens/figmaToken.json"],
  platforms: {
    css: {
      // transforms: ['attribute/cti', 'name/cti/kebab', 'size/rem'],
      transformGroup: "scss",
      buildPath: "build/scss/",
      files: [
        {
          destination: "variables-sd.scss",
          format: "custom/scss-format",
        },
      ],
    },
  },
}

console.log("transform-scss!!");



// // 다른방식 package run : "node transform-scss.js",
// // Style Dictionary 설정
// const StyleDictionaryConfig = {
//   source: ["tokens/figmaToken.json"],
//   platforms: {
//     css: {
//       // transforms: ['attribute/cti', 'name/cti/kebab', 'size/rem'],
//       transformGroup: "scss",
//       buildPath: "build/scss/",
//       files: [
//         {
//           destination: "variables-sd.scss",
//           format: "custom/scss-format",
//         },
//       ],
//     },
//   },
// };
// // Style Dictionary 확장
// const StyleDictionaryExtended = StyleDictionary.extend(StyleDictionaryConfig);
// // 빌드 실행
// StyleDictionaryExtended.buildAllPlatforms();