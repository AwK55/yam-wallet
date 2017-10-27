const CsvBuilder = require('csv-builder');


function init(options) {
  return new CsvBuilder(options);
}

function transformStream() {
  return builder.createTransformStream();
}

module.exports = (options) => {
  const builder = init(options);
  return builder.createTransformStream();
};
