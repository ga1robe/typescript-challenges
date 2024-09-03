import { test, expect } from 'vitest';
import {
  filterByProperty,
  filteredBooksByAuthor,
  filteredVideosByLength,
} from './type-operator';

test('should return 1 book authored by Philip K. Dick', () => {
  // expect(filteredBooksByAuthor.length).toBe(1);
  expect(filteredBooksByAuthor.author).toString('Philip K. Dick').length;
});

test('should return only some specific videos', () => {
  expect(filteredVideosByLength.length);
});
