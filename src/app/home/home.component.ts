import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    pageTitle = 'Dota 2 Bot Scripting - Home';

    constructor(private title: Title) {
        this.title.setTitle(this.pageTitle);
    }

    ngOnInit() { }

}
