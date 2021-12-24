import * as React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { ValidationResult } from '../ValidateOrgnr/validate-orgnr';
import styles from './validationResultBox.module.scss';
import { classNames } from '../../utils';
import { NotValidIcon, ValidIcon } from '../../common/icons/icons';
import { BrregResponse, RestResource, RestStatus } from '../brreg-api';

interface Props {
    orgnr: string;
    result: ValidationResult;
    htmlFor: string;
    underenhetResponse: RestResource<BrregResponse>;
    enhetResponse: RestResource<BrregResponse>;
    className?: string;
}

const getOrgnrExistsText = (
    orgnr: string,
    underenhetResponse: RestResource<BrregResponse>,
    enhetResponse: RestResource<BrregResponse>
): ReactElement | string => {
    if (underenhetResponse.status === RestStatus.NotFound && enhetResponse.status === RestStatus.NotFound) {
        return 'Organisasjonsnummeret er ikke i bruk.';
    }
    if (underenhetResponse.status === RestStatus.OK || enhetResponse.status === RestStatus.OK) {
        let organizationName;
        if (underenhetResponse.status === RestStatus.OK) {
            organizationName = underenhetResponse.data.name;
        } else if (enhetResponse.status === RestStatus.OK) {
            organizationName = enhetResponse.data.name;
        }
        if (!organizationName) organizationName = 'denne organisasjonen';

        return (
            <>
                Organisasjonsnummeret er i bruk av{' '}
                <a href={'https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=' + orgnr}>{organizationName}</a>.
            </>
        );
    }
    return null;
};

export const ValidationResultBox: FunctionComponent<Props> = ({
    orgnr,
    result,
    className,
    htmlFor,
    underenhetResponse,
    enhetResponse,
}) => {
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
            <div className={styles.box}>
                {content}
                <div className={styles.doesOrgnrExistText}>
                    {getOrgnrExistsText(orgnr, underenhetResponse, enhetResponse)}
                </div>
            </div>
        </output>
    );
};
