import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import styles from './generateMultipleFiktiveFnr.module.scss';
import { Input } from '../../common/Input/Input';
import { Checkbox } from '../../common/Checkbox/Checkbox';
import { ButtonGhost } from '../../common/Button/ButtonGhost';
import { FiktivtFnrConfig, generateUniqueFiktiveFnrList } from '../fiktive-fnr-utils';

const getNumberWithinBounds = (n: number, min: number, max: number): number => {
    return Math.min(max, Math.max(min, n));
};

export const GenerateMultipleFiktiveFnr: FunctionComponent = () => {
    const [generatedFiktiveFnrList, setGeneratedFiktiveFnrList] = useState<string[]>([]);
    const [numberOfFiktiveFnr, setNumberOfFiktiveFnr] = useState<number>(50);
    const [formatAsJson, setFormatAsJson] = useState<boolean>(false);
    const [fiktivtFnrConfig, setFiktivtFnrConfig] = useState<FiktivtFnrConfig>({
        addToMonths: 20,
    });

    const generateFiktiveFnrListAndSetState = () =>
        setGeneratedFiktiveFnrList(generateUniqueFiktiveFnrList(numberOfFiktiveFnr, fiktivtFnrConfig));

    useEffect(generateFiktiveFnrListAndSetState, [numberOfFiktiveFnr]);

    const formattedFiktiveFnrList = formatAsJson
        ? JSON.stringify(generatedFiktiveFnrList)
        : generatedFiktiveFnrList.join(' ');

    return (
        <form className={styles.generateMultipleFiktiveFnr}>
            <div className={styles.inputWrapper}>
                <h2 className={styles.title}>Trenger du flere?</h2>
                <div className={styles.numberOfFiktiveFnr}>
                    <label htmlFor="generer-flere__antall">Antall:</label>
                    <Input
                        type="number"
                        id="generer-flere__antall"
                        name="generer-flere__antall"
                        value={numberOfFiktiveFnr}
                        onChange={(event) => {
                            const value = parseInt(event.target.value);
                            !isNaN(value) && setNumberOfFiktiveFnr(value);
                        }}
                    />
                </div>
                <div className={styles.numberOfFiktiveFnr}>
                    <label htmlFor="generer-flere__antall">+ måned:</label>
                    <Input
                        type="number"
                        id="generer-flere__antall"
                        name="generer-flere__antall"
                        value={fiktivtFnrConfig.addToMonths ?? ''}
                        onChange={(event) => {
                            const strValue = event.target.value;
                            if (strValue === '') setFiktivtFnrConfig({ ...fiktivtFnrConfig, addToMonths: undefined });
                            const value = parseInt(strValue);
                            if (!isNaN(value)) {
                                setFiktivtFnrConfig({
                                    ...fiktivtFnrConfig,
                                    addToMonths: getNumberWithinBounds(value, 0, 87),
                                });
                            }
                        }}
                    />
                </div>
                <div className={styles.numberOfFiktiveFnr}>
                    <label htmlFor="generer-flere__antall">+ dag:</label>
                    <Input
                        type="number"
                        id="generer-flere__antall"
                        name="generer-flere__antall"
                        value={fiktivtFnrConfig.addToDays ?? ''}
                        onChange={(event) => {
                            const strValue = event.target.value;
                            if (strValue === '') setFiktivtFnrConfig({ ...fiktivtFnrConfig, addToMonths: undefined });
                            const value = parseInt(strValue);
                            if (!isNaN(value)) {
                                setFiktivtFnrConfig({
                                    ...fiktivtFnrConfig,
                                    addToDays: getNumberWithinBounds(value, 0, 68),
                                });
                            }
                        }}
                    />
                </div>
                <div className={styles.checkboxWrapper}>
                    <label htmlFor="generer-flere__json-checkbox">JSON:</label>
                    <Checkbox
                        type="checkbox"
                        id="generer-flere__json-checkbox"
                        checked={formatAsJson}
                        onChange={() => setFormatAsJson(!formatAsJson)}
                    />
                </div>
                <div>
                    <ButtonGhost
                        className={styles.button}
                        onClick={(e) => {
                            e.preventDefault();
                            generateFiktiveFnrListAndSetState();
                        }}
                    >
                        Generer
                    </ButtonGhost>
                </div>
            </div>
            <output className={styles.output}>
                <label className={styles.textareaLabel} htmlFor="generer-flere__textarea">
                    Genererte fiktive fødselsnumre (alle er unike):
                </label>
                <textarea
                    id="generer-flere__textarea"
                    className={styles.textarea}
                    readOnly
                    value={formattedFiktiveFnrList}
                />
            </output>
        </form>
    );
};
