# News Explorer API
Дипломная работа (курс web-разработчик,  Яндекс-Практикум)

Репозиторий для приложения проекта `News Explorer`, включающий бэкенд приложения со следующими возможностями: авторизация и регистрация пользователей, операции со статьями.
  
Домен приложения: https://janenick-news-explorer.students.nomoredomains.monster

REST API: https://api.janenick-news-explorer.students.nomoredomains.monster

Публичный IP: 178.154.229.238

Ссылка на репозиторий фронтенда [News Explorer frontend] (https://github.com/janenick/news-explorer-frontend)

---------------
*Сервер для проекта News Explorer с использованием фреймворка Express (Node.js)*

**Применяемые технологии**
* Node.js
* Express
* Postman
* MongoDB
* Mongoose

---------------
**Роуты**

`POST /signup` — роут для регистрации 
`POST /signin` — роут для логина 

`GET /users` — возвращает всех пользователей 
`POST /users` — создаёт пользователя 
`GET /users/me` — возвращает данные профиля пользователя 

`GET /articles` — возвращает все статьи 
`POST /articles` — создаёт статью 
`DELETE /articles/:articleId` — удаляет статью по идентификатору 

---------------
**Запуск:**

npm i - устанавливаем зависимости 
npm run dev - для запуска сервера с hot-reload 
npm run start - для запуска сервера 

