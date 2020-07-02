## Features

- Simple `index.html` loading `vendor.bundle.js` and `htmlWebpackPlugin.files`.
- All code following Airbnb's JavaScript (ES6) style guide with ESlint.
- WebpackHotMiddleware with automatic reloading. Start with: `yarn start`.
- Deployment build with `yarn run build:prod`.

## Components

- [Babel](https://babeljs.io) for ES6 support.
- [Chai](http://chaijs.com/) as BDD / TDD assertion library.
- [ESlint](http://eslint.org) for ES6 linting using Airbnb's JS style guide.
- [Mocha](https://mochajs.org/) as test framework.
- [React](https://facebook.github.io/react/) as front-end view library.
- [Webpack](https://webpack.github.io) as module bundler.
- [SASS](http://sass-lang.com/) as CSS preprocessing.
- [Postcss](http://postcss.org/) for transforming styles with JS plugins.
- [Redux](http://redux.js.org/) for state container.
- [Recompose](https://github.com/acdlite/recompose/) for function components and higher-order components.

## Getting Start

Run the following commands in your terminal

```bash
git clone git@bitbucket.org:clapping-ape/react-starter-kit.git
cd react-starter-kit
yarn install
yarn start
```

Then open [http://localhost:8082/](http://localhost:8082/) on your web browser.

### Testing

1. Run `yarn test` for simple test. (WIP)
2. Run `yarn run test:watch` for watch tests. (WIP)

### Linting

1. Run `yarn lint`.
2. Run `yarn fixlint` for automatically fix linting problems (not recommended).

## Deploying
 
For deployment, remove public folder if exist and run `yarn run build:prod`.

## License

MIT
