## Usage
    git clone https://github.com/noumanDev/nodewithpassport.git
    create .env file and paste following
        MONGODB_URL=mongodb://localhost:27017/anx
        COOKIE_SECRET=hellosecrethowareyou
        FACEBOOK_CLIENT_ID=1549485661857583
        FACEBOOK_CLIENT_SECRET=8d2631d9338e5129729e1bc4f895621f
        FACEBOOK_CALLBACK_URL=http://localhost:3001/api/auth/facebook/callback
        CLIENT_BASE_URL=https://localhost:3000
    
    npm install
    npm start
        

Passport js
    https://medium.com/tkssharma/authentication-using-passport-js-social-auth-with-node-js-1e1ec7086ded
    https://codeburst.io/node-js-by-example-part-3-31a29f5d7e9c







[![Build Status](https://img.shields.io/travis/madhums/node-express-mongoose/master.svg?style=flat)](https://travis-ci.org/madhums/node-express-mongoose)
[![Dependencies](https://img.shields.io/david/madhums/node-express-mongoose.svg?style=flat)](https://david-dm.org/madhums/node-express-mongoose)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/madhums/node-express-mongoose)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/madhums/node-express-mongoose?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Node Express Mongoose

A boilerplate application for building web apps using express, mongoose and passport.

Read the [wiki](https://github.com/madhums/node-express-mongoose/wiki) to understand how the application is structured.

## Usage

    git clone https://github.com/madhums/node-express-mongoose.git
    cd node-express-mongoose
    npm install
    cp .env.example .env
    npm start

Checkout the [apps that are built using this approach](https://github.com/madhums/node-express-mongoose/wiki/Apps-built-using-this-approach)

## Docker

You can also use docker for development. Make sure you run npm install on your host machine so that code linting and everything works fine.

```sh
npm i
cp .env.example .env
```

Start the services

```sh
docker-compose up -d
```

View the logs

```sh
docker-compose logs -f
```

In case you install a npm module while developing, it should also be installed within docker container, to do this first install the module you want with simple `npm i module name`, then run it within docker container

```sh
docker-compose exec node npm i
```

If you make any changes to the file, nodemon should automatically pick up and restart within docker (you can see this in the logs)

To run tests

```sh
docker-compose exec -e MONGODB_URL=mongodb://mongo:27017/noobjs_test node npm test
```

Note that we are overriding the environment variable set in `.env` file because we don't want our data erased by the tests.

Note: The difference between exec and run is that, exec executes the command within the running container and run will spin up a new container to run that command. So if you want to run only the tests without docker-compose up, you may do so by running `docker-compose run -e MONGODB_URL=mongodb://mongo:27017/my_app_test node npm test`

## License

MIT
