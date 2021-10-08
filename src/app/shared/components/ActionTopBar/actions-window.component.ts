import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-actions-window',
    templateUrl: './actions-window.component.html',
    styleUrls: ['./actions-window.component.scss']
})
export class ActionsWindowComponent implements OnInit {
    titleApp: string = 'Generator console';
    title: string = 'Home';
    @Input() titleView: string;
    @Input() isConnected: boolean;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {

    }

}
