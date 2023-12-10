import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import styles from './generateMultipleKIDnrs.module.scss';
import { Input } from '../../common/Input/Input';
import { Checkbox } from '../../common/Checkbox/Checkbox';
import { ButtonGhost } from '../../common/Button/ButtonGhost';
import { generateUniqueKIDnrList } from '../kid-nr-utils';

export const GenerateMultipleKIDnrs: FunctionComponent = () => {
    const [generatedKIDnrList, setGeneratedKIDnrList] = useState<string[]>([]);
    const [numberOfKIDnrs, setNumberOfKIDnrs] = useState<number | undefined>(50);
    const [formatAsJson, setFormatAsJson] = useState<boolean>(false);
    const [mode, setMode] = useState<'mod10' | 'mod11'>('mod10');
    const [length, setLength] = useState<number>(10);

    const generateKIDnrListAndSetState = () => {
        if (length >= 4) {
            setGeneratedKIDnrList(generateUniqueKIDnrList(numberOfKIDnrs ?? 0, length, mode));
        }
    };

    useEffect(generateKIDnrListAndSetState, [numberOfKIDnrs, mode, length]);

    const formattedKIDnrList = formatAsJson ? JSON.stringify(generatedKIDnrList) : generatedKIDnrList.join(' ');

    return (
        <form className={styles.generateMultipleKIDnrs}>
            <div className={styles.inputWrapper}>
                <h2 className={styles.title}>Trenger du flere?</h2>
                <div className={styles.numberOfKIDnrs}>
                    <label htmlFor="generer-flere__antall">Antall:</label>
                    <Input
                        type="number"
                        id="generer-flere__antall"
                        name="generer-flere__antall"
                        value={numberOfKIDnrs}
                        onChange={(event) => {
                            const strValue = event.target.value;
                            if (!strValue) {
                                setNumberOfKIDnrs(undefined);
                            }
                            const value = parseInt(strValue);
                            !isNaN(value) && setNumberOfKIDnrs(value);
                        }}
                    />
                </div>
                <div className={styles.numberOfKIDnrs}>
                    <label htmlFor="generer-flere__lengde">Lengde (4–25):</label>
                    <Input
                        type="number"
                        id="generer-flere__lengde"
                        name="generer-flere__lengde"
                        value={length}
                        onChange={(event) => {
                            const strValue = event.target.value;
                            if (!strValue) {
                                setLength(undefined);
                            }
                            const value = parseInt(strValue);
                            !isNaN(value) && setLength(value);
                        }}
                    />
                </div>
                <div className={styles.checkboxWrapper}>
                    <label htmlFor="generer-flere__mod10">MOD10:</label>
                    <input
                        style={{ width: '1.25rem', height: '1.25rem' }}
                        id="generer-flere__mod10"
                        type="radio"
                        checked={mode === 'mod10'}
                        onChange={() => setMode('mod10')}
                    />
                </div>
                <div className={styles.checkboxWrapper}>
                    <label htmlFor="generer-flere__mod11">MOD11:</label>
                    <input
                        style={{ width: '1.25rem', height: '1.25rem' }}
                        id="generer-flere__mod11"
                        type="radio"
                        checked={mode === 'mod11'}
                        onChange={() => setMode('mod11')}
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
                            generateKIDnrListAndSetState();
                        }}
                    >
                        Generer
                    </ButtonGhost>
                </div>
            </div>
            <output className={styles.output}>
                <label className={styles.textareaLabel} htmlFor="generer-flere__textarea">
                    Genererte KID-numre (alle er unike):
                </label>
                <textarea
                    id="generer-flere__textarea"
                    className={styles.textarea}
                    readOnly
                    value={formattedKIDnrList}
                />
            </output>
        </form>
    );
};
