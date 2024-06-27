// node
const StyleDictionary = require("style-dictionary");



// 다른 실행 방식 module.exports 부분이 config.json으로 분리된 형태 최종 실행은 패키지에 등록된 명령어
// const StyleDictionary = require('style-dictionary').extend('config.json'); // 설정파일 확장
// 플랫폼에 대한 모든 빌드
// StyleDictionary.buildAllPlatforms();
// 'web' 플랫폼에 대한 빌드 작업을 실행
// StyleDictionary.buildPlatform("플랫폼");
// 삭제
// StyleDictionary.cleanAllPlatforms();
// StyleDictionary.cleanPlatform("플랫폼");
// 플랫폼 변환이 적용된 토큰 결과를 메모리에 저장된 객체로 반환 파일로 출력하지 않고, 변환된 결과를 객체 형태로 프로그램 내에서 사용할 수 있습니다
// StyleDictionary.exportPlatform("플랫폼");

// StyleDictionary.registerAction 사용자 정의 작업을 등록  사용 예시: 파일 복사 작업
// const fs = require('fs');
// const path = require('path');

// StyleDictionary.registerAction({
//   name: 'copy-files',
//   do: (dictionary, config) => {
//     const src = path.join(__dirname, 'src');
//     const dest = path.join(__dirname, 'dest');

//     fs.copyFileSync(src, dest);
//     console.log(`파일을 ${src}에서 ${dest}로 복사했습니다.`);
//   }
// });

// StyleDictionary.buildPlatform('web');




// 이름 변환 함수
function transformName(prop, suffix) {
  if (suffix) {
    const path = prop.path;
    path[0] = suffix
    return path.join("-");
  } else {
    return prop.path.slice(1).join("-"); // 첫 번째 요소 제외
    // return prop.path.slice(-1).join("-"); // 마지막
    // return prop.path.slice(-2).join("-"); // 끝에서 두 번째 
  }
}

// preset
// const preset = `@charset "utf-8";\n\n//prefix\n$prefix: krds- !default;\n$box-shadow-base: 2px 2px 2px 0px rgba(0, 0, 0, 0.15) !default;\n\n`;
const preset = `
@charset "utf-8";


//prefix
$prefix: krds- !default;

//transition
$transition-base: .4s ease-in-out !default;
$transition-fade: opacity .4s linear !default;
$transition-collapse: max-height .4s ease !default;
$transition-collapse-width: width .4s ease !default;

//box shadow
$box-shadow-base: 2px 2px 2px 0px rgba(0, 0, 0, 0.15) !default;


`;

// 커스텀 포매터 정의
StyleDictionary.registerFormat({
  name: "custom/scss-format",

  // Matcher 함수는 변환을 적용해야 하는 경우 부울을 반환합니다. matcher 함수를 생략하면 모든 토큰과 일치합니다.
  // matcher: function(token) {
  //   return token.attributes.category === 'time';
  // },

  // 디자인 토큰 개체를 수정합니다. 토큰과 플랫폼 구성을 인수로 수신합니다. 이름 변환의 경우 문자열, 속성 변환의 경우 객체, 값 변환의 경우 동일한 유형의 값을 반환해야 합니다.
  // transformer: function(token) {
  //   return (parseInt(token.original.value) / 1000).toString() + 's';
  // },

  formatter: function(dictionary) {
    // formatter 에서  fileHeader
    // const fileHeader = StyleDictionary.formatHelpers.fileHeader({
    //   commentStyle: 'short',
    // });
    
    const typeGroups = dictionary.allProperties.reduce((acc, prop) => {
      const type = prop.type;
      // const type = prop.path[0];
      // const type = prop.description;
      if (!acc[type]) {
        acc[type] = [];
      }
      const name = transformName(prop, "");
      // const name = transformName(prop, type);
      // acc[type].push(`  ${type}-${name}: ${prop.value},`);
      acc[type].push(`  ${name}: ${prop.value},`);
      return acc;
    }, {});

    const scssContent = Object.entries(typeGroups)
      .map(([type, tokens]) => {
        // return `$${type}: (\n${tokens.join("\n")}\n);`;
        return `//${type}\n$${type}: (\n${tokens.join("\n")}\n)!default;`;
      })
      .join("\n\n");
    
    // return scssContent;
    return preset + scssContent;
  }
});

// registerFilter
StyleDictionary.registerFilter({
  name: 'isColor',
  matcher: function(prop) {
    return prop.type === "color";
  }
})

// registerTransformGroup 변환 그룹을 등록
// StyleDictionary.registerTransformGroup({
//   name: 'custom/web',
//   transforms: ['attribute/cti', 'name/cti/kebab', 'size/rem', 'color/css']
// });
// attribute/cti: 속성을 컴포넌트 유형 속성으로 변환합니다.
// name/cti/kebab: 이름을 컴포넌트 유형 인덱스 및 케밥 케이스로 변환합니다.
// size/rem: 사이즈 값을 rem 단위로 변환합니다.
// color/css: 색상 값을 CSS 변수 형식으로 변환합니다.
// 변환은 유형, 이름, 일치자 및 변환기의 4개 부분으로 구성됩니다. 변환은 일치자가 true를 반환하는 모든 디자인 토큰에서 실행됩니다. 참고: 일치자 기능을 제공하지 않으면 모든 토큰과 일치합니다.

// registerParser  JSON, XML, CSV 등 다양한 형식의 파일 파싱
StyleDictionary.registerParser({
  name: 'custom/json',
  pattern: /\.json$/,
  parse: ({contents, filePath}) => {
    // 파일을 파싱하여 디자인 토큰으로 반환
    return JSON.parse(contents);
  }
});

// fileHeader : 기본 포맷에만 적용 custom에는 x
StyleDictionary.registerFileHeader({
  name: "myCustomHeader",
  fileHeader: (defaultMessage) => {
    return [
      ...defaultMessage,
      `hello, world!`
    ]
  }
}),

// export
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
          // fileHeader 기본 포맷에만 적용 custom에는 x
          options: {
            fileHeader: "myCustomHeader"
          },
          filter: "isColor",
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