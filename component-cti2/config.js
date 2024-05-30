// // build-css.js
// const StyleDictionary = require('style-dictionary');

// // 사용자 정의 형식 등록
// StyleDictionary.registerFormat({
//   name: 'custom/css',
//   formatter: function({ dictionary }) {
//     let css = '.button-primary {\n';

//     dictionary.allProperties.forEach(prop => {
//       if (prop.path[0] === 'component' && prop.path[1] === 'button' && prop.path[2] === 'primary') {
//         css += `  ${prop.path[prop.path.length - 1].replace(/-/g, '-')}: ${prop.value};\n`;
//       }
//     });

//     css += '}\n';

//     return css;
//   }
// });

// // Style Dictionary 설정
// const StyleDictionaryConfig = {
//   source: ['tokens/**/button2.json'],
//   platforms: {
//     css: {
//       transformGroup: 'css',
//       buildPath: 'build/',
//       files: [{
//         destination: 'button-primary.css',
//         format: 'custom/css'
//       }]
//     }
//   }
// };

// // Style Dictionary 빌드 실행
// StyleDictionary.extend(StyleDictionaryConfig).buildAllPlatforms();


// const StyleDictionary = require('style-dictionary');
// const transformer = StyleDictionary.transform['attribute/cti'].transformer;

// const propertiesToCTI = {
//   'width': {category: 'size', type: 'dimension'},
//   'min-width': {category: 'size', type: 'dimension'},
//   'max-width': {category: 'size', type: 'dimension'},
//   'height': {category: 'size', type: 'dimension'},
//   'min-height': {category: 'size', type: 'dimension'},
//   'max-height': {category: 'size', type: 'dimension'},
//   'border-width': {category: 'size', type: 'border', item: 'width'},
//   'border-radius': {category: 'size', type: 'border', item: 'radius'},
//   'border-color': {category: 'color', type: 'border'},
//   'background-color': {category: 'color', type: 'background'},
//   'color': {category: 'color', type: 'font'},
//   'text-color': {category: 'color', type: 'font'},
//   'padding': {category: 'size', type: 'padding'},
//   'padding-vertical': {category: 'size', type: 'padding'},
//   'padding-horizontal': {category: 'size', type: 'padding'},
//   'icon': {category: 'content', type: 'icon'},
//   'font-size': {category: 'size', type: 'font'},
//   'line-height': {category: 'size', type: 'line-height'},
//   'size': {category: 'size', type: 'icon'}
// }

// const CTITransform = {
//   type: `attribute`,
//   transformer: (prop) => {
//     if (prop.path[0] === 'component') {
//       return propertiesToCTI[prop.path[prop.path.length - 1]];
//     } else {
//       return transformer(prop);
//     }
//   }
// }

// StyleDictionary.registerFormat({
//   name: 'custom/css',
//   formatter: function({ dictionary }) {
//     let css = '.button-primary {\n';

//     dictionary.allProperties.forEach(prop => {
//       if (prop.path[0] === 'component' && prop.path[1] === 'button' && prop.path[2] === 'primary') {
//         css += `  ${prop.path[prop.path.length - 1].replace(/-/g, '-')}: ${prop.value};\n`;
//       }
//     });

//     css += '}\n';

//     return css;
//   }
// });

// module.exports = {
//   transform: {
//     'attribute/cti': CTITransform
//   },
//   source: ['tokens/**/*.json'],
//   platforms: {
//     css: {
//       transformGroup: 'css',
//       buildPath: 'build/',
//       files: [{
//         destination: 'button-primary.css',
//         format: 'custom/css'
//       }]
//     }
//   }
// }

const StyleDictionary = require('style-dictionary');
const transformer = StyleDictionary.transform['attribute/cti'].transformer;

const propertiesToCTI = {
  'width': {category: 'size', type: 'dimension'},
  'min-width': {category: 'size', type: 'dimension'},
  'max-width': {category: 'size', type: 'dimension'},
  'height': {category: 'size', type: 'dimension'},
  'min-height': {category: 'size', type: 'dimension'},
  'max-height': {category: 'size', type: 'dimension'},
  'border-width': {category: 'size', type: 'border', item: 'width'},
  'border-radius': {category: 'size', type: 'border', item: 'radius'},
  'border-color': {category: 'color', type: 'border'},
  'background-color': {category: 'color', type: 'background'},
  'color': {category: 'color', type: 'font'},
  'text-color': {category: 'color', type: 'font'},
  'padding': {category: 'size', type: 'padding'},
  'padding-vertical': {category: 'size', type: 'padding'},
  'padding-horizontal': {category: 'size', type: 'padding'},
  'icon': {category: 'content', type: 'icon'},
  'font-size': {category: 'size', type: 'font'},
  'line-height': {category: 'size', type: 'line-height'},
  'size': {category: 'size', type: 'icon'}
};

const CTITransform = {
  type: 'attribute',
  transformer: (prop) => {
    if (prop.path[0] === 'component') {
      return propertiesToCTI[prop.path[prop.path.length - 1]];
    } else {
      return transformer(prop);
    }
  }
};

StyleDictionary.registerFormat({
  name: 'custom/css',
  formatter: function({ dictionary }) {
    let className = '';
    let css = '';

    dictionary.allProperties.forEach(prop => {
      if (prop.path[0] === 'component' && prop.path[1] === 'button' && prop.path[2] === 'primary') {
        if (prop.path[prop.path.length - 1] === 'class-name') {
          className = prop.value;
        } else {
          css += `  ${prop.path[prop.path.length - 1].replace(/_/g, '-')}: ${prop.value};\n`;
        }
      }
    });

    return `.${className} {\n${css}}\n`;
  }
});

module.exports = {
  transform: {
    'attribute/cti': CTITransform
  },
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/',
      files: [{
        destination: 'button-primary.css',
        format: 'custom/css'
      }]
    }
  }
};
