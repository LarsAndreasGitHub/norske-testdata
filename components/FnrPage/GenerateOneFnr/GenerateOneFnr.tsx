import { FunctionComponent } from 'react';
import * as React from 'react';
import { Button } from '../../common/Button/Button';
import { copyToClipboard } from '../../tmp-utils';
import { generateFnr } from '../fnr-utils';
import styles from './generateOneFnr.module.scss';

export const GenerateOneFnr: FunctionComponent = () => {
    return (
        <div className={styles.generateOneFnr}>
            <Button className={styles.generateButton} onClick={() => copyToClipboard(generateFnr())}>
                Generer fnr og kopier til utklippstavlen
            </Button>
        </div>
    );
};
