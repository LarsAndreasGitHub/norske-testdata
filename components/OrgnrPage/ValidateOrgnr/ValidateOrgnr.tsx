import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { Input } from '../../common/Input/Input';
import styles from './validateOrgnr.module.scss';
import { isOrgnrValid, onlyContainsNumbers, validateOrgnr, ValidationResult } from './validate-orgnr';
import { ValidationResultBox } from '../ValidationResultBox/ValidationResultBox';
import { NotValidIcon, ValidIcon } from '../../common/icons/icons';
import { BrregResponse, orgnrBelongsToEnhet, orgnrBelongsToUnderenhet, RestResource, RestStatus } from '../brreg-api';

export const ValidateOrgnr: FunctionComponent = () => {
    const [orgnr, setOrgnr] = useState<string>('');
    const [validation, setValidation] = useState<ValidationResult | undefined>();

    const [underenhetResponse, setUnderenhetResponse] = useState<RestResource<BrregResponse>>({
        status: RestStatus.Loading,
    });
    const [enhetResponse, setEnhetResponse] = useState<RestResource<BrregResponse>>({ status: RestStatus.Loading });

    useEffect(() => {
        setEnhetResponse({ status: RestStatus.Loading });
        setUnderenhetResponse({ status: RestStatus.Loading });
        console.log('useEffect');
        console.log('valid', isOrgnrValid(orgnr));
        if (isOrgnrValid(orgnr)) {
            console.log('valid. calling...');
            orgnrBelongsToEnhet(orgnr).then(result => setEnhetResponse(result));
            orgnrBelongsToUnderenhet(orgnr).then(result => setUnderenhetResponse(result));
        }
    }, [orgnr]);

    const showValidationResult = orgnr && orgnr.length > 0;

    return (
        <div className={styles.validateOrgnr}>
            <div className={styles.inputWrapper}>
                <label htmlFor="validateOrgnr__input">Valider orgnr:</label>
                <div className={styles.inputFieldWrapper}>
                    <Input
                        id="validateOrgnr__input"
                        className={styles.input}
                        value={orgnr}
                        onChange={event => {
                            const orgnrText = event.target.value;
                            if (onlyContainsNumbers(orgnrText)) {
                                setOrgnr(orgnrText);
                                if (orgnrText.length === 0) {
                                    setValidation(undefined);
                                } else {
                                    setValidation(validateOrgnr(orgnrText));
                                }
                            }
                        }}
                        onFocus={event => event.target.select()}
                    />
                    {validation &&
                        (validation.valid ? (
                            <ValidIcon className={styles.validationMark} />
                        ) : (
                            <NotValidIcon className={styles.validationMark} />
                        ))}
                </div>
            </div>
            {showValidationResult && (
                <ValidationResultBox
                    orgnr={orgnr}
                    htmlFor="validateOrgnr__input"
                    result={validation}
                    className={styles.validationBox}
                    underenhetResponse={underenhetResponse}
                    enhetResponse={enhetResponse}
                />
            )}
        </div>
    );
};
