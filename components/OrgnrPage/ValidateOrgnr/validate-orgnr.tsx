import { getControlDigit } from '../orgnr-utils';
import { ReactElement } from 'react';
import styles from './validateOrgnr.module.scss';
import * as React from 'react';

export const onlyContainsNumbers = (str: string): boolean => str.length === 0 || !!str.match(/^\d+$/);

export type ValidationResult =
    | {
          valid: true;
          component: ReactElement;
      }
    | {
          valid: false;
          error: string;
          component: ReactElement;
      };

const getValidationTextAndComponent = (orgnrCandidate: string): [string, ReactElement] => {
    const allInvalid = <span className={styles.invalidNumbers}>{orgnrCandidate}</span>;

    if (orgnrCandidate.length < 9) return ['Organisasjonsnummeret er for kort.', allInvalid];
    if (orgnrCandidate.length > 9) return ['Organisasjonsnummeret er for langt.', allInvalid];
    if (!onlyContainsNumbers(orgnrCandidate))
        return ['Organisasjonsnummeret inneholder andre tegn enn tall.', allInvalid];

    const orgnrAsDigits = orgnrCandidate.split('').map(digitString => parseInt(digitString));
    const controlDigit = getControlDigit(orgnrAsDigits.slice(0, 8));
    if (controlDigit === 'invalid')
        return [
            'De første 8 sifrene gir ugyldig kontrollsiffer.',
            <>
                <span className={styles.invalidNumbers}>{orgnrCandidate.substr(0, 8)}</span>
                {orgnrCandidate.charAt(8)}
            </>,
        ];
    if (controlDigit !== orgnrAsDigits[8])
        return [
            'Kontrollsifferet skulle vært ' + controlDigit + '.',
            <>
                <span className={styles.validNumbers}>{orgnrCandidate.substr(0, 8)}</span>
                <span className={styles.invalidNumbers}>{orgnrCandidate.charAt(8)}</span>
            </>,
        ];

    return ['valid', <span className={styles.validNumbers}>{orgnrCandidate}</span>];
};

export const validateOrgnr = (orgnrCandidate: string): ValidationResult => {
    const [validationText, validationComponent] = getValidationTextAndComponent(orgnrCandidate);

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

export const isOrgnrValid = (orgnrCandidate: string): boolean => {
    if (!onlyContainsNumbers(orgnrCandidate)) {
        return false;
    }

    const orgnrAsDigits = orgnrCandidate.split('').map(digitStr => parseInt(digitStr));
    const controlDigit = getControlDigit(orgnrAsDigits);
    return controlDigit === orgnrAsDigits[8];
};
