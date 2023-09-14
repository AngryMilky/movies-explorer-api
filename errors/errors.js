const OK = 200;

const CREATED = 201;

// переданы некорректные данные в методы создания карточки, пользователя,
// обновления аватара пользователя или профиля
const BAD_REQUEST = 400;

// передан неверный логин или пароль
// если передан неверный JWT
const UNAUTHORIZED = 401;

// попытка удалить чужую карточку
const FORBIDDEN = 403;

// карточка или пользователь не найден
const NOT_FOUND = 404;

// при регистрации указан email, который уже существует
const CONFLICT = 409;

// ошибка по умолчанию
const SERVER_ERROR = 500;

module.exports = {
  OK, CREATED, UNAUTHORIZED, FORBIDDEN, BAD_REQUEST, NOT_FOUND, CONFLICT, SERVER_ERROR,
};
