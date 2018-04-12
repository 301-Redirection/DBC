import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { ROUTE_NAMES } from '../routes/routes.config';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate() {
        if (this.auth.loggedIn) {
            return true;
        }
        
        this.router.navigate([ROUTE_NAMES.HOME]);
        return false;
    }

}