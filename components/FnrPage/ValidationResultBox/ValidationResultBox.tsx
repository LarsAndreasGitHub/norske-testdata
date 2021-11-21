import * as React from 'react';
import { FunctionComponent } from 'react';
import styles from './validationResultBox.module.scss';
import { classNames } from '../../utils';
import { NotValidIcon, ValidIcon } from '../../common/icons/icons';
import { ValidationResult } from '../../OrgnrPage/ValidateOrgnr/validate-orgnr';

interface Props {
    fnr: string;
    result: ValidationResult;
    htmlFor: string;
    className?: string;
}

export const ValidationResultBox: FunctionComponent<Props> = ({ fnr, result, className, htmlFor }) => {
    let content;
    if (result.valid === true) {
        content = (
            <>
                <ValidIcon /> {result.component} er gyldig!
            </>
        );
    } else {
        content = (
            <>
                <NotValidIcon /> {result.component} er ikke gyldig!
                <div className={styles.errorMessage}>{result.error}</div>
            </>
        );
    }

    return (
        <output htmlFor={htmlFor} className={classNames(styles.validationResultBox, className)}>
            <div className={styles.title}>Resultat:</div>
            <div className={styles.box}>{content}</div>
        </output>
    );
};
