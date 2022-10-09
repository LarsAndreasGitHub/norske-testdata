import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import styles from './generateOneKontonr.module.scss';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { generateKontonr } from '../kontonr-utils';
import { ButtonGhost } from '../../common/Button/ButtonGhost';
import { copyToClipboard } from '../../tmp-utils';

export const GenerateOneKontonr: FunctionComponent = () => {
    const [generatedKontonr, setGeneratedKontonr] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);
    const copiedTimer = useRef<any>();
    const copyButtonRef = useRef<HTMLButtonElement>();

    useEffect(() => setGeneratedKontonr(generateKontonr()), []);

    return (
        <div className={styles.generateOneKontonr}>
            <label htmlFor="generateOneKontonr__output">Generert kontonummer:</label>
            <div className={styles.outputWrapper}>
                <output className={styles.output}>
                    <Input
                        id="generateOneKontonr__output"
                        className={styles.input}
                        value={generatedKontonr}
                        readOnly
                        size={9}
                    />
                </output>

                <ButtonGhost
                    className={styles.copyButton}
                    green={copied}
                    onMouseEnter={() => {
                        clearTimeout(copiedTimer.current);
                        setCopied(false);
                    }}
                    ref={copyButtonRef}
                    onClick={() => {
                        copyToClipboard(generatedKontonr);
                        copyButtonRef.current && copyButtonRef.current.focus();
                        clearTimeout(copiedTimer.current);
                        setCopied(true);
                        copiedTimer.current = setTimeout(() => setCopied(false), 2000);
                    }}
                >
                    <div>Kopier</div>
                    <div className={styles.copyIcon} role="img" aria-label="kopi-ikon">
                        ⎘
                    </div>
                </ButtonGhost>
            </div>
            <Button onClick={() => setGeneratedKontonr(generateKontonr())} className={styles.generateButton}>
                Generer et nytt
            </Button>
        </div>
    );
};
