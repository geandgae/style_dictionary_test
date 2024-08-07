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

const preset2 = `
// generate-variables
@mixin generate-variables($map, $prefix: '', $suffix: '') {
	@each $key, $value in $map {
		--#{$prefix}#{$suffix}#{$key}: #{$value};
	}
}

:root {
	/*colors*/
	@include generate-variables($color, $prefix);
}

// Step 1: CSS 변수 SCSS 변수로 변환
$colors: (
  primary-5: var(--krds-Color-primary-5),
  primary-10: var(--krds-Color-primary-10),
  primary-20: var(--krds-Color-primary-20),
  primary-30: var(--krds-Color-primary-30),
  primary-40: var(--krds-Color-primary-40),
  primary-50: var(--krds-Color-primary-50),
  primary-60: var(--krds-Color-primary-60),
  primary-70: var(--krds-Color-primary-70),
  primary-80: var(--krds-Color-primary-80),
  primary-90: var(--krds-Color-primary-90),
  secondary-5: var(--krds-Color-secondary-5),
  secondary-10: var(--krds-Color-secondary-10),
  secondary-20: var(--krds-Color-secondary-20),
  secondary-30: var(--krds-Color-secondary-30),
  secondary-40: var(--krds-Color-secondary-40),
  secondary-50: var(--krds-Color-secondary-50),
  secondary-60: var(--krds-Color-secondary-60),
  secondary-70: var(--krds-Color-secondary-70),
  secondary-80: var(--krds-Color-secondary-80),
  secondary-90: var(--krds-Color-secondary-90),
  gray-0: var(--krds-Color-gray-0),
  gray-5: var(--krds-Color-gray-5),
  gray-10: var(--krds-Color-gray-10),
  gray-20: var(--krds-Color-gray-20),
  gray-30: var(--krds-Color-gray-30),
  gray-40: var(--krds-Color-gray-40),
  gray-50: var(--krds-Color-gray-50),
  gray-60: var(--krds-Color-gray-60),
  gray-70: var(--krds-Color-gray-70),
  gray-80: var(--krds-Color-gray-80),
  gray-90: var(--krds-Color-gray-90),
  gray-100: var(--krds-Color-gray-100),
  gray-100-100: var(--krds-Color-gray-100-100),
  gray-100-75: var(--krds-Color-gray-100-75),
  gray-100-50: var(--krds-Color-gray-100-50),
  gray-100-25: var(--krds-Color-gray-100-25),
  gray-100-10: var(--krds-Color-gray-100-10),
  danger-5: var(--krds-Color-danger-5),
  danger-10: var(--krds-Color-danger-10),
  danger-20: var(--krds-Color-danger-20),
  danger-30: var(--krds-Color-danger-30),
  danger-40: var(--krds-Color-danger-40),
  danger-50: var(--krds-Color-danger-50),
  danger-60: var(--krds-Color-danger-60),
  danger-70: var(--krds-Color-danger-70),
  danger-80: var(--krds-Color-danger-80),
  danger-90: var(--krds-Color-danger-90),
  information-5: var(--krds-Color-information-5),
  information-10: var(--krds-Color-information-10),
  information-20: var(--krds-Color-information-20),
  information-30: var(--krds-Color-information-30),
  information-40: var(--krds-Color-information-40),
  information-50: var(--krds-Color-information-50),
  information-60: var(--krds-Color-information-60),
  information-70: var(--krds-Color-information-70),
  information-80: var(--krds-Color-information-80),
  information-90: var(--krds-Color-information-90),
  warning-5: var(--krds-Color-warning-5),
  warning-10: var(--krds-Color-warning-10),
  warning-20: var(--krds-Color-warning-20),
  warning-30: var(--krds-Color-warning-30),
  warning-40: var(--krds-Color-warning-40),
  warning-50: var(--krds-Color-warning-50),
  warning-60: var(--krds-Color-warning-60),
  warning-70: var(--krds-Color-warning-70),
  warning-80: var(--krds-Color-warning-80),
  warning-90: var(--krds-Color-warning-90),
  success-5: var(--krds-Color-success-5),
  success-10: var(--krds-Color-success-10),
  success-20: var(--krds-Color-success-20),
  success-30: var(--krds-Color-success-30),
  success-40: var(--krds-Color-success-40),
  success-50: var(--krds-Color-success-50),
  success-60: var(--krds-Color-success-60),
  success-70: var(--krds-Color-success-70),
  success-80: var(--krds-Color-success-80),
  success-90: var(--krds-Color-success-90),
  point-5: var(--krds-Color-point-5),
  point-10: var(--krds-Color-point-10),
  point-20: var(--krds-Color-point-20),
  point-30: var(--krds-Color-point-30),
  point-40: var(--krds-Color-point-40),
  point-50: var(--krds-Color-point-50),
  point-60: var(--krds-Color-point-60),
  point-70: var(--krds-Color-point-70),
  point-80: var(--krds-Color-point-80),
  point-90: var(--krds-Color-point-90),
  background-gray-lighter: var(--krds-Color-background-gray-lighter),
  background-primary-on: var(--krds-Color-background-primary-on),
  background-secondary-on: var(--krds-Color-background-secondary-on),
  background-gray-light: var(--krds-Color-background-gray-light),
  background-success: var(--krds-Color-background-success),
  background-information: var(--krds-Color-background-information),
  background-danger: var(--krds-Color-background-danger),
  background-warning: var(--krds-Color-background-warning),
  background-white: var(--krds-Color-background-white),
  background-gray-disabled: var(--krds-Color-background-gray-disabled),
  background-primary-lighter: var(--krds-Color-background-primary-lighter),
  background-secondary-lighter: var(--krds-Color-background-secondary-lighter),
  background-primary-light: var(--krds-Color-background-primary-light),
  background-secondary-light: var(--krds-Color-background-secondary-light),
  background-secondary-dark: var(--krds-Color-background-secondary-dark),
  background-danger-lighter: var(--krds-Color-background-danger-lighter),
  background-warning-lighter: var(--krds-Color-background-warning-lighter),
  background-success-lighter: var(--krds-Color-background-success-lighter),
  background-information-lighter: var(--krds-Color-background-information-lighter),
  background-point-lighter: var(--krds-Color-background-point-lighter),
  background-point-light: var(--krds-Color-background-point-light),
  background-point-on: var(--krds-Color-background-point-on),
  border-gray-lighter: var(--krds-Color-border-gray-lighter),
  border-gray-light: var(--krds-Color-border-gray-light),
  border-gray: var(--krds-Color-border-gray),
  border-primary: var(--krds-Color-border-primary),
  border-secondary-light: var(--krds-Color-border-secondary-light),
  border-secondary: var(--krds-Color-border-secondary),
  border-danger-light: var(--krds-Color-border-danger-light),
  border-danger: var(--krds-Color-border-danger),
  border-warning-light: var(--krds-Color-border-warning-light),
  border-warning: var(--krds-Color-border-warning),
  border-success-light: var(--krds-Color-border-success-light),
  border-success: var(--krds-Color-border-success),
  border-information-light: var(--krds-Color-border-information-light),
  border-information: var(--krds-Color-border-information),
  border-gray-dark: var(--krds-Color-border-gray-dark),
  border-primary-active: var(--krds-Color-border-primary-active),
  border-gray-disabled: var(--krds-Color-border-gray-disabled),
  divider-gray-lighter: var(--krds-Color-divider-gray-lighter),
  divider-gray-light: var(--krds-Color-divider-gray-light),
  divider-gray: var(--krds-Color-divider-gray),
  divider-gray-dark: var(--krds-Color-divider-gray-dark),
  divider-primary: var(--krds-Color-divider-primary),
  divider-secondary-light: var(--krds-Color-divider-secondary-light),
  divider-secondary: var(--krds-Color-divider-secondary),
  divider-error: var(--krds-Color-divider-error),
  text-gray-title: var(--krds-Color-text-gray-title),
  text-gray-detail: var(--krds-Color-text-gray-detail),
  text-gray-disabled: var(--krds-Color-text-gray-disabled),
  text-gray-disabled-background: var(--krds-Color-text-gray-disabled-background),
  text-primary: var(--krds-Color-text-primary),
  text-secondary: var(--krds-Color-text-secondary),
  text-danger: var(--krds-Color-text-danger),
  text-warning: var(--krds-Color-text-warning),
  text-success: var(--krds-Color-text-success),
  text-information: var(--krds-Color-text-information),
  text-gray-body: var(--krds-Color-text-gray-body),
  text-point: var(--krds-Color-text-point),
  icon-gray-line: var(--krds-Color-icon-gray-line),
  icon-gray-fill: var(--krds-Color-icon-gray-fill),
  icon-white: var(--krds-Color-icon-white),
  icon-primary: var(--krds-Color-icon-primary),
  icon-secondary: var(--krds-Color-icon-secondary),
  icon-point: var(--krds-Color-icon-point),
  icon-danger: var(--krds-Color-icon-danger),
  icon-warning: var(--krds-Color-icon-warning),
  icon-success: var(--krds-Color-icon-success),
  icon-information: var(--krds-Color-icon-information),
  icon-gray-line-disabled: var(--krds-Color-icon-gray-line-disabled),
  link-default: var(--krds-Color-link-default),
  link-hover: var(--krds-Color-link-hover),
  link-pressed: var(--krds-Color-link-pressed),
  link-visted: var(--krds-Color-link-visted)
);

// Step 2: SCSS 반복문 작성
@each $name, $color in $colors {
  .bg-#{$name} {
    background-color: $color;
  }
}

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
    
    return preset + scssContent + preset2;
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