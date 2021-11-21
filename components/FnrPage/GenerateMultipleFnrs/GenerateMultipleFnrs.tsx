import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import styles from './generateMultipleFnrs.module.scss';
import { Input } from '../../common/Input/Input';
import { Checkbox } from '../../common/Checkbox/Checkbox';
import { Radio } from '../../common/Radio/Radio';
import { ButtonGhost } from '../../common/Button/ButtonGhost';
import { generateUniqueFnrList } from '../fnr-utils';
import { copyToClipboard, downloadJSONFile, downloadTextFile } from '../../tmp-utils';

export const GenerateMultipleFnrs: FunctionComponent = () => {
    const generatedFnrList = useRef<string[]>([]);
    const [numberOfFnrs, setNumberOfFnrs] = useState<number>(50);
    const [formatAsJson, setFormatAsJson] = useState<boolean>(false);
    const [copyOrDownload, setCopyOrDownload] = useState<'download' | 'copy'>('copy');

    const generateFnrListAndSetState = () => (generatedFnrList.current = generateUniqueFnrList(numberOfFnrs));

    useEffect(generateFnrListAndSetState, []);

    const formatFnrList = (fnrList: string[], json: boolean) => (json ? JSON.stringify(fnrList) : fnrList.join(' '));

    const buttonText = copyOrDownload === 'download' ? 'Generer og last ned' : 'Generer og kopier';

    return (
        <form className={styles.generateMultipleFnrs}>
            <h2 className={styles.title}>Trenger du flere?</h2>
            <div className={styles.numberOfFnrs}>
                <label htmlFor="generateMultipleFnrs__number">Antall:</label>
                <Input
                    type="number"
                    id="generateMultipleFnrs__number"
                    name="generateMultipleFnrs__number"
                    value={numberOfFnrs}
                    onChange={(event) => {
                        console.log(event.target.value);
                        const value = parseInt(event.target.value);
                        !isNaN(value) && setNumberOfFnrs(value);
                    }}
                />
            </div>
            <div className={styles.checkboxWrapper}>
                <label htmlFor="generateMultipleFnrs__formatAsJson">JSON:</label>
                <Checkbox
                    id="generateMultipleFnrs__formatAsJson"
                    checked={formatAsJson}
                    onChange={() => setFormatAsJson(!formatAsJson)}
                />
            </div>
            <div className="generer-flere__radio-wrapper">
                <p className={styles.radioTitle}>Hvordan vil du motta fødselsnumrene?</p>
                <Radio
                    checked={copyOrDownload === 'copy'}
                    onChange={() => setCopyOrDownload('copy')}
                    label="Kopier til utklippstavle"
                    id="generateMultipleFnrs__copy"
                    name="generateMultipleFnrs"
                />
                <Radio
                    checked={copyOrDownload === 'download'}
                    onChange={() => setCopyOrDownload('download')}
                    label="Last ned som fil"
                    id="generateMultipleFnrs__download"
                    name="generateMultipleFnrs"
                />
            </div>
            <ButtonGhost
                onClick={(e) => {
                    e.preventDefault();
                    generateFnrListAndSetState();
                    const formattedFnrList = formatFnrList(generatedFnrList.current, formatAsJson);
                    if (copyOrDownload === 'copy') {
                        copyToClipboard(formattedFnrList);
                    } else if (copyOrDownload === 'download') {
                        formatAsJson
                            ? downloadJSONFile('fødselsnumre.json', formattedFnrList)
                            : downloadTextFile('fødselsnumre.txt', formattedFnrList);
                    }
                }}
                className={styles.generateButton}
            >
                {buttonText}
            </ButtonGhost>
        </form>
    );
};
