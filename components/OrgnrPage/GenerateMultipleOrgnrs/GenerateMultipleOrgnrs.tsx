import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import styles from './generateMultipleOrgnrs.module.scss';
import { Input } from '../../common/Input/Input';
import { Checkbox } from '../../common/Checkbox/Checkbox';
import { ButtonGhost } from '../../common/Button/ButtonGhost';
import { generateUniqueOrgnrList } from '../orgnr-utils';

export const GenerateMultipleOrgnrs: FunctionComponent = () => {
    const [generatedOrgnrList, setGeneratedOrgnrList] = useState<string[]>([]);
    const [numberOfOrgnrs, setNumberOfOrgnrs] = useState<number | undefined>(50);
    const [formatAsJson, setFormatAsJson] = useState<boolean>(false);

    const generateOrgnrListAndSetState = () => setGeneratedOrgnrList(generateUniqueOrgnrList(numberOfOrgnrs ?? 0));

    useEffect(generateOrgnrListAndSetState, [numberOfOrgnrs]);

    const formattedOrgnrList = formatAsJson ? JSON.stringify(generatedOrgnrList) : generatedOrgnrList.join(' ');

    return (
        <form className={styles.generateMultipleOrgnrs}>
            <div className={styles.inputWrapper}>
                <h2 className={styles.title}>Trenger du flere?</h2>
                <div className={styles.numberOfOrgnrs}>
                    <label htmlFor="generer-flere__antall">Antall:</label>
                    <Input
                        type="number"
                        id="generer-flere__antall"
                        name="generer-flere__antall"
                        value={numberOfOrgnrs}
                        onChange={(event) => {
                            const strValue = event.target.value;
                            if (!strValue) {
                                setNumberOfOrgnrs(undefined);
                            }
                            const value = parseInt(strValue);
                            !isNaN(value) && setNumberOfOrgnrs(value);
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
                            generateOrgnrListAndSetState();
                        }}
                    >
                        Generer
                    </ButtonGhost>
                </div>
            </div>
            <output className={styles.output}>
                <label className={styles.textareaLabel} htmlFor="generer-flere__textarea">
                    Genererte orgnumre (alle er unike):
                </label>
                <textarea
                    id="generer-flere__textarea"
                    className={styles.textarea}
                    readOnly
                    value={formattedOrgnrList}
                />
            </output>
        </form>
    );
};
