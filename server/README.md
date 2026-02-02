

[![npm version](https://badge.fury.io/js/nestjs.svg)](https://badge.fury.io/js/nestjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Author](#author)

# Introduction

Fetch list of trending companies, filtered by companyId, country, companyTicker and their events well paginated.

I implemented a domain-driven design approach to structure the project codebase, aligning business logic with distinct domains.


### Project Structure

```bash
├── src
├── .env.sample
├── .eslintrc
├── .gitignore
├── .prettierrc
├── jest.config
├── Makefile
├── package.json
├── README.md
└── tsconfig.json
```

# Getting Started

### Dependencies

This project uses [Nest.js](https://docs.nestjs.com/) v10.0.0. It has the following dependencies:

[Postgres Database](https://www.postgresql.org/)
- [Typeorm](https://typeorm.io/)
- ESLint & Prettier

#### _Prerequisites_

- Ensure you have **NodeJS** installed by entering `node -v` on your terminal
  If you don't have **NodeJS** installed, go to the [NodeJS Website](http://nodejs.org), and follow the download instructions

### Getting the Source

### Installation and Running the Application

- After cloning the repository, create a `.env` file from `.env.sample` and set your local `.env.` variable(s).

```sh
cp .env.sample .env
```

### Using the Makefile for Testing
How to run all tests locally

1. `make install` - Installs dependencies.
2. `make dev` - Run the server
3. `make build` - Run build to generate dist folder
4. `make lint` - Lint code
4. `make seed` - Seed trending sample data


## _API Endpoints_

You can test the endpoint directly from the swagger documentation below

- Swagger documentation can be accessed on this localhost link [Swagger Docs Link](http://localhost:3500/api/v1/docs)

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `404` `Not Found` An attempt was made to access a resource that does not exist in the API
- `500` `Server Error` An error on the server occurred

# Technologies Used:

Nestjs, Postgres, Typeorm, Swagger

# Why Nestjs was used for the project

- `TypeScript Support`:

It is built with TypeScript, which brings the benefits of static typing, interfaces, and a more robust development experience. This helps catch errors during development rather than runtime.

- `Modular Architecture`:

It promotes a modular and organized code structure. It uses domain/modules, controllers, and services to separate concerns, making the codebase more maintainable and scalable.

- `Dependency Injection`:

NestJS uses a powerful dependency injection system that facilitates the development of loosely coupled and easily testable components. This promotes a clean and modular codebase.

- `ORM Integration`:

NestJS seamlessly integrates with popular Object-Relational Mapping (ORM) libraries like TypeORM. This simplifies database operations and allows developers to work with databases using TypeScript.

- `Scalability`:

It is designed to be scalable, making it suitable for both small projects and large-scale enterprise applications. Its modular architecture and organization facilitate the growth of applications over time.


# Author:

Ifeoma Sandra Okafor