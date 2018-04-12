import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth.config';
import * as auth0 from 'auth0-js';
import { ROUTE_NAMES } from '../routes/routes.config';

@Injectable()
export class AuthService {
    // Create Auth0 web auth instance
    private _auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.CLIENT_ID,
        domain: AUTH_CONFIG.CLIENT_DOMAIN,
        responseType: 'token',
        redirectUri: AUTH_CONFIG.REDIRECT,
        audience: AUTH_CONFIG.AUDIENCE,
        scope: AUTH_CONFIG.SCOPE,
    });

    userProfile: any;

    // Create a stream of logged in status to communicate throughout app
    loggedIn: boolean;
    loggedInBehavior = new BehaviorSubject<boolean>(this.loggedIn);

    constructor(private router: Router) {
        const localProfile = localStorage.getItem('profile');

        if (this.isTokenValid) {
            this.userProfile = JSON.parse(localProfile);
            this.setLoggedIn(true);
        } else if (!this.isTokenValid && localProfile) {
            this.logout();
        }
    }

    setLoggedIn(value: boolean) {
        // Update login status subject
        this.loggedInBehavior.next(value);
        this.loggedIn = value;
    }

    login() {
        // Auth0 authorize request
        this._auth0.authorize();
    }

    handleAuth() {
        // When Auth0 hash parsed, get profile
        this._auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken) {
                window.location.hash = '';
                this._getProfile(authResult);
            } else if (err) {
                console.error(`Error authenticating: ${err.error}`);
                this.router.navigate([ROUTE_NAMES.HOME]);
            }
        });
    }

    private _getProfile(authResult) {
        // Use access token to retrieve user's profile and set session
        this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
            if (profile) {
                this._setSession(authResult, profile);
            } else if (err) {
                console.error(`Error authenticating: ${err.error}`);
            }
        });
    }

    private _setSession(authResult, profile) {
        // Save session data and update login status subject
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());
        // Set tokens and expiration in localStorage and props
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
        // Update login status in loggedIn$ stream
        this.setLoggedIn(true);
        // Redirect to Dashboard
        this.router.navigate([ROUTE_NAMES.DASHBOARD]);
    }

    logout() {
        // Ensure all auth items removed from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('profile');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('authRedirect');
        // Reset local properties, update loggedIn$ stream
        this.userProfile = undefined;
        this.setLoggedIn(false);
        // Return to homepage
        this.router.navigate([ROUTE_NAMES.HOME]);
    }

    get isTokenValid(): boolean {
        // Check if current time is past access token's expiration
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return Date.now() < expiresAt;
    }
}
