import { createActionGroup, props } from '@ngrx/store';
import { Card, CreateCardParams } from '../services/db.service';

export const LibraryActions = createActionGroup({
  source: 'Library',
  events: {
    'Create Card': props<{ card: CreateCardParams }>(),
    Increment: props<{ card: Card }>(),
    Decrement: props<{ card: Card }>(),
  },
});
