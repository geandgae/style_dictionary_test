// node
const StyleDictionary = require("style-dictionary");

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
  formatter: function(dictionary) {
    
    // test dictionary.allProperties
    const attributesArray = dictionary.allProperties.map(obj => obj.attributes);
    // console.log(dictionary.allProperties);
    console.log(attributesArray);

    const typeGroups = dictionary.allProperties.reduce((acc, prop) => {
      const type = prop.type;
      // const type = prop.path[0];
      // const type = prop.description;
      if (!acc[type]) {
        acc[type] = [];
      }
      const name = transformName(prop);
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


// export
module.exports = {
  source: ["./tokens/figmaTokens/transformed_tokens.json"],
  platforms: {
    scss: {
      // transforms: ['attribute/cti', 'name/cti/kebab', 'size/rem'],
      transformGroup: "scss",
      buildPath: "build/scss/",
      files: [
        {
          destination: "variables-sd.scss",
          format: "custom/scss-format",
          // filter: "isColor",
        },
      ],
    },
  },
}

console.log("transform-scss!!");