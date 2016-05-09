# Retrospective

![Retrospective](https://raw.githubusercontent.com/scottdover/retrospective/master/docs/screenshot.png)

At the end of every sprint, we developers ask ourselves, what did we do this sprint, and how
do we feel about that? This app encompasses those behaviors, and gives the user a history
of information to find out where we are, and where we're going.

## How to build

 1. Clone this repo
 2. Sign up for pusher at [pusher.com](https://pusher.com/)
 3. `mv build.sh.example build.sh`
 4. Update pusher credentials in `build.sh`
 5. `sh build.sh`
 6. Visit [localhost:3000](http://localhost:3000/)

## Technologies used

 - Ruby / Rails
 - React w/ Reflux

## Roadmap

 - Move authentication (sign in / up) to client-side
 - Split front-end from backend
 - Optimize for offline usage (i.e. queue server requests, event emissions in the case server is unreachable) (look in to hoodie / offlinejs)
 - es6-ify all the things (and switch to Webpack)
 - Potentially refactor codebase to use Redux
 - Research moving to socket.io over Pusher for notifications
 - Come up with a way to create "groups" so that we can have a more sane way to manage retrospective access
