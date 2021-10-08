import {Component, Injectable, Input, OnInit} from '@angular/core';
import {ConnectionService} from 'ng-connection-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

@Injectable({
    providedIn: 'root'
})
export class AppComponent implements OnInit {

    titleView: string = "";
    isConnected: boolean = true;

    constructor(private connectionService: ConnectionService) {

    }

    ngOnInit(): void {
        this.initialize();
    }

    initialize() {
        console.log('App Start');

        this.connectionService.monitor().subscribe(Connected => {
            this.isConnected = Connected;
        });
    }

    receiptTitleView($event) {
        this.titleView = $event;
    }

}
