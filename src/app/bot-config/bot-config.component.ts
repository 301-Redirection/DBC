import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-bot-config',
  templateUrl: './bot-config.component.html',
  styleUrls: ['./bot-config.component.css']
})
export class BotConfigComponent implements OnInit {

  pageTitle = 'Dota 2 Bot Scripting - Configuration'; 
 
  constructor(private title: Title) {  
    this.title.setTitle(this.pageTitle); 
  } 

  ngOnInit() {
  }

}
