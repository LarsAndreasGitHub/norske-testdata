import { getMod10ControlDigit, getMod11ControlDigitAutoWeights } from '../utils';

describe('test control digit algorithms for kid nrs', () => {
    test('mod10', () => {
        expect(getMod10ControlDigit([1, 2, 3, 4, 5, 6, 7, 8])).toEqual(2);
    });
    test('mod11', () => {
        expect(getMod11ControlDigitAutoWeights([1, 2, 3, 4, 5, 6, 7, 8])).toEqual(5);
    });
});
