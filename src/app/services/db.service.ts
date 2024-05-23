import { Injectable } from '@angular/core';
import { Observable, concatMap } from 'rxjs';
import * as uuid from 'uuid';

export interface Card {
  id: string;
  title: string;
  description: string;
  count: number;
  imageUrl: string;
}

export type CreateCardParams = Omit<Card, 'id'>;

@Injectable({ providedIn: 'root' })
export class DBService {
  open() {
    return new Observable<IDBDatabase>((observer) => {
      const request = indexedDB.open('cards', 1);

      request.onupgradeneeded = () => {
        const db = request.result;
        const store = db.createObjectStore('cards', { keyPath: 'id' });
        store.createIndex('title', 'title', { unique: false });
        store.createIndex('description', 'description', { unique: false });
        store.createIndex('imageUrl', 'imageUrl', { unique: false });
        store.createIndex('count', 'count', { unique: false });
      };

      request.onsuccess = () => {
        const db = request.result;
        observer.next(db);
        observer.complete();
      };
    });
  }

  create(cardCreateParams: CreateCardParams) {
    const card: Card = {
      id: uuid.v4(),
      ...cardCreateParams,
    };

    return this.open().pipe(
      concatMap((db) => {
        return new Observable<Card>((observer) => {
          const transaction = db.transaction('cards', 'readwrite');
          const store = transaction.objectStore('cards');
          const request = store.add(card);
          request.onsuccess = (event) => {
            observer.next(card);
            observer.complete();
          };
          request.onerror = (event) => {
            observer.error(request.error);
          };
        });
      })
    );
  }

  getAll() {
    return this.open().pipe(
      concatMap((db) => {
        return new Observable<Card[]>((observer) => {
          const transaction = db.transaction('cards', 'readonly');
          const store = transaction.objectStore('cards');
          const request = store.getAll();
          request.onsuccess = (event) => {
            observer.next(request.result);
            observer.complete();
          };
          request.onerror = (event) => {
            observer.error(request.error);
          };
        });
      })
    );
  }

  getOne(id: string): Observable<Card> {
    return this.open().pipe(
      concatMap((db) => {
        return new Observable<Card>((observer) => {
          const transaction = db.transaction('cards', 'readonly');
          const store = transaction.objectStore('cards');
          const request = store.get(id);
          request.onsuccess = (event) => {
            observer.next(request.result);
            observer.complete();
          };
          request.onerror = (event) => {
            observer.error(request.error);
          };
        });
      })
    );
  }

  update(card: Card) {
    return this.open().pipe(
      concatMap((db) => {
        return new Observable<void>((observer) => {
          const transaction = db.transaction('cards', 'readwrite');
          const store = transaction.objectStore('cards');
          const request = store.put(card);
          request.onsuccess = (event) => {
            observer.next();
            observer.complete();
          };
          request.onerror = (event) => {
            observer.error(request.error);
          };
        });
      })
    );
  }

  delete(id: string) {
    return this.open().pipe(
      concatMap((db) => {
        return new Observable<void>((observer) => {
          const transaction = db.transaction('cards', 'readwrite');
          const store = transaction.objectStore('cards');
          const request = store.delete(id);
          request.onsuccess = (event) => {
            observer.next();
            observer.complete();
          };
          request.onerror = (event) => {
            observer.error(request.error);
          };
        });
      })
    );
  }

  incrementCount(id: string) {
    return this.getOne(id).pipe(
      concatMap((card) => {
        return this.update({
          ...card,
          count: card.count + 1,
        });
      })
    );
  }

  decrementCount(id: string) {
    return this.getOne(id).pipe(
      concatMap((card) => {
        return this.update({
          ...card,
          count: Math.max(0, card.count - 1),
        });
      })
    );
  }
}
