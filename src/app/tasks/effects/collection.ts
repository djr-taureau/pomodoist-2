import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { PomodoistService } from '../../core/services/pomodoist';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { Load } from './../actions/task';
import {
  CollectionActions,
  LoadFail,
  LoadSuccess,
  AddTaskSuccess,
  AddTaskFail,
  CollectionActionTypes,
  RemoveTask,
  RemoveTaskFail,
  RemoveTaskSuccess,
  AddTask,
  LoadPomos,
  LoadPomosSuccess,
  LoadPomosFail
} from './../actions/collection';
import { Task } from '../models/task';
import { Pomo } from '../models/pomo';
import { switchMap, toArray, map, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class CollectionEffects {

  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('tasks_app');
  });

  @Effect()
  loadCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.Load),
    switchMap(() =>
      this.pomodo
        .getAllTasks()
        .pipe(
          // toArray(),
          map((tasks: Task[]) => new LoadSuccess(tasks)),
          catchError(error => of(new LoadFail(error)))
        )
    )
  );

  @Effect()
  addTaskToCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.AddTask),
    map((action: AddTask) => action.payload),
    mergeMap(task =>
      this.pomodo
        .addTask(task)
        .pipe(
          map(() => new AddTaskSuccess(task)),
          catchError(() => of(new AddTaskFail(task)))
        )
    )
  );

  @Effect()
  removeTaskFromCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.RemoveTask),
    map((action: RemoveTask) => action.payload),
    mergeMap(task =>
      this.db
        .executeWrite('tasks', 'delete', [task.id])
        .pipe(
          map(() => new RemoveTaskSuccess(task)),
          catchError(() => of(new RemoveTaskFail(task)))
        )
    )
  );

  constructor(private actions$: Actions, private db: Database, private pomodo: PomodoistService) {}
}

