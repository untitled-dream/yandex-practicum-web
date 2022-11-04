[![Tests for sprint 13](https://github.com/untitled-dream/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/untitled-dream/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests for sprint 14](https://github.com/untitled-dream/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/untitled-dream/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

# Проект Mesto - Backend

## Технологии
- Express
- MongoDB
- Mongoose
- ESLint

## Установка
```bash
# Клонировать репозиторий
git clone git@github.com:untitled-dream/express-mesto-gha.git

# Перейти в каталог проекта
cd express-mesto-gha

# Установить зависимости
npm i
```

## Запуск
```bash
# Запустить сервер на порту :3000
npm run start

# Запустить сервер на порту :3000 с Hot Reload
npm run dev
```

## Методы

| Метод  | Роут                 | Описание                                  |
|--------|----------------------|-------------------------------------------|
| GET    | /users               | Возвращает всех пользователей             |
| GET    | /users/:userID       | Возвращает пользователя по идентификатору |
| POST   | /users               | Создает пользователя                      |
| PATCH  | users/me             | Обвляет профиль                           |
| PATCH  | users/me/avatar      | Обновляет аватар                          |
| GET    | /cards               | Возвращает все карточки                   |
| POST   | /cards               | Создает карточку                          |
| DELETE | /cards/:cardId       | удаляет карточку по идентификатору        |
| PUT    | /cards/:cardId/likes | поставить лайк                            |
| DELETE | /cards/:cardId/likes | убрать лайк с карточки                    |

## Ошибки
| Метод  | Роут                 | Ошибки                                                                                                            |
|--------|----------------------|-------------------------------------------------------------------------------------------------------------------|
| GET    | /users               | 404 - пользователи не найдены<br>500 - на сервере произошла ошибка                                                |
| GET    | /users/:userID       | 400 - передан некорректный _id<br>404 - запрашиваемый пользователь не найден<br>500 - на сервере произошла ошибка |
| POST   | /users               | 400 - ошибка при валидации<br>500 - на сервере произошла ошибка                                                   |
| PATCH  | users/me             | 400 - ошибка при валидации<br>404 - пользователь с таким _id не найден<br>500 - на сервере произошла ошибка       |
| PATCH  | users/me/avatar      | 400 - ошибка при валидации<br>404 - пользователь с таким _id не найден<br>500 - на сервере произошла ошибка       |
| GET    | /cards               | 500 - на сервере произошла ошибка                                                                                 |
| POST   | /cards               | 400 - ошибка валидации<br>500 - на сервере произошла ошибка                                                       |
| DELETE | /cards/:cardId       | 400 - передан некорректный _id<br>404 - карточки с таким _id не существует<br>500 - на сервере произошла ошибка   |
| PUT    | /cards/:cardId/likes | 400 - передан некорректный _id<br>404 - карточки с таким _id не существует<br>500 - на сервере произошла ошибка   |
| DELETE | /cards/:cardId/likes | 400 - передан некорректный _id<br>404 - карточки с таким _id не существует<br>500 - на сервере произошла ошибка   |
