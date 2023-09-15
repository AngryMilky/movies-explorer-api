const {
  MONGO_LINK = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  NODE_ENV, PORT, JWT_SECRET, MONGO_LINK,
};
