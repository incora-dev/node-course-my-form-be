# node-course-my-form-be

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

Form builder project builds on [Nest](https://github.com/nestjs/nest) framework, [TypeScript](https://github.com/microsoft/TypeScript) and [PostgreSQL](https://github.com/postgres/postgres).

## Installation
Before project installation need to install [PostgreSQL](https://www.postgresql.org/download/). <br>
After PostgreSQL installation go to pgAdmin and create a new database (for example "form_builder") and then edit configuration database file "src/config/typeorm.config.ts":
  - "username" should be the username for your database ("postgres" by default)
  - "password" should be the password for your database ("postgres" by default)
  - "database" should be your database name which you just created ("form_builder" by default)

Then you can run the command:
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

## Documentation
While the application is running, open your browser and navigate to http://localhost:3000/api. You should see all API documentation.
You can also view the documentation for each module separately:
  - Auth http://localhost:3000/api/auth
  - Users http://localhost:3000/api/users

If you want to download the corresponding Swagger JSON file, you can simply call http://localhost:3000/api-json in your browser.