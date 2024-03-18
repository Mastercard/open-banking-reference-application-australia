/* eslint-disable @typescript-eslint/no-var-requires, no-undef  */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        ['/aggregation', '/notifications', '/connect'],
        createProxyMiddleware({
            target: 'https://api.openbanking.mastercard.com.au/',
            changeOrigin: true,
        })
    );
    app.use(
        '/token',
        createProxyMiddleware({
            target: 'http://webhook.site/',
            changeOrigin: true,
        })
    );
};
