import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-walkthrough',
    templateUrl: './walkthrough.component.html',
    styleUrls: ['./walkthrough.component.scss'],
})

export class WalkthroughComponent implements OnInit {
    pageTitle = 'Dota 2 Bot Configurator - Walkthrough';
    linuxURL = '../../assets/InstallerScripts/Linux/DBC_Linux_installer.zip';
    macURL = '../../assets/InstallerScripts/Mac/DBC_Mac_Installer.zip';
    windowsURL = '../../assets/InstallerScripts/Windows/DBC_Windows_Installer.zip';

    constructor(private title: Title) {
        this.title.setTitle(this.pageTitle);
    }

    ngOnInit() { }

    scroll(element) {
        element.scrollIntoView();
    }

}
