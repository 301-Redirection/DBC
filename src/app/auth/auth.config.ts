import { ENV } from './../core/env.config';

interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
};

export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'kYw-F9JzITYkyDZoQUiFE5PGqkeAvB_H',
    CLIENT_DOMAIN: 'dota-bot-scripting.eu.auth0.com', 
    AUDIENCE: 'dota-bot-scripting',
    REDIRECT: `${ENV.BASE_URI}/callback`,
    SCOPE: 'openid profile'
};