import { generateUniqueStringList } from '../tmp-utils';
import { orgnrExistsInBrreg } from './brreg-api';
import { getMod11ControlDigit, getRandomDigits } from '../utils';

const weights = [3, 2, 7, 6, 5, 4, 3, 2];

export const getOrgnrControlDigit = (first8DigitsInOrgnr: number[]): number | 'invalid' => {
    return getMod11ControlDigit(first8DigitsInOrgnr, weights);
};

export const generateOrgnr = () => {
    let randomDigits = [];
    let controlDigit: number | 'invalid' = 'invalid';

    while (controlDigit === 'invalid') {
        randomDigits = getRandomDigits(8);
        controlDigit = getMod11ControlDigit(randomDigits, weights);
    }

    return [...randomDigits, controlDigit].reduce((a, b) => `${a}${b}`, '');
};

export const generateUniqueOrgnrList = (length) => generateUniqueStringList(length, generateOrgnr);

export const generateUnusedOrgnr = async () => {
    let i = 0;
    while (true) {
        if (i > 10000) throw new Error('Infinite loop');
        const orgnr = generateOrgnr();
        if ((await orgnrExistsInBrreg(orgnr)) === false) {
            return orgnr;
        }
    }
};
