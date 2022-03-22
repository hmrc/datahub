const logInFilter = function (pathname, req) {
  return pathname.match('^/data-catalogue/logIn') && req.method === 'POST';
};

if (process.env.REACT_APP_MOCK === 'true' || process.env.REACT_APP_MOCK === 'cy') {
    // no proxy needed, MirageJS will intercept all http requests
    module.exports = function () {};
} else {
    // create a proxy to the graphql server running in docker container
    const { createProxyMiddleware } = require('http-proxy-middleware');

    module.exports = function (app) {
        app.use(
            '/data-catalogue/logIn',
            createProxyMiddleware(logInFilter, {
                target: 'http://localhost:9002',
                changeOrigin: true,
            }),
        );
        app.use(
            '/data-catalogue/authenticate',
            createProxyMiddleware({
                target: 'http://localhost:9002',
                changeOrigin: true,
            }),
        );
        app.use(
            '/data-catalogue/api/v2/graphql',
            createProxyMiddleware({
                target: 'http://localhost:9002',
                changeOrigin: true,
            }),
        );
    };
}
