export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
}

export interface Photo {
  id: number;
  url: string;
}

export type CRUDEvent = 'created' | 'read' | 'updated' | 'deleted';

interface Database {
  users: User[];
  articles: Article[];
  photos: Photo[];
}

export type EventType = `${keyof Database}${Capitalize<CRUDEvent>}`;

export interface SubscribableDatabase<T> {
  subscribe<K extends keyof T>(
    event: `${K & string}${Capitalize<CRUDEvent>}`,
    callback: (data: T[K]) => void
  ): void;
  unsubscribe<K extends keyof T>(
    event: `${K & string}${Capitalize<CRUDEvent>}`,
    callback: (data: T[K]) => void
  ): void;
  publish<K extends keyof T>(
    event: `${K & string}${Capitalize<CRUDEvent>}`,
    data: T[K]
  ): void;
}

class DatabaseImpl implements SubscribableDatabase<Database> {
  private subscribers: Record<string, Array<(data: any) => void>> = {};

  subscribe<K extends keyof Database>(
    event: `${K}${Capitalize<CRUDEvent>}`,
    callback: (data: Database[K]) => void
  ): void {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  unsubscribe<K extends keyof Database>(
    event: `${K}${Capitalize<CRUDEvent>}`,
    callback: (data: Database[K]) => void
  ): void {
    if (this.subscribers[event]) {
      this.subscribers[event] = this.subscribers[event].filter(
        (cb) => cb !== callback
      );
    }
  }

  publish<K extends keyof Database>(
    event: `${K}${Capitalize<CRUDEvent>}`,
    data: Database[K]
  ): void {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach((callback) => callback(data));
    }
  }
}

export const db: SubscribableDatabase<Database> = new DatabaseImpl();

db.subscribe<'users'>('usersCreated', (users) => {});
db.subscribe<'articles'>('articlesRead', (articles) => {});
