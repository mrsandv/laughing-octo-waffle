
## Welcome ✌️

[!CAUTION]
This project needs environment variables to work, add them as showed in 
```.env.example``` file

First, to run the development server:

```bash
npm i

npm run dev
```
### or using docker, the project contains a ready to run docker configuration

```
docker compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Demo version

Project is deployed on Vercel:  [https://parrot.mrsan.app](https://parrot.mrsan.app)

If in a future, this project has to be deployed as a static, just remove the comments on ```next.config.mjs```, and use some server or reverse proxy to deploy the dist folder as the base. Just be careful, this way of deploying limits the capabilities of Next.js and some functions may not be available

## Deploy on cloud like AWS ECS or Kubernetes

use the ```Dockerfile``` on the root, as entry point in the task definition

The project uses node:alpine to ensure functionality with minimal requirements

## Libs

This project uses the following libraries to facilitate execution and preserve data:

* NextJS as React framework, v14 - [NextJS](https://nextjs.org/)

```To manage middleware, routing, styles, types and SEO```

* Zustand as Store to manage and persist data - [Zustand](https://github.com/pmndrs/zustand)

```This project is small, but Zustand allows to reduce api request and keeps the data safe and stored, to use in every place on the app, the configuration is on /store.ts```

* BiomeJS as linter and formatter - [BiomeJS](https://biomejs.dev/)

```Combined with .editor config to keep the same style and to follow clean code strategies```

* React icons as auxiliary for UI decoration - [React icons](https://react-icons.github.io/react-icons/)
* React toastify as auxiliary for UI decoration, warn the user, toast in specific - [React toastify](https://www.npmjs.com/package/react-toastify)
* and JEST to run Unitary test - [Jest](https://jestjs.io/)


## Testing

### To run the tests just type, all necessary settings to catch all _test_ files
```bash
npm run test
```

## UI structure

This project follows the standard rules of functional components and making compositions of them, I also used some hooks to create persistence in the app and get the data without using a cascade of props, I used some mini algorithms to process data and adjust them thinking about the visualization and singleton functions to make the calls to rest API
