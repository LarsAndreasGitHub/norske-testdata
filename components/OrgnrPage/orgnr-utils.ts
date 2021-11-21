import { generateUniqueStringList } from '../tmp-utils';
import { orgnrExistsInBrreg } from './brreg-api';

const weigths = [3, 2, 7, 6, 5, 4, 3, 2];
const validationRegExp = new RegExp('[0-9]{9}');

export const getControlDigit = (first8DigitsInOrgnr: number[]): number | 'invalid' => {
    const weigthedSumMod11 =
        first8DigitsInOrgnr
            .slice(0, 8)
            .map((siffer, index) => siffer * weigths[index])
            .reduce((a, b) => a + b, 0) % 11;

    const controlDigit = 11 - weigthedSumMod11;
    if (controlDigit === 11) {
        return 0;
    }
    if (controlDigit === 10) {
        return 'invalid';
    }
    return controlDigit;
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const get8RandomDigits = () => {
    const digits = [];
    for (let i = 0; i < 8; i++) {
        digits.push(getRandomInt(10));
    }
    return digits;
};

const validateOrgnr = (orgnr) => {
    if (!validationRegExp.test(orgnr)) {
        return false;
    }

    const orgnrAsDigits = orgnr.split('').map((digitStr) => parseInt(digitStr));
    const controlDigit = getControlDigit(orgnrAsDigits);
    return controlDigit === orgnrAsDigits[8];
};

export const generateOrgnr = () => {
    let randomDigits = [];
    let controlDigit: number | 'invalid' = 'invalid';

    while (controlDigit === 'invalid') {
        randomDigits = get8RandomDigits();
        controlDigit = getControlDigit(randomDigits);
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
