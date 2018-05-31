## Roombelt

[Roombelt](https://roombelt.com) is a free and open source meeting room manager
focused on simplicity. Works both in Cloud and On-Premises.

![Tablet with roombelt installed](https://roombelt.com/img/tablet.png)

## Installation

Sign-on to cloud version at [app.roombelt.com](https://app.roombelt.com).
For instruction on installing Roombelt On-Premises visit
[documentation](https://docs.roombelt.com/installation/on-premises).

## Status of this project

This project started as a playground to learn ReactJS. Then it turned out that it's actually useful 
so I decided to finish and release it. With early adopters I will continue development.  

## What's under the hood

Roombelt takes advantage of the following tools:
- code formatting - [prettier](https://prettier.io/) 
- bootstrapping ReactJS app - [create react app](https://github.com/facebook/create-react-app)
- backend server - [express.js](https://expressjs.com/)
- ORM - [sequelize](http://docs.sequelizejs.com/)
- app state management - [redux](https://redux.js.org/)
- side effects in redux - [redux-play](https://github.com/ziolko/redux-play)
- selectors library - [reselect](https://github.com/reduxjs/reselect)
- frontend routing - [react-router](https://reacttraining.com/react-router/)
- animation library - [react-spring](https://github.com/drcmda/react-spring)
- offline mode - create react app web worker + [custom code for handling offline](https://github.com/ziolko/roombelt/blob/master/src/apps/device/store/plays/heartbeat.js)

I've tried a few technologies that eventually didn't make it: 
- [redux-observable](https://redux-observable.js.org/) - I didn't have time to do PhD on observables. I've decided to use redux-play instead.
- [GraphQL](https://graphql.org) - Too much boilerplate for this kind of app. Good old REST API was both easier and faster to develop.
- [next.js](https://github.com/zeit/next.js) - Server side rendering didn't really make sense in this app. Decided to use CRA instead.  

## Feedback

Feel free to request new feature on [Github](https://github.com/ziolko/roombelt/issues)
or contact me using the chat widget on [roombelt.com](https://roombelt.com).

## License

Roombelt is licensed under permissive [ISC license](https://github.com/ziolko/roombelt/blob/master/LICENSE.txt).
