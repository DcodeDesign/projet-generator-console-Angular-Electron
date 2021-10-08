import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../config/config';
import {Boards} from '../models/Boards';

@Injectable({
    providedIn: 'root'
})
export class BoardsService implements OnDestroy{

    constructor(private http: HttpClient) {
    }

    /* https://api.trello.com/1/members/me/boards?key=${this.key}&token=${this.token} */

    public getBoards(): Observable<Boards[]> {
        return new Observable(observer => {
                let getSub = this.http.get<Boards[]>(
                    Config.BOARDS_TRELLO()
                ).subscribe(
                    success => {
                        let tab: Boards[] = [];
                        for(let i = 0; i < success.length; i++){
                            tab.push(new Boards().deserialize(success[i]));
                        }
                        observer.next(tab);
                    },
                    error => {
                        observer.error(error);
                    },
                    () => {
                        setTimeout(() => {
                            if (getSub != null && !getSub.closed) {
                                getSub.unsubscribe();
                            }
                        }, 0);
                    }
                );
        });
    }

    ngOnDestroy(): void {
    }

}
