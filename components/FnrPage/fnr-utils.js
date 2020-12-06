import dayjs from 'dayjs';
import { generateUniqueStringList } from '../tmp-utils';

const randomInt = (min, max) => min + Math.floor(Math.random() * Math.floor(max - min));

const vekttall1 = [3, 7, 6, 1, 8, 9, 4, 5, 2];
const vekttall2 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

const mod11 = tall => {
    const kontrolltall = 11 - (tall % 11);
    return kontrolltall === 11 ? 0 : kontrolltall;
};

const getKontrollsifre = (fødselsdatoStr, individnrStr) => {
    const fnrSomTall = (fødselsdatoStr + individnrStr).split('').map(tall => parseInt(tall));
    const sum1 = fnrSomTall.map((tall, index) => tall * vekttall1[index]).reduce((a, b) => a + b);
    const kontrolltall1 = mod11(sum1);
    const sum2 = [...fnrSomTall, kontrolltall1].map((tall, index) => tall * vekttall2[index]).reduce((a, b) => a + b);
    const kontrolltall2 = mod11(sum2);
    return `${kontrolltall1}${kontrolltall2}`;
};

const getRandomIndividnr = fødselsår => {
    if (1854 <= fødselsår && fødselsår < 1900) {
        return randomInt(500, 750);
    }
    if (1900 <= fødselsår && fødselsår < 2000) {
        if (1940 <= fødselsår) {
            // Her kan både 0-499 og 900-999 brukes, og vi vekter sannsynligheten deretter.
            return Math.random() < 1 / 6 ? randomInt(900, 1000) : randomInt(0, 500);
        } else {
            return randomInt(0, 500);
        }
    }
    if (2000 <= fødselsår && fødselsår < 2040) {
        return randomInt(500, 1000);
    }
    return 'ugyldig fødselsår';
};

const getRandomIndividnrString = fødselsår => {
    const individnr = '' + getRandomIndividnr(fødselsår);
    if (individnr.length === 1) return '00' + individnr;
    if (individnr.length === 2) return '0' + individnr;
    return individnr;
};

const generateFnrFromDate = date => {
    const fødselsdatoStr = date.format('DDMMYY');
    let i = 0;
    while (true) {
        i++;
        if (i > 10000) throw new Error('Infinite loop');
        const individnrStr = getRandomIndividnrString(date.format('YYYY'));
        const kontrollsifre = getKontrollsifre(fødselsdatoStr, individnrStr);
        if (kontrollsifre.length === 2) {
            return [fødselsdatoStr, individnrStr, kontrollsifre].join('');
        }
    }
};

export const generateFnr = () => {
    /*
    Originalt:
    const minDate = new Date('1854-01-01');
    const maxDate = new Date('2039-12-31');
     */
    const minDate = new Date('1900-01-01');
    const maxDate = new Date('2002-12-31');
    const randomDate = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
    const dayJSDate = dayjs(randomDate);

    if (!dayJSDate.isValid()) {
        throw new Error('Dato er ikke gyldig: ' + dayJSDate);
    }
    return generateFnrFromDate(dayJSDate);
};

export const generateUniqueFnrList = length => generateUniqueStringList(length, generateFnr);
