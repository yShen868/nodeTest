const dotenv = require('dotenv');
const fs = require('fs');

function loadEnv() {
  const env = process.env.NODE_ENV || 'development';
  const envFile = `.env.${env}`;

  if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
  } else {
    dotenv.config();
  }
}

module.exports = loadEnv;