import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs';
import { DBService } from '../services/db.service';
import { LibraryActions } from './library.actions';
import { DBActions } from './db.actions';

export const getAll = createEffect(
  (db = inject(DBService)) => {
    return db.getAll().pipe(map((cards) => DBActions.getAll({ cards })));
  },
  { functional: true }
);

export const saveCard = createEffect(
  (actions = inject(Actions), db = inject(DBService)) => {
    return actions.pipe(
      ofType(LibraryActions.createCard),
      concatMap((action) => {
        return db
          .create(action.card)
          .pipe(map((card) => DBActions.saveSuccess({ card })));
      })
    );
  },
  { functional: true }
);

export const incrementOrDecrementCard = createEffect(
  (actions = inject(Actions), db = inject(DBService)) => {
    return actions.pipe(
      ofType(LibraryActions.increment, LibraryActions.decrement),
      concatMap((action) => {
        if (action.type === LibraryActions.increment.type) {
          return db.incrementCount(action.card.id);
        }

        return db.decrementCount(action.card.id);
      })
    );
  },
  { functional: true, dispatch: false }
);
