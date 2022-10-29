import { getRandomDate } from '../utils';
import { Dayjs } from 'dayjs';
import { getKontrollsifre, getRandomIndividnrString } from '../FnrPage/fnr-utils';

export interface FiktivtFnrConfig {
    addToMonths?: number;
    addToDays?: number;
}

export const generateFiktivtFnr = (config: FiktivtFnrConfig): string => {
    const dayJSDate = getRandomDate(new Date('1900-01-01'), new Date('2002-12-31'));
    return generateFiktivtFnrFromDate(dayJSDate, config);
};

const generateFiktivtFnrFromDate = (date: Dayjs, config: FiktivtFnrConfig): string => {
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

const getFakeBirthDateString = (date: Dayjs, config: FiktivtFnrConfig): string => {
    let dayStr = date.format('DD');
    let monthStr = date.format('MM');
    const yearStr = date.format('YY');

    if (config.addToMonths !== undefined) {
        const fakeMonth = date.month() + config.addToMonths;
        monthStr = toTwoDigitString(fakeMonth);
    }
    if (config.addToDays !== undefined) {
        const fakeDay = date.day() + config.addToDays;
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
