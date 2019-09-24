const babelJest = require("babel-jest");
const babelConfig = require("../build/babel.config");

module.exports = babelJest.createTransformer(babelConfig);
