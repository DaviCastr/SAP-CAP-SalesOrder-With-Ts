import { describe, expect, it } from 'vitest';

describe('Sum tes cases', () => {
    it('should sum two numbers and return its result', () => {
        const sum = 1 + 1;
        const expectedResult = 2;
        expect(sum).toBe(expectedResult);
    });
});
