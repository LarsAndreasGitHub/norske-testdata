import { generateUniqueStringList, getRandomDate } from '../utils';
import { Dayjs } from 'dayjs';
import { getKontrollsifre, getRandomIndividnrString } from '../FnrPage/fnr-utils';

export interface FakeFnrConfig {
    addToMonths?: number;
    addToDays?: number;
}

export const generateFakeFnr = (config: FakeFnrConfig): string => {
    const dayJSDate = getRandomDate(new Date('1900-01-01'), new Date('2002-12-31'));
    return generateFakeFnrFromDate(dayJSDate, config);
};

const generateFakeFnrFromDate = (date: Dayjs, config: FakeFnrConfig): string => {
    const fakeBirthDateString = getFakeBirthDateString(date, config);
    let i = 0;
    while (true) {
        i++;
        if (i > 10000) throw new Error('Infinite loop');
        const individnrStr = getRandomIndividnrString(date.format('YYYY'));
        const kontrollsifre = getKontrollsifre(fakeBirthDateString, individnrStr);
        if (kontrollsifre.length === 2) {
            return [fakeBirthDateString, individnrStr, kontrollsifre].join('');
        }
    }
};

const getFakeBirthDateString = (date: Dayjs, config: FakeFnrConfig): string => {
    let dayStr = date.format('DD');
    let monthStr = date.format('MM');
    const yearStr = date.format('YY');

    if (config.addToMonths !== undefined) {
        // date.month() starts at 0, not 1
        const fakeMonth = date.month() + 1 + config.addToMonths;
        monthStr = toTwoDigitString(fakeMonth);
    }
    if (config.addToDays !== undefined) {
        // date.date() on the other hand, starts at 1
        const fakeDay = date.date() + config.addToDays;
        dayStr = toTwoDigitString(fakeDay);
    }
    return dayStr + monthStr + yearStr;
};

const toTwoDigitString = (n: number): string => {
    const str = `${n}`;
    switch (str.length) {
        case 0:
            return '00';
        case 1:
            return `0${str}`;
        case 2:
            return str;
        default:
            throw new Error(`Number could not be converted to two-digit string: ${n}`);
    }
};

export const generateUniqueFakeFnrList = (length: number, config: FakeFnrConfig) =>
    generateUniqueStringList(length, () => generateFakeFnr(config));
