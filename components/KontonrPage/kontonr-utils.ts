import { generateUniqueStringList, getMod11ControlDigit, getRandomDigitsFromTemplate } from '../utils';

const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
const validationRegExp = new RegExp('[0-9]{11}');

export const generateKontonr = (template?: string) => {
    let randomDigits = [];
    let controlDigit: number | 'invalid' = 'invalid';

    while (controlDigit === 'invalid') {
        randomDigits = getRandomDigitsFromTemplate(template || '**********');
        controlDigit = getMod11ControlDigit(randomDigits, weights);
    }

    return [...randomDigits, controlDigit].join('');
};

export const padWithWildcards = (str: string, length: number): string => {
    let strCopy = `${str}`;
    for (let i = str.length; i < length; i++) {
        strCopy += '*';
    }
    return strCopy;
};

export const generateUniqueKontonrList = (length, template) =>
    generateUniqueStringList(length, () => generateKontonr(template));
