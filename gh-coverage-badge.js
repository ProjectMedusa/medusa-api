module.exports = ( value, text = 'Coverage', color = '7289DA') => {
  return `https://img.shields.io/badge/${text}-${value}-${color}`;
}