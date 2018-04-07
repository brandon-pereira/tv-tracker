// throws an error in the console if the page wasn't able to load
function errorLoading(error) {
  throw new Error(`Dynamic page loading failed: ${error}`);
}

// Loading modules!
function loadRoute(cb) {
  // testing throttling with timeout
  return module => cb(null, module);
}

const routes = {
  path: '/',
  indexRoute: { // Default Route
    getComponent(location, cb) {
      import('./Views/Homescreen')
        .then(loadRoute(cb))
        .catch(errorLoading);
    },
  },
  childRoutes: [
    {
      path: 'add',
      getComponent(location, cb) {
        import('./Views/SearchScreen')
          .then(loadRoute(cb, false))
          .catch(errorLoading);
      },
    }
  ],
};

export default routes;