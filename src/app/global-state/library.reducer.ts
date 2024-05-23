import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on } from '@ngrx/store';
import { Card } from '../services/db.service';
import { DBActions } from './db.actions';
import { LibraryActions } from './library.actions';

export interface State extends EntityState<Card> {}

const adapter = createEntityAdapter<Card>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const reducer = createReducer(
  adapter.getInitialState(),
  on(DBActions.getAll, (state, { cards }) => adapter.setAll(cards, state)),
  on(DBActions.saveSuccess, (state, { card }) => adapter.addOne(card, state)),
  on(LibraryActions.increment, (state, { card }) =>
    adapter.updateOne(
      { id: card.id, changes: { count: card.count + 1 } },
      state
    )
  ),
  on(LibraryActions.decrement, (state, { card }) =>
    adapter.updateOne(
      { id: card.id, changes: { count: Math.max(0, card.count - 1) } },
      state
    )
  )
);

export const { selectAll } = adapter.getSelectors();
export const selectDeck = createSelector(selectAll, (cards) =>
  cards.flatMap((card) => new Array(card.count).fill(card))
);
