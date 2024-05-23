import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDeckOfCards } from './global-state';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-deck',
  standalone: true,
  template: `
    <h2>Deck</h2>
    <div class="cards">
      @for (card of deck(); track $index) {
      <app-card [card]="card" [hideControls]="true"></app-card>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.12);
        min-height: 100vh;
      }

      .cards {
        display: flex;
        flex-direction: column-reverse;
      }

      app-card:not(:first-child) {
        margin-bottom: -260px;
      }
    `,
  ],
  imports: [CardComponent],
})
export class DeckComponent {
  store = inject(Store);
  deck = this.store.selectSignal(selectDeckOfCards);
}
