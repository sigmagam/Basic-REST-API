const serverless = require('serverless-http');
const app = require('../src/index'); // pastikan path ini sesuai

module.exports = serverless(app);
