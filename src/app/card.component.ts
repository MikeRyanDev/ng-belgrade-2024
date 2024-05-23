import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Card } from './services/db.service';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <img [src]="card().imageUrl" />

    @if (!hideControls()) {
    <div class="cardActions">
      <div class="countControls">
        <button type="button" (click)="decrement.emit()">
          <mat-icon [inline]="true">remove</mat-icon>
        </button>
        <span>{{ card().count }}</span>
        <button type="button" (click)="increment.emit()">
          <mat-icon [inline]="true">add</mat-icon>
        </button>
      </div>
    </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        max-width: 180px;
        position: relative;
      }

      img {
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
      }

      .cardActions {
        opacity: 0;
        position: absolute;
        top: 8px;
        right: 8px;
        transition: opacity 0.2s;
      }

      :host:hover .cardActions {
        opacity: 1;
      }

      .countControls {
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
        background-color: #1d1b1e;
      }

      .countControls button {
        background-color: transparent;
        outline: none;
        border: none;
        height: 32px;
        line-height: 30px;
        padding: 0 8px;
        vertical-align: middle;
        cursor: pointer;
        color: white;
      }

      .countControls span {
        padding: 0 8px;
        font-size: 12px;
        font-weight: bold;
        height: 32px;
        line-height: 32px;
        vertical-align: middle;
        color: white;
      }
    `,
  ],
  imports: [MatIconModule],
})
export class CardComponent {
  card = input.required<Card>();
  hideControls = input(false);
  decrement = output();
  increment = output();
}
