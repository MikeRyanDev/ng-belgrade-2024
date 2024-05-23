import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Store } from '@ngrx/store';
import { concatMap, map, pipe, tap } from 'rxjs';
import { CreateCardComponent } from './create-card.component';
import { Card, CreateCardParams } from './services/db.service';
import { LibraryActions } from './global-state/library.actions';
import { selectAllCards } from './global-state';

export interface LibraryState {
  hasCreateCardDialogOpen: boolean;
}

const initialState: LibraryState = {
  hasCreateCardDialogOpen: false,
};

export const LibraryStore = signalStore(
  withState(initialState),
  withComputed((localStore, globalStore = inject(Store)) => ({
    allCards: globalStore.selectSignal(selectAllCards),
  })),
  withMethods(
    (localStore, globalStore = inject(Store), dialog = inject(MatDialog)) => ({
      increment: (card: Card) => {
        globalStore.dispatch(LibraryActions.increment({ card }));
      },
      decrement: (card: Card) => {
        globalStore.dispatch(LibraryActions.decrement({ card }));
      },
      openCreateCardDialog: rxMethod<void>(
        pipe(
          tap(() => patchState(localStore, { hasCreateCardDialogOpen: true })),
          concatMap(() =>
            dialog
              .open<CreateCardComponent, any, CreateCardParams>(
                CreateCardComponent
              )
              .afterClosed()
          ),
          tap((card) => {
            patchState(localStore, { hasCreateCardDialogOpen: false });
            if (card) {
              globalStore.dispatch(LibraryActions.createCard({ card }));
            }
          })
        )
      ),
    })
  )
);
