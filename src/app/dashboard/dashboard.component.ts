import { Component, OnInit } from '@angular/core';
import { BOTS } from '../bot-testing-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bots = BOTS;

  constructor() { }

  ngOnInit() {
  }

}
