import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Input } from '../../common/Input/Input';
import styles from './validateFnr.module.scss';
import { ValidationResultBox } from '../ValidationResultBox/ValidationResultBox';
import { NotValidIcon, ValidIcon } from '../../common/icons/icons';
import { onlyContainsNumbers, ValidationResult } from '../../OrgnrPage/ValidateOrgnr/validate-orgnr';
import { validateFnr } from './validate-fnr';

export const ValidateFnr: FunctionComponent = () => {
    const [fnr, setFnr] = useState<string>('');
    const [validation, setValidation] = useState<ValidationResult | undefined>();

    const showValidationResult = fnr && fnr.length > 0;

    return (
        <div className={styles.validateFnr}>
            <div className={styles.inputWrapper}>
                <label htmlFor="validateFnr__input">Valider fnr:</label>
                <div className={styles.inputFieldWrapper}>
                    <Input
                        id="validateFnr__input"
                        className={styles.input}
                        value={fnr}
                        onChange={event => {
                            const fnrText = event.target.value;
                            if (onlyContainsNumbers(fnrText)) {
                                setFnr(fnrText);
                                if (fnrText.length === 0) {
                                    setValidation(undefined);
                                } else {
                                    setValidation(validateFnr(fnrText));
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
                    fnr={fnr}
                    htmlFor="validateFnr__input"
                    result={validation}
                    className={styles.validationBox}
                />
            )}
        </div>
    );
};
