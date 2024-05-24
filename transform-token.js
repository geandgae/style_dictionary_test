// node
const StyleDictionary = require("style-dictionary");

StyleDictionary.registerFormat({
  name: "customCss",
  formatter: function ({ dictionary, platform, options, file }) {
    // console.log(dictionary);
    const variablesObject = dictionary.allProperties.reduce((acc, { value, type, path }) => {
      // type에 따라 어떻게 파싱할 껀지 처리 해주면 됨 ! (현재는 color에 대해서만 파싱)
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

const styleDictionaryExtended = StyleDictionary.extend({
  // source: ["tokens/**/*.json"],
  source: ["tokens/**/design-tokens-effect.tokens.json"],
  platforms: {
    scss: {
      transformGroup: "css",
      buildPath: "build/",
      files: [
        {
          destination: "variables.css",
          format: "customCss",
          // format: "scss/variables",
          // format: "css/variables",
        },
      ],
    },
  },
});

styleDictionaryExtended.buildAllPlatforms();



console.log("fin");
