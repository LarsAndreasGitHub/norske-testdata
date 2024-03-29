import styles from './banner.module.scss';
import * as React from 'react';
import { FunctionComponent, ReactNode } from 'react';
import { H1 } from '../typography/typography';

export const Banner: FunctionComponent<{ children: ReactNode }> = (props) => (
    <div className={styles.banner__wrapper}>
        <H1 className={styles.banner}>{props.children}</H1>
    </div>
);
