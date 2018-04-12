import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoutesModule } from '../routes/routes.module';

import { ApiConnectService } from '../services/api-connect.service';
import { AuthService } from '../auth/auth.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    // Variables
    user: any = {
        id: '',
        name: '',
        surname: '',
        email: ''
    };

    constructor(private api: ApiConnectService,
        private router: Router,
        public auth: AuthService) { }

    ngOnInit() {
    }

    toggleHamburger() {
        let hamburger = document.getElementById('hamburger').classList;
        if (hamburger.contains('is-active')) {
            hamburger.remove('is-active');
        }
        else {
            hamburger.add('is-active');
        }
    }

}
