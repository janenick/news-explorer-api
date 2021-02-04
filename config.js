const {
  JWT_SECRET = 'JWT_SECRET',
  PORT = 3000,
  MONGODB = 'mongodb://localhost:27017/db_news-explorer',
} = process.env;

const allowedCors = [
  'https://janenick-news-explorer.students.nomoredomains.monster',
  'http://janenick-news-explorer.students.nomoredomains.monster',
  'http://localhost:3000',
  'http://localhost:3003',
];

const urlRegEx = /^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/;

module.exports = {
  JWT_SECRET, MONGODB, PORT, allowedCors, urlRegEx,
};
