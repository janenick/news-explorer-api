module.exports = {
  successMessage: {
    removeArticle: 'Пост успешно удален',
    authorization: 'Авторизация прошла успешно',
  },
  clientErrorMessage: {
    incorrectId: 'id не удовлетворяет условиям',
    incorrectEmail: 'Неправильный формат почты',
    validationError: 'Ошибка валидации',
    renovationError: 'Указаны некорректные данные при обновлении',
    forbidden: 'Вы не можете совершить данное действие',
    forbiddenArticle: 'Вы не можете удалить данную статью',
    emailOrPasswordError: 'Введены неверные email или пароль',
    castError: 'В запросе переданы значения неправильного типа',
    unauthorized: 'Необходима авторизация',
    tokenError: 'С токеном что-то не так',
    notFoundArticle: 'Статья не найдена',
    notFoundUser: 'Пользователь не найден',
    notFoundRes: 'Запрашиваемый ресурс не найден',
    notFoundObject: 'Объект не найден',
    conflictUser: 'Пользователь с таким email уже зарегистрирован',
    celebrateErrorUrl: 'Введен некорректный URL',
    tooManyRequests: 'Запросы, поступившие с вашего IP-адреса, похожи на автоматические. Попробуйте повторить попытку позже', // 429 Too Many Requests («слишком много запросов»)
  },
  serverErrorMessage: {
    serverError: 'На сервере произошла ошибка',
    disconnectedError: 'Нет соединения с базой данных',
    serserverFallError: 'Сервер сейчас упадёт',
  },
};
