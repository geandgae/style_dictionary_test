const StyleDictionary = require('style-dictionary');
const transformer = StyleDictionary.transform['attribute/cti'].transformer;

const propertiesToCTI = {
  'fontSize': {category: 'size', type: 'font'},
  'textDecoration': {category: 'text', type: 'decoration'},
  'fontFamily': {category: 'text', type: 'font-family'},
  'fontWeight': {category: 'text', type: 'font-weight'},
  'fontStyle': {category: 'text', type: 'font-style'},
  'fontStretch': {category: 'text', type: 'font-stretch'},
  'letterSpacing': {category: 'size', type: 'letter-spacing'},
  'lineHeight': {category: 'size', type: 'line-height'},
  'paragraphIndent': {category: 'size', type: 'paragraph-indent'},
  'paragraphSpacing': {category: 'size', type: 'paragraph-spacing'},
  'textCase': {category: 'text', type: 'case'},
  'shadowType': {category: 'effect', type: 'shadow'},
  'radius': {category: 'effect', type: 'radius'},
  'color': {category: 'color'},
  'offsetX': {category: 'effect', type: 'offset-x'},
  'offsetY': {category: 'effect', type: 'offset-y'},
  'spread': {category: 'effect', type: 'spread'}
};

const CTITransform = {
  type: 'attribute',
  transformer: (prop) => {
    if (prop.path[0] === 'component') {
      return propertiesToCTI[prop.path[prop.path.length - 1]] || transformer(prop);
    } else {
      return transformer(prop);
    }
  }
};

StyleDictionary.registerTransform({
  name: 'attribute/cti-custom',
  type: 'attribute',
  transformer: CTITransform.transformer
});

StyleDictionary.registerFormat({
  name: 'custom/scss',
  formatter: function({ dictionary }) {
    const classes = {};

    dictionary.allProperties.forEach(prop => {
      const [component, type, variant, subVariant] = prop.path;
      if (component === 'component') {
        const className = `${type}-${variant}${subVariant ? `_${subVariant}` : ''}`;
        const value = prop.value;
        
        if (!classes[className]) {
          classes[className] = '';
        }

        if (typeof value === 'object') {
          for (const key in value) {
            classes[className] += `  ${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value[key]};\n`;
          }
        } else {
          classes[className] += `  ${prop.path[prop.path.length - 1].replace(/_/g, '-')}: ${value};\n`;
        }
      }
    });

    let scss = '';
    for (const className in classes) {
      scss += `.${className} {\n${classes[className]}}\n\n`;
    }

    return scss;
  }
});

module.exports = {
  transform: {
    'attribute/cti': CTITransform
  },
  source: ['./tokens/cti/fontStyles.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/',
      files: [{
        destination: 'fontStyles.scss',
        format: 'custom/scss'
      }]
    }
  }
};
