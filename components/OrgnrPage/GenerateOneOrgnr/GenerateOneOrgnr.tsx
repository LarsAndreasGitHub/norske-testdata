import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import styles from './generateOneOrgnr.module.scss';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { generateOrgnr, generateUnusedOrgnr } from '../orgnr-utils';
import { Checkbox } from '../../common/Checkbox/Checkbox';
import { ButtonGhost } from '../../common/Button/ButtonGhost';
import { copyToClipboard } from '../../copy-utils';

export const GenerateOneOrgnr: FunctionComponent = () => {
    const [generatedOrgnr, setGeneratedOrgnr] = useState<string>('');
    const [checkBrreg, setCheckBrreg] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const copiedTimer = useRef<any>();
    const copyButtonRef = useRef<HTMLButtonElement>();

    useEffect(() => setGeneratedOrgnr(generateOrgnr()), []);

    const generateOrgnrAndSetState = () => {
        if (checkBrreg) {
            generateUnusedOrgnr().then(setGeneratedOrgnr);
        } else {
            setGeneratedOrgnr(generateOrgnr);
        }
    };

    return (
        <div className={styles.generateOneOrgnr}>
            <label htmlFor="generateOneOrgnr__output">Generert organisasjonsnummer:</label>
            <div className={styles.outputWrapper}>
                <output className={styles.output}>
                    <Input
                        id="generateOneOrgnr__output"
                        className={styles.input}
                        value={generatedOrgnr}
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
                        copyToClipboard(generatedOrgnr);
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
            <div className={styles.checkboxWrapper}>
                <label htmlFor="generering__brreg-checkbox">Garantér at det er ubrukt:</label>
                <Checkbox
                    id="generering__brreg-checkbox"
                    checked={checkBrreg}
                    onChange={() => setCheckBrreg(!checkBrreg)}
                />
            </div>
            <Button onClick={generateOrgnrAndSetState} className={styles.generateButton}>
                Generer et nytt
            </Button>
        </div>
    );
};
