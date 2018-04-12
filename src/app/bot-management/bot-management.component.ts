import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BOTS } from '../bot-testing-data';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-bot-management',
  templateUrl: './bot-management.component.html',
  styleUrls: ['./bot-management.component.css']
})
export class BotManagementComponent implements OnInit {
  bots = BOTS;
  showDetails = false;
  pageTitle = 'Dota 2 Bot Scripting - Management';

  constructor(private title: Title) {
    this.title.setTitle(this.pageTitle);
  }

  ngOnInit() {  }

}
