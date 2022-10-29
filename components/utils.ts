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
