const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
/* Authenticate JWT at route endpoints */
const env = {
    AUTH0_CLIENT_ID: 'kYw-F9JzITYkyDZoQUiFE5PGqkeAvB_H',
    AUTH0_DOMAIN: 'dota-bot-scripting.eu.auth0.com',
    AUTH0_CALLBACK_URL: 'http://localhost:3000/callback',
    AUTH0_API_AUDIENCE: 'dota-bot-scripting',
};

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: env.AUTH0_API_AUDIENCE,
    issuer: `https://${env.AUTH0_DOMAIN}/`,
    algorithm: 'RS256',
});

module.exports.jwtCheck = jwtCheck;
