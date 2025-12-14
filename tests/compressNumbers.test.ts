import { compressNumbers } from '../src/compressNumbers';

describe('compressNumbers', () => {
    it.each([
        { name: 'empty array', input: [], expected: [] },
        { name: 'single element', input: [5], expected: [5] },
        { name: 'already compressed', input: [1, 2, 3], expected: [1, 2, 3] },

        { name: 'removes consecutive duplicates (simple)', input: [1, 1, 2, 2, 3], expected: [1, 2, 3] },
        { name: 'keeps non-consecutive duplicates', input: [1, 2, 1], expected: [1, 2, 1] },
        { name: 'duplicates at start', input: [9, 9, 1, 2], expected: [9, 1, 2] },
        { name: 'duplicates at end', input: [1, 2, 7, 7, 7], expected: [1, 2, 7] },
        { name: 'multiple duplicate blocks', input: [1, 1, 2, 3, 3, 2, 2, 2, 4], expected: [1, 2, 3, 2, 4] },

        { name: 'negative numbers', input: [-1, -1, 0, 0, -1], expected: [-1, 0, -1] },
        { name: 'floats', input: [1.1, 1.1, 1.2, 1.2, 1.1], expected: [1.1, 1.2, 1.1] }
    ])('$name', ({ input, expected }) => {
        const result = compressNumbers(input);
        expect(result).toEqual(expected);
    });

    it('does not mutate input array', () => {
        const input = [1, 1, 2, 2, 3];
        const snapshot = [...input];

        compressNumbers(input);

        expect(input).toEqual(snapshot);
    });

    it('returns a new array instance', () => {
        const input = [1, 1, 2];
        const result = compressNumbers(input);

        expect(result).not.toBe(input);
    });
});
