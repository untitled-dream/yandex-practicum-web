# Проект Mesto - Backend

## Сервер - [api.beat-film.nomoredomains.icu](api.beat-film.nomoredomains.icu)

## Технологии
- Express
- MongoDB
- Mongoose
- ESLint
- Winston
- Helmet

## Установка
```bash
# Клонировать репозиторий
git clone git@github.com:untitled-dream/movies-explorer-api.git

# Перейти в каталог проекта
cd movies-explorer-api

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

| Метод  | Роут                 | Описание                                        |
|--------|----------------------|-------------------------------------------------|
| GET    | /users/me            | Возвращает информацию о пользователе            |
| PATCH  | /users/me            | Обновляет информацию о пользователе             |
| GET    | /movies              | Возвращает все сохранённые пользователем фильмы |
| POST   | /movies              | Создает фильм                                   |
| DELETE | /movies/_id          | Удаляет сохранённый фильм по id                 |
