import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import styles from './generateOneKIDnr.module.scss';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { generateKIDnr } from '../kid-nr-utils';
import { ButtonGhost } from '../../common/Button/ButtonGhost';
import { copyToClipboard } from '../../copy-utils';

export const GenerateOneKIDnr: FunctionComponent = () => {
    const [generatedKID, setGeneratedKID] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);
    const copiedTimer = useRef<any>();
    const copyButtonRef = useRef<HTMLButtonElement>();

    useEffect(() => setGeneratedKID(generateKIDnr(10, 'mod10')), []);

    return (
        <div className={styles.generateOneKIDnr}>
            <label htmlFor="generateOneKIDnr__output">Generert KID-nummer (MOD10):</label>
            <div className={styles.outputWrapper}>
                <output className={styles.output}>
                    <Input
                        id="generateOneKIDnr__output"
                        className={styles.input}
                        value={generatedKID}
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
                        copyToClipboard(generatedKID);
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
            <Button onClick={() => setGeneratedKID(generateKIDnr(10, 'mod10'))} className={styles.generateButton}>
                Generer et nytt
            </Button>
        </div>
    );
};
