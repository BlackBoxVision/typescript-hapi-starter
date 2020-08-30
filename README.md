# TypeScript + Hapi = <3

This is a super simple starter kit to develop APIs with HapiJS + TypeScript

## What currently supports?

This starter kit comes with the following features:

- **Swagger-UI**
- **Status Monitor**
- **.env files support**
- **nodemon for hot-reload**
- **Pretty Console Logger with Winston**
- **Work with Yarn or NPM 6 as dependency resolvers**
- **Code formatting with Prettier as hook for Pre-commit**
- **Dockerfile + docker-compose for development**
- **Basic Test Suite with Tape**
- **Coverage Report**
- **Supports Heroku Deployment**
- **Supports Prettier for code formating**
- **Supports commitlint via husky to have standarized commit messages**

## Requirements

- NodeJS > 12.x
- NPM > 6.x

## How to use it?

1. Download this project as a zip.
2. Run `npm install`
3. Run `npm run nodemon:start`
4. Visit [http://localhost:8080/documentation](http://localhost:8080/documentation) to view swagger docs.
5. Visit [http://localhost:8080/api/users](http://localhost:8080/api/users) to test the REST API.
6. Visit [http://localhost:8080/status](http://localhost:8080/status) to view the status monitor.

UPDATED: Now there's a CLI that currently support creating a new project from this repo: [create-typescript-api](https://github.com/BlackBoxVision/create-typescript-api)

## TODO

This is not finished, there's still a lot of things to improve. Here you got some:

- [x] Simple test suite - added by the help of [@jcloutz](https://github.com/jcloutz)
- [x] Add support for test coverage - added by the help of [@jcloutz](https://github.com/jcloutz)
- [ ] Add GraphQL support
- [ ] Add support for Auth with JWT or Sessions
- [ ] Add support for TypeORM/Mongoose
- [ ] Add support for Jenkins pipeline

## Documentation

### What are the package.json scripts for?

- `build-ts`: Compiles typescript based on config set in tsconfig.json.
- `start`: Starts node with the compiled typescript. Used by eg. Heroku.
- `docker:logs`: View Docker logs
- `docker:ps`: List Docker containers
- `docker:start`: Start Docker container based on docker-compose.yml file.
- `docker:stop`: Stop Docker container
- `nodemon:build`: Starts the Nodemon using ts-node. No need to compile beforehand.
- `nodemon:start`: Same as nodemon:build
- `format:lint`: Runs tslint on the typescipt files, based on tslint.js settings.
- `format:prettier`: Runs prettier on all ts-files.
- `postinstall`: Runs build-ts script. This is used by eg. Heroku automatically.
- `test`: Runs tests using nyc, and creates coverage report.

## Issues

If you found a bug, or you have an answer, or whatever. Please, raise an [issue](https://github.com/BlackBoxVision/typescript-hapi-starter/issues/new).

## Contributing

Of course, if you see something that you want to upgrade from this library, or a bug that needs to be solved, PRs are welcome!

## License

Distributed under the **MIT license**. See [LICENSE](https://github.com/BlackBoxVision/typescript-hapi-starter/blob/master/LICENSE) for more information.
