import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map, catchError } from 'rxjs/operators';
import { Task } from './../../tasks/models/task';
import { Pomo } from './../../tasks/models/pomo';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class PomodoistService {
    tasks: Array<Task> = [];
    collectionsUrl = 'https://api.mongolab.com/api/1/databases/pomodoist/collections';
    apiKey = 'KMf8fEu_Yw2AxXSYeTTMAyJu2m6zTLJi';
    params = '?apiKey=' + this.apiKey;

    constructor(public http: HttpClient) {
    }

    getAllTasks(): Observable<Task[]> {
      return fromPromise<Task[]>(this.http.get<Task[]>(this.collectionsUrl + '/tasks' + this.params))
    }

    getAllPomos(): Observable<Pomo[]> {
      return fromPromise<Pomo[]>(this.http.get<Pomo[]>(this.collectionsUrl + '/pomos' + this.params))
    }

    addTask(task: Task) {
      return this.http.post(this.collectionsUrl + '/tasks' + this.params, task);
    }

    addPomo(pomo: Pomo) {
      return this.http.post(this.collectionsUrl + '/pomos' + this.params, pomo);
    }


}
