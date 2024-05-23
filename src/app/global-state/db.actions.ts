import { createActionGroup, props } from '@ngrx/store';
import { Card } from '../services/db.service';

export const DBActions = createActionGroup({
  source: 'DB',
  events: {
    'Get All': props<{ cards: Card[] }>(),
    'Save Success': props<{ card: Card }>(),
  },
});
