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
}

// transform
const CTITransform = {
  type: `attribute`,
  transformer: (prop) => {
    if (prop.path[0] === 'component') {
      return propertiesToCTI[prop.path[prop.path.length - 1]];
    } else {
      return transformer(prop);
    }
  }
}

// 커스텀 포매터 정의
StyleDictionary.registerFormat({
  name: 'custom/css',
  formatter: function({ dictionary }) {
    // // ver 1
    // let css = '.button-primary {\n';
    // dictionary.allProperties.forEach(prop => {
    //   if (prop.path[0] === 'component' && prop.path[1] === 'button' && prop.path[2] === 'primary') {
    //     css += `  ${prop.path[prop.path.length - 1].replace(/-/g, '-')}: ${prop.value};\n`;
    //   }
    // });
    // css += '}\n';
    // return css;

    // // ver2
    // let className = '';
    // let css = '';
    // dictionary.allProperties.forEach(prop => {
    //   if (prop.path[0] === 'component') {
    //     className = `${prop.path[1]}-${prop.path[2]}`;
    //     css += `  ${prop.path[prop.path.length - 1].replace(/_/g, '-')}: ${prop.value};\n`;
    //     // if (prop.path[prop.path.length - 1] === 'class-name') {
    //     //   className = prop.value;
    //     // } else {
    //     //   css += `  ${prop.path[prop.path.length - 1].replace(/_/g, '-')}: ${prop.value};\n`;
    //     // }
    //   }
    // });
    // return `.${className} {\n${css}}\n`;

    // ver3
    const classes = {};
    
    dictionary.allProperties.forEach(prop => {
      const [component, type, variant] = prop.path;
      
      if (component === 'component') {
        const className = `${type}-${variant}`;
        if (!classes[className]) {
          classes[className] = '';
        }
        classes[className] += `  ${prop.path[prop.path.length - 1].replace(/_/g, '-')}: ${prop.value};\n`;
      }
    });

    let css = '';
    for (const className in classes) {
      css += `/* ${className} */\n.${className} {\n${classes[className]}}\n\n`;
    }

    return css;
  }
});

// export
module.exports = {
  transform: {
    'attribute/cti': CTITransform
  },
  source: ['./tokens/cti/**/button2.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/',
      files: [{
        destination: 'button.css',
        format: 'custom/css'
      }]
    }
  }
}

console.log("transform-cti!!");