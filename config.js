const {
  JWT_SECRET = 'JWT_SECRET',
  NODE_ENV,
  PORT = 3030,
  MONGODB = 'mongodb://localhost:27017/news-explorer-db',
} = process.env;

const allowedCors = [
  'https://janenick-news-explorer.students.nomoredomains.monster',
  'http://janenick-news-explorer.students.nomoredomains.monster',
  'http://localhost:3000',
];

module.exports = {
  JWT_SECRET, NODE_ENV, MONGODB, PORT, allowedCors,
};
