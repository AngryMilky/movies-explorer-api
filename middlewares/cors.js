const allowedCors = [
  'https://diplom.milky.nomoredomainsrocks.ru',
  'http://diplom.milky.nomoredomainsrocks.ru',
  'https://api.diplom.milky.nomoredomainsrocks.ru',
  'http://api.diplom.milky.nomoredomainsrocks.ru',
  'http://localhost:3000',
];

// eslint-disable-next-line consistent-return
const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
};

module.exports = cors;
