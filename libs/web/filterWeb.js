const acceptedTypes = ['color', 'dimension', 'font', 'custom-radius', 'custom-fontStyle', 'custom-spacing', 'custom-shadow', 'custom-gradient']

module.exports = (token) => acceptedTypes.includes(token.type)
