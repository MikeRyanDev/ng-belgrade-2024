import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromLibrary from './library.reducer';

export interface State {
  library: fromLibrary.State;
}

export const reducers: ActionReducerMap<State> = {
  library: fromLibrary.reducer,
};

/**
 * Select Library State
 */
export const selectLibraryState = (state: State) => state.library;
export const selectAllCards = createSelector(
  selectLibraryState,
  fromLibrary.selectAll
);
export const selectDeckOfCards = createSelector(
  selectLibraryState,
  fromLibrary.selectDeck
);

export * as LibraryEffects from './library.effects';
