# [Documentation](https://koppi.link/api-docs/)

# Koppi API [Try Me](https://koppi.link)

> Backend API for Koppi a url shortener

- Written in node.js using express and mongodb
- Testing with mocha and chai
- Documentation with Swagger

## Features implemented

Link:

- Create url as registered user
- Read url and get redirected
- Update url as registered user
- Delete url as registered user
- Create url as unregistered user

Auth:

- Register user
- Login user
- Get user info
- Logout user

## Usage

Rename "config/config.env.env" to "config/config.env" and update settings

## Run App

#### Install Dependencies

```
npm install
```

#### Run

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start

# Run tests
npm run tests
```

## Alternative Run App with docker in production

```
# build docker image
sudo docker build -t koppi .

# run docker
sudo docker run -dp 5000:5000 koppi
```

-Version 1.0.1

-License: MIT
