import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-walkthrough',
    templateUrl: './walkthrough.component.html',
    styleUrls: ['./walkthrough.component.scss'],
})

export class WalkthroughComponent implements OnInit {
    pageTitle = 'Dota 2 Bot Configurator - Walkthrough';
    linuxURL = '../../assets/InstallerScripts/Linux/DBC_Linux_Installer.zip';
    macURL = '../../assets/InstallerScripts/Mac/DBC_Mac_Installer.zip';
    windowsURL = '../../assets/InstallerScripts/Windows/DBC_Windows_Installer.zip';
    linuxCheckSum = '6ec79af3e11d5ac664975e5e32b70755';
    macCheckSum = 'c72182adc525e304e0cb5d3ffefc4d6a';
    windowsCheckSum = '1d0dc15fdffb6d4746edb84e4f7a4c64';

    constructor(private title: Title) {
        this.title.setTitle(this.pageTitle);
    }

    ngOnInit() { }

    scroll(element) {
        element.scrollIntoView();
    }

}
