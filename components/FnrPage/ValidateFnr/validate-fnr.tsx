import { onlyContainsNumbers, ValidationResult } from '../../OrgnrPage/ValidateOrgnr/validate-orgnr';
import styles from '../../OrgnrPage/ValidateOrgnr/validateOrgnr.module.scss';
import * as React from 'react';
import { ReactElement } from 'react';
import { formatDayjs } from '../../utils';
import { getFirstControlDigit, getSecondControlDigit } from '../fnr-utils';

const isValidDate = (dateString: string, format: string): boolean => {
    return formatDayjs(dateString, format).format(format) === dateString;
};

const inRange = (number: number, [rangeStart, rangeEnd]: number[]): boolean => {
    return rangeStart <= number && number < rangeEnd;
};

const isIndividnrValid = (individnrString: string, year: number): boolean => {
    const individnr = parseInt(individnrString);
    if (inRange(year, [1854, 1900])) return inRange(individnr, [500, 750]);
    if (inRange(year, [1940, 2000])) return inRange(individnr, [900, 1000]) || inRange(individnr, [0, 500]);
    if (inRange(year, [1900, 2000])) return inRange(individnr, [0, 500]);
    if (inRange(year, [2000, 2040])) return inRange(individnr, [500, 1000]);
};

const getValidYears = (twoDigitYearString: string): number[] => {
    const validYears = ['19' + twoDigitYearString];
    const twoDigitYear = parseInt(twoDigitYearString);
    if (twoDigitYear >= 54) validYears.push('18' + twoDigitYearString);
    if (twoDigitYear <= 39) validYears.push('20' + twoDigitYearString);
    return validYears.map(year => parseInt(year));
};

const getValidDates = (dateStringDDMMYY: string) => {
    const dayAndMonth = dateStringDDMMYY.substr(0, 4);
    const twoDigitYear = dateStringDDMMYY.substr(4, 2);
    return getValidYears(twoDigitYear)
        .map(fourDigitYear => dayAndMonth + fourDigitYear)
        .filter(dateString => isValidDate(dateString, 'DDMMYYYY'))
        .map(dateString => formatDayjs(dateString, 'DDMMYYYY'));
};

const getValidationTextAndComponent = (fnrCandidate: string): [string, ReactElement] => {
    const allInvalid = <span className={styles.invalidNumbers}>{fnrCandidate}</span>;
    const allValid = <span className={styles.validNumbers}>{fnrCandidate}</span>;

    if (!onlyContainsNumbers(fnrCandidate)) return ['Fødselsnummeret inneholder andre tegn enn tall.', allInvalid];
    if (fnrCandidate.length < 11) return ['Fødselsnummeret er for kort.', allInvalid];
    if (fnrCandidate.length > 11) return ['Fødselsnummeret er for langt.', allInvalid];

    const dateString = fnrCandidate.substr(0, 6);
    const individnr = fnrCandidate.substr(6, 3);

    const invalidDate = (
        <>
            <span className={styles.invalidNumbers}>{dateString}</span>
            {fnrCandidate.substr(6)}
        </>
    );

    if (!isValidDate(dateString, 'DDMMYY')) {
        return ['Dato-delen av fødselsnummeret er ikke en gyldig dato.', invalidDate];
    }
    const validDates = getValidDates(dateString);
    if (validDates.length === 0) {
        return ['Fødselsdatoen er ikke mellom 1854 og 2040', invalidDate];
    }
    const individnrIsValid = validDates.filter(date => isIndividnrValid(individnr, date.year())).length > 0;

    const invalidIndividnr = (
        <>
            <span className={styles.validNumbers}>{dateString}</span>
            <span className={styles.invalidNumbers}>{individnr}</span>
            {fnrCandidate.substr(9)}
        </>
    );

    if (!individnrIsValid) {
        return ['Individnummeret passer ikke med fødselsdatoen.', invalidIndividnr];
    }

    const firstControlDigit = getFirstControlDigit(dateString, '' + individnr);
    const secondControlDigit = getSecondControlDigit(dateString, '' + individnr, firstControlDigit);
    const controlDigits = firstControlDigit + secondControlDigit;

    if (firstControlDigit.length !== 1 || secondControlDigit.length !== 1) {
        return [
            'Kombinasjonen av individnummeret og fødselsdatoen gir alltid ugyldig kontrollsifre.',
            invalidIndividnr,
        ];
    }

    if (controlDigits !== fnrCandidate.substr(9)) {
        return [
            'Kontrollsifrene skulle ha vært ' + controlDigits + '.',
            <>
                <span className={styles.validNumbers}>{fnrCandidate.substr(0, 9)}</span>
                <span className={styles.invalidNumbers}>{fnrCandidate.substr(9)}</span>
            </>,
        ];
    }

    return ['valid', allValid];
};

export const validateFnr = (fnrCandidate: string): ValidationResult => {
    const [validationText, validationComponent] = getValidationTextAndComponent(fnrCandidate);

    return validationText === 'valid'
        ? {
              valid: true,
              component: validationComponent,
          }
        : {
              valid: false,
              error: validationText,
              component: validationComponent,
          };
};
