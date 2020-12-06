import { FunctionComponent, default as React } from 'react';
import styles from './icons.module.scss';
import { classNames } from '../../utils';

export const NotValidIcon: FunctionComponent<{ className?: string }> = ({ className }) => (
    <span role="img" aria-label="ikon ikke gyldig" className={classNames(styles.notValid, className)}>
        ✗
    </span>
);

export const ValidIcon: FunctionComponent<{ className?: string }> = ({ className }) => (
    <span role="img" aria-label="ikon gyldig" className={classNames(styles.valid, className)}>
        ✔
    </span>
);
