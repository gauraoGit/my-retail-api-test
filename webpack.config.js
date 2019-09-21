const path = require('path');

module.exports = {
  mode: "production", 
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-retail-api.bundle.js'
  },
  target: 'node',
};