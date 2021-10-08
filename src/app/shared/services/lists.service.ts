import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../config/config';
import {Lists} from '../models/Lists';

@Injectable({
    providedIn: 'root'
})
export class ListsService implements OnDestroy {

    constructor(private http: HttpClient) {
    }

    /* https://api.trello.com/1/boards/55200f66d04ffeb49383643b/lists?key=${this.key}&token=${this.token} */

    public getLists(idBoard: string): Observable<Lists[]> {
        return new Observable(observer => {
                let getSub = this.http.get<Lists[]>(
                    Config.LISTS_TRELLO(idBoard)
                ).subscribe(
                    success => {
                        let tab: Lists[] = [];
                        for (let i = 0; i < success.length; i++) {
                            tab.push(new Lists().deserialize(success[i]));
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
