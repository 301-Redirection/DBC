import { Component, OnInit } from '@angular/core';
import { BOTS } from '../bot-testing-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bots = BOTS;
  pageTitle = 'Dota 2 Bot Scripting - Dashboard';

  constructor(private title: Title) {
    this.title.setTitle(this.pageTitle);
  }

  ngOnInit() {
  }

}
