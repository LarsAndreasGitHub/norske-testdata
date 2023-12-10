import {
    generateUniqueStringList,
    getMod10ControlDigit,
    getMod11ControlDigitAutoWeights,
    getRandomDigits,
} from '../utils';

export const generateKIDnr = (length: number, mode: 'mod10' | 'mod11') => {
    if (mode === 'mod11') {
        let randomDigits = [];
        let controlDigit: number | 'invalid' = 'invalid';

        while (controlDigit === 'invalid') {
            randomDigits = getRandomDigits(length - 1);
            controlDigit = getMod11ControlDigitAutoWeights(randomDigits);
        }

        return [...randomDigits, controlDigit].join('');
    } else {
        const randomDigits = getRandomDigits(length - 1);
        const controlDigit = getMod10ControlDigit(randomDigits);

        return [...randomDigits, controlDigit].join('');
    }
};

export const padWithWildcards = (str: string, length: number): string => {
    let strCopy = `${str}`;
    for (let i = str.length; i < length; i++) {
        strCopy += '*';
    }
    return strCopy;
};

export const generateUniqueKIDnrList = (listSize: number, kidnrLength: number, mode: 'mod10' | 'mod11') =>
    generateUniqueStringList(listSize, () => generateKIDnr(kidnrLength, mode));
