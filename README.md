# Bitmovin Comparison Dashboard

This application demonstrates how to build a dashboard for video analytics using the [Bitmovin
Javascript API client](https://github.com/bitmovin/bitmovin-javascript).

In this dashboard we show you how to

- Retrieve data for a customizable time range.
- Filter analytics data for different criteria like browsers or countries.
- Compare your video metrics in different countries, browsers or video players.
- Comfortably compose queries with the [Bitmovin
Javascript API client](https://github.com/bitmovin/bitmovin-javascript).

You can use this project as boilerplate code for your own dashboard and tailor it to your specific needs.

## Run it

To install the application, clone this repository, open the project directory in your terminal and run

```
npm install
```

Once all dependencies are installed, start the application with

```
npm start
```

If you're using the [Yarn](https://yarnpkg.com/lang/en/) package manager, run `yarn install` and `yarn start` instead.

The application will pop up in your browser where you're asked for your Bitmovin API key. Once you've entered it, the dashboard will load your analytics data.

## Technologies used

This example dashboard is built with [React](https://reactjs.org/), [Moment.js](https://momentjs.com/) and [React Bootstrap](https://react-bootstrap.github.io/).
