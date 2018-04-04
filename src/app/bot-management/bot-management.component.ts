import { Component, OnInit } from '@angular/core';
import { BOTS } from '../bot-testing-data';
import { forEach } from '@angular/router/src/utils/collection';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-bot-management',
  templateUrl: './bot-management.component.html',
  styleUrls: ['./bot-management.component.css']
})
export class BotManagementComponent implements OnInit {
  bots = BOTS;
  showDetails = false;
  constructor() { }

  ngOnInit() {
}

}
