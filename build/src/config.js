"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKEND_URL = exports.FE_ORIGIN = exports.google_oauth_url = exports.GOOGLE_OAUTH_REDIRECT_URI = exports.GOOGLE_OAUTH_CLIENT_ID = exports.GOOGLE_OAUTH_ROOT = void 0;
exports.GOOGLE_OAUTH_ROOT = 'https://accounts.google.com/o/oauth2/v2/auth';
exports.GOOGLE_OAUTH_CLIENT_ID = '1044586183876-aq7hmksu9aq656lt1hdouhdcmck2k5ov.apps.googleusercontent.com';
exports.GOOGLE_OAUTH_REDIRECT_URI = 'https://127.0.0.1:3000/login/oauth';
const options = {
    redirect_uri: exports.GOOGLE_OAUTH_REDIRECT_URI,
    client_id: exports.GOOGLE_OAUTH_CLIENT_ID,
    response_type: 'code',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(' ')
};
const qs = new URLSearchParams(options);
exports.google_oauth_url = `${exports.GOOGLE_OAUTH_ROOT}?${qs.toString()}`;
exports.FE_ORIGIN = 'https://127.0.0.1:5173';
exports.BACKEND_URL = 'https://127.0.0.1:3000';
