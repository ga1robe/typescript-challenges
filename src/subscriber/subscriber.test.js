import { test, expect, vi } from 'vitest';
import { db } from './subscriber';

test('db powinien mieć metody subscribe, unsubscribe i publish', () => {
  expect(db).toHaveProperty('subscribe');
  expect(db).toHaveProperty('unsubscribe');
  expect(db).toHaveProperty('publish');
});

test('db.subscribe powinien dodawać callback do listy subskrybentów', () => {
  const event = 'usersCreated';
  const callback = vi.fn();
  db.subscribe(event, callback);
  db.publish(event, [{ id: 1, firstName: 'Jan', lastName: 'Kowalski' }]);
  expect(callback).toHaveBeenCalledWith([
    { id: 1, firstName: 'Jan', lastName: 'Kowalski' },
  ]);
});

test('db.unsubscribe powinien usuwać callback z listy subskrybentów', () => {
  const event = 'articlesUpdated';
  const callback = vi.fn();
  db.subscribe(event, callback);
  db.unsubscribe(event, callback);
  db.publish(event, [{ id: 1, title: 'Tytuł', content: 'Treść' }]);
  expect(callback).not.toHaveBeenCalled();
});

test('db.publish powinien wywoływać wszystkie zarejestrowane callbacki dla danego eventu', () => {
  const event = 'photosDeleted';
  const callback1 = vi.fn();
  const callback2 = vi.fn();
  db.subscribe(event, callback1);
  db.subscribe(event, callback2);
  db.publish(event, [{ id: 1, url: 'http://example.com/photo.jpg' }]);
  expect(callback1).toHaveBeenCalledWith([
    { id: 1, url: 'http://example.com/photo.jpg' },
  ]);
  expect(callback2).toHaveBeenCalledWith([
    { id: 1, url: 'http://example.com/photo.jpg' },
  ]);
});
