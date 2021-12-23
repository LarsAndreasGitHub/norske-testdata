import { generateUniqueStringList } from '../tmp-utils';
import { getMod11ControlDigit, getRandomDigits } from '../utils';

const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
const validationRegExp = new RegExp('[0-9]{11}');

export const generateKontonr = () => {
    let randomDigits = [];
    let controlDigit: number | 'invalid' = 'invalid';

    while (controlDigit === 'invalid') {
        randomDigits = getRandomDigits(10);
        controlDigit = getMod11ControlDigit(randomDigits, weights);
    }

    return [...randomDigits, controlDigit].join('');
};

export const generateUniqueKontonrList = (length) => generateUniqueStringList(length, generateKontonr);