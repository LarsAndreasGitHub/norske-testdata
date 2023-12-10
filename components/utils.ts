import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const formatDayjs = dayjs;

export const classNames = (...names: (string | undefined | null)[]): string => {
    return names
        .filter((name) => !!name)
        .filter((name) => name.length > 0)
        .join(' ');
};

const digitSum = (n: number): number =>
    `${n}`
        .split('')
        .map((it) => Number.parseInt(it))
        .reduce((a, b) => a + b, 0);

export const getMod10ControlDigit = (digits: number[]): number => {
    const reversedDigits = [...digits];
    reversedDigits.reverse();
    const weightedDigitSum = reversedDigits
        .map((digit, index) => digit * (1 + ((index + 1) % 2))) // corresponds to weights [2, 1, 2, 1, ...]
        .map((it) => digitSum(it))
        .reduce((a, b) => a + b, 0);
    const lastDigitOfSum = weightedDigitSum % 10;
    return lastDigitOfSum === 0 ? 0 : 10 - lastDigitOfSum;
};

export const getMod11ControlDigit = (digits: number[], weights: number[]): number | 'invalid' => {
    if (digits.length !== weights.length) {
        console.warn('Digit array not same length as weights array, results may vary');
    }

    const weigthedSumMod11 = digits.map((siffer, index) => siffer * weights[index]).reduce((a, b) => a + b, 0) % 11;

    const controlDigit = 11 - weigthedSumMod11;
    if (controlDigit === 11) {
        return 0;
    }
    if (controlDigit === 10) {
        return 'invalid';
    }
    return controlDigit;
};

const mod11BaseWeightsReversed = [2, 3, 4, 5, 6, 7]
export const getMod11ControlDigitAutoWeights = (digits: number[]): number | 'invalid' => {
    const weights = [];
    for (let i = 0; i < digits.length; i++) {
        weights.push(mod11BaseWeightsReversed[i % mod11BaseWeightsReversed.length]);
    }
    weights.reverse();
    return getMod11ControlDigit(digits, weights);
};

export const getRandomInt = (max): number => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const getRandomDigits = (amount: number): number[] => {
    const digits = [];
    for (let i = 0; i < amount; i++) {
        digits.push(getRandomInt(10));
    }
    return digits;
};

export const getRandomDigitsFromTemplate = (template: string): number[] => {
    const digits = [];
    for (let i = 0; i < template.length; i++) {
        const numberOrWildcard = parseInt(template.charAt(i));
        if (isNaN(numberOrWildcard)) {
            digits.push(getRandomInt(10));
        } else {
            digits.push(numberOrWildcard);
        }
    }
    return digits;
};

export const getRandomDate = (minDate: Date, maxDate: Date) => {
    const randomDate = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
    const dayJSDate = dayjs(randomDate);

    if (!dayJSDate.isValid()) {
        throw new Error('Dato er ikke gyldig: ' + dayJSDate);
    }
    return dayJSDate;
};

export const removeDuplicates = (listOfStrings: string[]) => {
    const seen = {};
    return listOfStrings.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
};

export const generateUniqueStringList = (length: number, generator: () => string): string[] => {
    if (length === 0) {
        return [];
    }

    let list = [];
    for (let i = 0; i < length; i++) {
        list.push(generator());
    }

    const uniqueStrings = removeDuplicates(list);

    for (let i = uniqueStrings.length; i < length; i++) {
        let newString = generator();
        let j = 0;
        while (uniqueStrings.includes(newString)) {
            if (j > 10000) throw new Error('Infinite loop');
            newString = generator();
        }
        uniqueStrings.push(newString);
    }

    return uniqueStrings;
};