const {
  JWT_SECRET = 'JWT_SECRET',
  NODE_ENV,
  PORT = 3000,
  MONGODB = 'mongodb://localhost:27017/db_news-explorer',
} = process.env;

const allowedCors = [
  'https://janenick-news-explorer.students.nomoredomains.monster',
  'http://janenick-news-explorer.students.nomoredomains.monster',
  'http://localhost:3000',
];

const JWT_DEV_SECRET = 'super-strong-dev-secret';

module.exports = {
  JWT_SECRET, NODE_ENV, MONGODB, PORT, allowedCors, JWT_DEV_SECRET,
};
