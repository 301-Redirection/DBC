import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component(
    {
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss'],
    },
)
export class HomeComponent implements OnInit {
    pageTitle = 'Dota 2 Bot Configurator - Home';
    dotaLogoURL = '../../assets/images/dota_logo.png';
    generateBackgroundURL = '../../assets/images/backgrounds/generate_background.png';
    createBackgroundURL = '../../assets/images/backgrounds/create_background.png';

    constructor(
        private title: Title,
        private router: Router,
        private auth: AuthService,
    ) {
        this.title.setTitle(this.pageTitle);
    }

    ngOnInit() { }

    navigate(route) {
        if (this.auth.loggedIn) {
            this.router.navigate([route]);
        } else {
            this.auth.login();
        }
    }
}

export default 'HomeComponent';
