const express = require('express');
const cors = require('cors');
const apiMocker = require('connect-api-mocker');
const log = require('fancy-log');
const color = require('ansi-colors');

function mockapi() {

  const server = express();

  const port = 3010;

  server.use(cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true
  }));

  server.use(apiMocker('/mockapi', 'source/__mock-api__'))

  server.listen(port, () => {
    log(color.green(`Mock api listening on port ${port}`));
  });

  return Promise.resolve();


}

module.exports = {
  mockapi: mockapi
};
