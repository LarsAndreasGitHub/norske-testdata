import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import styles from './generateMultipleFakeFnrs.module.scss';
import { Input } from '../../common/Input/Input';
import { Checkbox } from '../../common/Checkbox/Checkbox';
import { ButtonGhost } from '../../common/Button/ButtonGhost';
import { FakeFnrConfig, generateUniqueFakeFnrList } from '../fake-fnr-utils';

const getNumberWithinBounds = (n: number, min: number, max: number): number => {
    return Math.min(max, Math.max(min, n));
};

export const GenerateMultipleFakeFnrs: FunctionComponent = () => {
    const [generatedFakeFnrList, setGeneratedFakeFnrList] = useState<string[]>([]);
    const [numberOfFakeFnrs, setNumberOfFakeFnrs] = useState<number | undefined>(50);
    const [formatAsJson, setFormatAsJson] = useState<boolean>(false);
    const [fakeFnrConfig, setFakeFnrConfig] = useState<FakeFnrConfig>({
        addToMonths: 20,
    });

    const generateFakeFnrListAndSetState = () =>
        setGeneratedFakeFnrList(generateUniqueFakeFnrList(numberOfFakeFnrs ?? 0, fakeFnrConfig));

    useEffect(generateFakeFnrListAndSetState, [numberOfFakeFnrs]);

    const formattedFakeFnrList = formatAsJson
        ? JSON.stringify(generatedFakeFnrList)
        : generatedFakeFnrList.join(' ');

    return (
        <form className={styles.generateMultipleFakeFnr}>
            <div className={styles.inputWrapper}>
                <h2 className={styles.title}>Trenger du flere, eller med andre parametre?</h2>
                <div className={styles.numberOfFakeFnrs}>
                    <label htmlFor="generer-flere__antall">Antall:</label>
                    <Input
                        type="number"
                        id="generer-flere__antall"
                        name="generer-flere__antall"
                        value={numberOfFakeFnrs}
                        onChange={(event) => {
                            const strValue = event.target.value;
                            if (!strValue) {
                                setNumberOfFakeFnrs(undefined);
                            }
                            const value = parseInt(strValue);
                            !isNaN(value) && setNumberOfFakeFnrs(value);
                        }}
                    />
                </div>
                <div className={styles.numberOfFakeFnrs}>
                    <label htmlFor="generer-flere__antall">+ måned:</label>
                    <Input
                        type="number"
                        id="generer-flere__antall"
                        name="generer-flere__antall"
                        value={fakeFnrConfig.addToMonths ?? ''}
                        onChange={(event) => {
                            const strValue = event.target.value;
                            if (strValue === '') setFakeFnrConfig({ ...fakeFnrConfig, addToMonths: undefined });
                            const value = parseInt(strValue);
                            if (!isNaN(value)) {
                                setFakeFnrConfig({
                                    ...fakeFnrConfig,
                                    addToMonths: getNumberWithinBounds(value, 0, 87),
                                });
                            }
                        }}
                    />
                </div>
                <div className={styles.numberOfFakeFnrs}>
                    <label htmlFor="generer-flere__antall">+ dag:</label>
                    <Input
                        type="number"
                        id="generer-flere__antall"
                        name="generer-flere__antall"
                        value={fakeFnrConfig.addToDays ?? ''}
                        onChange={(event) => {
                            const strValue = event.target.value;
                            if (strValue === '') setFakeFnrConfig({ ...fakeFnrConfig, addToMonths: undefined });
                            const value = parseInt(strValue);
                            if (!isNaN(value)) {
                                setFakeFnrConfig({
                                    ...fakeFnrConfig,
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
                            generateFakeFnrListAndSetState();
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
                    value={formattedFakeFnrList}
                />
            </output>
        </form>
    );
};
