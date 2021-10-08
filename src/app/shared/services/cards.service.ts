import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lists} from '../models/Lists';
import {Config} from '../config/config';
import {Cards} from '../models/Cards';

@Injectable({
    providedIn: 'root'
})
export class CardsService implements OnDestroy {

    constructor(private http: HttpClient) {
    }

    public getCards(idBoard: string): Observable<Cards[]> {
        return new Observable(observer => {
                let getSub = this.http.get<Cards[]>(
                    Config.CARDS_TRELLO(idBoard)
                ).subscribe(
                    success => {
                        let tab: Cards[] = [];
                        for (let i = 0; i < success.length; i++) {
                            tab.push(new Cards().deserialize(success[i]));
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
