import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

    username: String;

    constructor(public auth: AuthService) { }

    ngOnInit() {
        this.getUsername();
    }

    logout() {
        this.auth.logout();
        this.closeDropdown();
    }

    getUsername() {
        if (this.auth != null && this.auth.userProfile != null) {
            if (this.auth.userProfile.given_name != null) {
                this.username = this.auth.userProfile.given_name;
            } else if (this.auth.userProfile.nickname != null) {
                this.username = this.auth.userProfile.nickname;
            } else if (this.auth.userProfile.name != null) {
                this.username = this.auth.userProfile.name;
            } else {
                this.username = '';
            }
        }
    }

    toggleHamburger() {
        const dropdown = document.getElementById('navbar-dropdown').classList;
        const hamburger = document.getElementById('hamburger').classList;

        if (hamburger.contains('is-active') && dropdown.contains('show')) {
            hamburger.remove('is-active');
        } else if (hamburger.contains('is-active') && !dropdown.contains('show')) {
            hamburger.remove('is-active');
        } else if (!hamburger.contains('is-active') && dropdown.contains('show')) {
            hamburger.remove('is-active');
        } else {
            hamburger.add('is-active');
        }
    }

    closeDropdown() {
        const hamburger = document.getElementById('hamburger').classList;
        if (hamburger.contains('is-active')) {
            document.getElementById('hamburger').click();
        }
    }
}

export default 'NavbarComponent';
