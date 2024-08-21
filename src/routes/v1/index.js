const express = require('express');
const authRoute = require('./auth.route');
const bookingsRoute = require('./bookings');
const calendarRoute = require('./calendar')
const departmentsRoute = require('./departments')

const docsRoute = require('./docs.route');
const config = require('../../config/config');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  // {
  //   path: '/doctor',
  //   route: doctorRoute,
  // },
  // {
  //   path: '/patient',
  //   route: patientRoute,
  // },
  // {
  //   path: '/dash',
  //   route: dashboardRoute,
  // },
  {
    path: '/userBookings',
    route: bookingsRoute,
  }, 
  {
    path: '/calendar',
    route: calendarRoute ,
  }, 
  {
    path: '/department',
    route: departmentsRoute,
  }, 
  {
    path: '/booking',
    route: bookingsRoute,
  }, 
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
