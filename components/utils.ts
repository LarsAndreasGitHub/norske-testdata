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
}