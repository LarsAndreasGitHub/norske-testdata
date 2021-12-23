import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import styles from './generateMultipleKontonrs.module.scss';
import { Input } from '../../common/Input/Input';
import { Checkbox } from '../../common/Checkbox/Checkbox';
import { ButtonGhost } from '../../common/Button/ButtonGhost';
import { generateUniqueKontonrList } from '../kontonr-utils';

export const GenerateMultipleKontonrs: FunctionComponent = () => {
    const [generatedKontonrList, setGeneratedKontonrList] = useState<string[]>([]);
    const [numberOfKontonrs, setNumberOfKontonrs] = useState<number>(50);
    const [formatAsJson, setFormatAsJson] = useState<boolean>(false);

    const generateKontonrListAndSetState = () => setGeneratedKontonrList(generateUniqueKontonrList(numberOfKontonrs));

    useEffect(generateKontonrListAndSetState, [numberOfKontonrs]);

    const formattedKontonrList = formatAsJson ? JSON.stringify(generatedKontonrList) : generatedKontonrList.join(' ');

    return (
        <form className={styles.generateMultipleKontonrs}>
            <div className={styles.inputWrapper}>
                <h2 className={styles.title}>Trenger du flere?</h2>
                <div className={styles.numberOfKontonrs}>
                    <label htmlFor="generer-flere__antall">Antall:</label>
                    <Input
                        type="number"
                        id="generer-flere__antall"
                        name="generer-flere__antall"
                        value={numberOfKontonrs}
                        onChange={(event) => {
                            const value = parseInt(event.target.value);
                            !isNaN(value) && setNumberOfKontonrs(value);
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
                            generateKontonrListAndSetState();
                        }}
                    >
                        Generer
                    </ButtonGhost>
                </div>
            </div>
            <output className={styles.output}>
                <label className={styles.textareaLabel} htmlFor="generer-flere__textarea">
                    Genererte kontonumre (alle er unike):
                </label>
                <textarea
                    id="generer-flere__textarea"
                    className={styles.textarea}
                    readOnly
                    value={formattedKontonrList}
                />
            </output>
        </form>
    );
};
