import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiConnectService } from '../services/api-connect.service';

@Component(
    {
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss'],
    },
)
export class HomeComponent implements OnInit {
    pageTitle = 'Dota 2 Bot Scripting - Home';

    constructor(private title: Title, private api: ApiConnectService) {
        this.title.setTitle(this.pageTitle);
    }

    ngOnInit() { }

    test() {
        this.api.test().subscribe(
            (res) => {
                console.log(res);
            },
        );
    }
}

export default 'HomeComponent';
