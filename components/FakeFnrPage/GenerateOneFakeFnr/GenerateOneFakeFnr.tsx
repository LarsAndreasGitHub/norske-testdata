import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import styles from './generateOneFakeFnr.module.scss';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { ButtonGhost } from '../../common/Button/ButtonGhost';
import { copyToClipboard } from '../../copy-utils';
import { FakeFnrConfig, generateFakeFnr } from '../fake-fnr-utils';

export const GenerateOneFakeFnr: FunctionComponent = () => {
    const [generatedFakeFnr, setGeneratedFakeFnr] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);
    const copiedTimer = useRef<any>();
    const copyButtonRef = useRef<HTMLButtonElement>();
    const [fakeFnrConfig, setFakeFnrConfig] = useState<FakeFnrConfig>({
        addToMonths: 20,
    });

    useEffect(() => setGeneratedFakeFnr(generateFakeFnr(fakeFnrConfig)), []);

    const generateFakeFnrAndSetState = () => {
        setGeneratedFakeFnr(generateFakeFnr(fakeFnrConfig));
    };

    return (
        <div className={styles.generateFakeFnr}>
            <label htmlFor="generateFakeFnr__output">
                Generert fiktivt fødselsnummer (med +{fakeFnrConfig.addToMonths} på måned):
            </label>
            <div className={styles.outputWrapper}>
                <output className={styles.output}>
                    <Input
                        id="generateFakeFnr__output"
                        className={styles.input}
                        value={generatedFakeFnr}
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
                        copyToClipboard(generatedFakeFnr);
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
            <Button onClick={generateFakeFnrAndSetState} className={styles.generateButton}>
                Generer et nytt
            </Button>
        </div>
    );
};
