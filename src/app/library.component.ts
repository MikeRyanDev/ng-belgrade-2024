import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LibraryStore } from './library.store';
import { CreateCardComponent } from './create-card.component';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-library',
  standalone: true,
  template: `
    <h2>Library</h2>

    <div class="cards">
      @for (card of store.allCards(); track card.id) {
      <app-card
        [card]="card"
        (increment)="store.increment(card)"
        (decrement)="store.decrement(card)"
      ></app-card>
      }
    </div>

    <button mat-fab color="primary" (click)="store.openCreateCardDialog()">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: [
    `
      :host {
        padding: 0 24px 24px 24px;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 16px;
      }

      button {
        position: fixed;
        right: 16px;
        bottom: 16px;
      }
    `,
  ],
  imports: [CreateCardComponent, MatButtonModule, MatIconModule, CardComponent],
  providers: [LibraryStore],
})
export class LibraryComponent {
  store = inject(LibraryStore);
}
