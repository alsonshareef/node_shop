/**
 * Determines path to root directory of application entry file.
 */

const path = require('path');

module.exports = path.dirname(require.main.filename);
