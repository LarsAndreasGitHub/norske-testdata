import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import styles from './generateOneFiktivtFnr.module.scss';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { ButtonGhost } from '../../common/Button/ButtonGhost';
import { copyToClipboard } from '../../tmp-utils';
import { FiktivtFnrConfig, generateFiktivtFnr } from '../fiktive-fnr-utils';

export const GenerateOneFiktivtFnr: FunctionComponent = () => {
    const [generatedFiktivFnr, setGeneratedFiktivFnr] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);
    const copiedTimer = useRef<any>();
    const copyButtonRef = useRef<HTMLButtonElement>();
    const [fiktivtFnrConfig, setFiktivtFnrConfig] = useState<FiktivtFnrConfig>({
        addToMonths: 20,
    });

    useEffect(() => setGeneratedFiktivFnr(generateFiktivtFnr(fiktivtFnrConfig)), []);

    const generateFiktivtFnrAndSetState = () => {
        setGeneratedFiktivFnr(generateFiktivtFnr(fiktivtFnrConfig));
    };

    return (
        <div className={styles.generateFiktivtFnr}>
            <label htmlFor="generateFiktivtFnr__output">
                Generert fiktivt fødselsnummer (med +{fiktivtFnrConfig.addToMonths} på måned):
            </label>
            <div className={styles.outputWrapper}>
                <output className={styles.output}>
                    <Input
                        id="generateFiktivtFnr__output"
                        className={styles.input}
                        value={generatedFiktivFnr}
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
                        copyToClipboard(generatedFiktivFnr);
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
            <Button onClick={generateFiktivtFnrAndSetState} className={styles.generateButton}>
                Generer et nytt
            </Button>
        </div>
    );
};
