import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import styles from './generateMultipleKontonrs.module.scss';
import { Input } from '../../common/Input/Input';
import { Checkbox } from '../../common/Checkbox/Checkbox';
import { ButtonGhost } from '../../common/Button/ButtonGhost';
import { generateUniqueKontonrList, padWithWildcards } from '../kontonr-utils';

export const GenerateMultipleKontonrs: FunctionComponent = () => {
    const [generatedKontonrList, setGeneratedKontonrList] = useState<string[]>([]);
    const [numberOfKontonrs, setNumberOfKontonrs] = useState<number | undefined>(50);
    const [formatAsJson, setFormatAsJson] = useState<boolean>(false);
    const [registernrTemplate, setRegisternrTemplate] = useState<string>('');

    const generateKontonrListAndSetState = () =>
        setGeneratedKontonrList(
            generateUniqueKontonrList(numberOfKontonrs ?? 0, padWithWildcards(registernrTemplate, 10))
        );

    useEffect(generateKontonrListAndSetState, [numberOfKontonrs, registernrTemplate]);

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
                            const strValue = event.target.value;
                            if (!strValue) {
                                setNumberOfKontonrs(undefined);
                            }
                            const value = parseInt(strValue);
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
                <div className={styles.numberOfKontonrs}>
                    <label htmlFor="generer-flere__registernr">Registernr:</label>
                    <Input
                        id="generer-flere__registernr"
                        name="generer-flere__registernr"
                        value={registernrTemplate}
                        onChange={(event) => {
                            const input = event.target.value?.substring(0, 4);
                            const regexp = new RegExp('^[0-9*]{0,4}$');
                            if (input?.match(regexp)) {
                                setRegisternrTemplate(input);
                            }
                        }}
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
