const Movie = require('../models/movie');
const {
  OK, CREATED,
} = require('../errors/errors');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

// возвращение сохранённых текущим пользователем фильмов
module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(OK).send(movies))
    .catch(next);
};

// создание фильма
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
        return;
      }
      next(err);
    });
};

// удаление сохранённого фильма по id
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найдена');
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError('Недостаточно прав для удаления фильма');
      }
      return Movie.deleteOne(movie);
    })
    .then(() => res.status(OK).send({ message: 'Успешно' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при удалении фильма'));
        return;
      }
      next(err);
    });
};
