import { Component } from '@angular/core';
import { LibraryComponent } from './library.component';
import { DeckComponent } from './deck.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-library></app-library>
    <app-deck></app-deck>
  `,
  styles: [
    `
      :host {
        display: grid;
        grid-template-columns: 1fr 240px;
      }
    `,
  ],
  imports: [LibraryComponent, DeckComponent],
})
export class AppComponent {}
