
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
  <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

# 📚 Bookstore API – Prueba Técnica Backend

API REST construida con **NestJS + PostgreSQL** para gestionar una colección de libros y autores. Incluye autenticación JWT, validaciones, pruebas unitarias, documentación Swagger y despliegue con Docker.

## ✨ Características

- ✅ CRUD de autores y libros
- ✅ Asociación de libros a autores
- ✅ Eliminación segura (no borrar autores con libros)
- ✅ Autenticación JWT (usuario simulado)
- ✅ Validaciones con `class-validator`
- ✅ Logger HTTP con `morgan` + `LoggerInterceptor`
- ✅ Swagger completamente documentado
- ✅ Pruebas unitarias con Jest
- ✅ Docker para desarrollo local

## 📦 Project setup

```bash
$ npm install
```

### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production
$ npm run start:prod
```

## 🧪 Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## 🐳 Docker

```bash
docker-compose up -d
```

## ⚙️ Variables de entorno

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=books_db

JWT_SECRET=supersecret
JWT_EXPIRES_IN=1h
```

## 📘 Documentación de la API

[http://localhost:3000/api](http://localhost:3000/api)

## 📚 Endpoints

### 🔐 Auth
- `POST /auth/login` – Genera token JWT

### 👤 Autores
- `POST /authors`
- `GET /authors`
- `GET /authors/:id`
- `DELETE /authors/:id`

### 📘 Libros
- `POST /books`
- `GET /books`
- `GET /books/:id`
- `PATCH /books/:id`
- `DELETE /books/:id`

## 🧪 Pruebas unitarias

```bash
npm run test
```

## 📂 Estructura del proyecto

```
src/
├── auth/
├── authors/
├── books/
├── common/
│   ├── filters/
│   ├── interceptors/
│   └── guards/
├── config/
├── main.ts
├── app.module.ts
```

## 📡 Despliegue

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

## 👤 Autor

Desarrollado por **Oscar David Bastidas Román**  
Prueba técnica backend – Julio 2025

## 📄 License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
