const { getOptimalTurn, checkWinner } = require('../../src/index');

describe('Tic-Tac-Toe AI Library', () => {
  describe('checkWinner', () => {
    test('should detect horizontal win for X', () => {
      const field = [1, 1, 1, -1, -1, -1, -1, -1, -1];
      expect(checkWinner(field)).toBe(1);
    });
    
    test('should detect vertical win for O', () => {
      const field = [0, -1, -1, 0, -1, -1, 0, -1, -1];
      expect(checkWinner(field)).toBe(0);
    });
    
    test('should return null for no winner', () => {
      const field = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
      expect(checkWinner(field)).toBeNull();
    });
  });
  
  describe('getOptimalTurn', () => {
    test('should take winning move for X', () => {
      const field = [1, 1, -1, -1, -1, -1, -1, -1, -1];
      expect(getOptimalTurn(field, 1)).toBe(2);
    });
    
    test('should block winning move for O', () => {
      const field = [0, 0, -1, -1, -1, -1, -1, -1, -1];
      expect(getOptimalTurn(field, 1)).toBe(2);
    });
    
    test('should take center when available', () => {
      const field = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
      expect(getOptimalTurn(field, 0)).toBe(4);
    });
    
    test('should take corner when center is taken', () => {
      const field = [-1, -1, -1, -1, 1, -1, -1, -1, -1];
      expect(getOptimalTurn(field, 0)).toBe(0);
    });
    
    test('should throw error for invalid field', () => {
      expect(() => getOptimalTurn([1, 2, 3], 0)).toThrow();
    });
    
    test('should throw error for invalid player', () => {
      expect(() => getOptimalTurn(new Array(9).fill(-1), 2)).toThrow();
    });
    
    test('example from assignment', () => {
      const field = [-1, -1, -1, 1, 1, -1, 0, 0, -1];
      expect(getOptimalTurn(field, 0)).toBe(5);
    });
  });
});