import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoutesModule } from '../routes/routes.module';

import { ApiConnectService } from '../services/api-connect.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Variables
  route: string;
  user: any = {
    id: "",
    name: "Bob",
    surname: "",
    email: ""
  };

  constructor(private api: ApiConnectService, private router: Router) { }

  ngOnInit() {
    this.route = this.router.url;
    // console.log(this.route);
  }

  public submitLogin() {
    this.api.login().subscribe();
  }

  public submitSignUp() {
    this.api.signUp().subscribe();
  }

  public submitLogout() {
    this.api.logout().subscribe();
  }

}
