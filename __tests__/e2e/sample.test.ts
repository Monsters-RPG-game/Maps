import { describe, expect, it } from '@jest/globals';

describe('Sample', () => {
  describe('Should throw', () => {
    it('Sample', async () => {
      expect(2+2).toEqual(4);
    });
  });

  describe('Should pass', () => {
    it('Sample', async () => {
      expect(2+2).toEqual(4)
    });
  });
});
