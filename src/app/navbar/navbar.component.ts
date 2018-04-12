import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {    

    constructor(public auth: AuthService) { }

    ngOnInit() { }

    logout() {
        this.auth.logout(); 
        this.closeDropdown();
    }

    toggleHamburger() {
        let dropdown = document.getElementById('navbar-dropdown').classList;
        let hamburger = document.getElementById('hamburger').classList;
        
        if (hamburger.contains('is-active') && dropdown.contains('show')) {
            hamburger.remove('is-active');
        } 
        else if (hamburger.contains('is-active') && !dropdown.contains('show')) {
            hamburger.remove('is-active');
        }
        else if(!hamburger.contains('is-active') && dropdown.contains('show')) {
            hamburger.remove('is-active');
        }
        else {
            hamburger.add('is-active');
        }
    }
 
    closeDropdown() {
        let hamburger = document.getElementById('hamburger').classList;
        if (hamburger.contains('is-active')) {
            document.getElementById('hamburger').click();
        }        
    }

}
