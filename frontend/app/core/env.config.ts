/*global window */

let IS_DEV;
if (window) {
    IS_DEV = window.location.port.indexOf('4200') > -1;
} else {
    IS_DEV = true;
}
const getHost = () => {

    let protocol;
    let host;
    if (!window) {
        protocol = 'http:';
        host = 'localhost';
    } else {
        protocol = window.location.protocol;
        host = window.location.host;
    }
    return `${protocol}//${host}`;
};
const apiURI = IS_DEV ? 'http://localhost:3000/api/' : '/api/';

export const ENV = {
    BASE_URI: getHost(),
    BASE_API: apiURI,
};
