// common.js
module.exports = {
  // source: ["tokens/**/*.json"],
  // source: ["tokens/**/design-tokens-effect.tokens.json"],
  source: ["tokens/**/ge-color.tokens.json"],
  transform: {
    // Now we can use the transform 'myTransform' below
    myTransform: {
      type: 'name',
      transformer: (token) => token.path.join('_').toUpperCase()
    }
  },
  // Same with formats, you can now write them directly to this config
  // object. The name of the format is the key.
  format: {
    myFormat: ({dictionary, platform}) => {
      // console.log(dictionary.allTokens.map(token => `${token.name}: ${token.value}`))
      const tokens = dictionary.allTokens.map(token => `  --${token.name}: ${token.value};`).join('\n');
      return `:root {\n${tokens}\n}`;
    }
  },
  platforms: {
    scss: {
      transformGroup: "css",
      buildPath: "build/",
      files: [
        {
          // destination: "variables-common.css",
          destination: "variables-ge.css",
          format: "myFormat",
          // format: "scss/variables",
          // format: "css/variables",
        },
      ],
    },
  },
};

console.log("fin");
