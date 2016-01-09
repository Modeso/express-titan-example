# express-titan-example

## prerequisite
Install Titan Database with Rexster 2.5

- Simplest way to do it using docker:
https://hub.docker.com/r/apobbati/titan-rexster/

# Installation

npm install

# Running Server

node app.js

# Usage

## Web

### Login
You can login though Web:
GET http://localhost:3000/login

### Logout
GET http://localhost:3000/logout

## App

### Login
You can login through other application using a Token:
POST http://localhost:3000/oauth/twitter/token?oauth_token=<TOKEN>&oauth_token_secret=<TOKEN_SECRET>&user_id=<USER_ID>

### Logout
POST http://localhost:3000/logout

## API
display logged in Name:

GET http://localhost:3000/api/name

# sources
https://github.com/btford/angular-express-seed
