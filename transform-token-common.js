// node
const StyleDictionary = require("style-dictionary");

// 커스텀 포매터 정의
StyleDictionary.registerFormat({
  name: "custom/format",

  // ver2
  formatter: function ({ dictionary, platform, options, file }) {
    // console.log(dictionary);
    const variablesObject = dictionary.allProperties.reduce((acc, { value, type, path }) => {
      if (type === "dimension") {
        const key = path
          .map((name) => name.replace("dimension", "").trim())
          .filter((name) => name.length !== 0)
          .join("-");
        acc[key] = value;
      }
      if (type === "color") {
        const key = path
          .map((name) => name.replace("color", "").trim())
          .filter((name) => name.length !== 0)
          .join("-");
        acc[key] = value;
      }
      if (type === "custom-shadow") {
        const key = path
          .map((name) => name.replace("effect", "").trim())
          .map((name) => name.replace("shadow", "").trim())
          .filter((name) => name.length !== 0)
          .join("-");
        acc[key] = value;
        // const test = Object.values(value).map(val => val);
        // const test = Object.entries(value).forEach(([key, value]) => {
        //   console.log(`Key: ${key}, Value: ${value}`);
        //   // return `${key}: ${value}`
        // });
        // console.log(test);
        // value.forEach(element => {
        //   console.log(element);
        // });
      }
      return acc;
    }, {});
    const cssString = Object.entries(variablesObject)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n");
    return `:root {\n${cssString}\n}`;
  },

});


// Style Dictionary 설정
const StyleDictionaryConfig = {
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
};

// Style Dictionary 확장
const StyleDictionaryExtended = StyleDictionary.extend(StyleDictionaryConfig);

// 빌드 실행
StyleDictionaryExtended.buildAllPlatforms();


console.log("StyleDictionaryExtended fin");