# node-course-my-form-be

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

Form builder project builds on [Nest](https://github.com/nestjs/nest) framework, [TypeScript](https://github.com/microsoft/TypeScript) and [PostgreSQL](https://github.com/postgres/postgres).

## Installation
Before project installation need to install [PostgreSQL](https://www.postgresql.org/download/). <br>
After PostgreSQL installation go to pgAdmin and create a new database (for example "form_builder") and then edit file "src/config/typeorm.config.ts" namely the line "database" to your database name which you just created.

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```