import { Component, OnInit } from '@angular/core';
import { BOTS } from '../bot-testing-data';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../routes/routes.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    bots = BOTS;
    pageTitle = 'Dota 2 Bot Scripting - Dashboard';

    constructor(private title: Title, private router: Router) {
        this.title.setTitle(this.pageTitle);
    }

    ngOnInit() { }

}
