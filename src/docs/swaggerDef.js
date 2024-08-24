const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Tell-adoc API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'EseVic/tell-adoc-backend/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `https://tell-adoc-backend.onrender.com/v1`,
    },
    {
      url: `http://localhost:3000/v1/`
    }
  ],
};

module.exports = swaggerDef;
