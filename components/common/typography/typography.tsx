import * as React from 'react';
import { FunctionComponent, HTMLProps } from 'react';
import styles from './typography.module.scss';
import { classNames } from '../../utils';

export const H1: FunctionComponent<HTMLProps<HTMLHeadingElement>> = ({ children, ...props }) => (
    <h1 {...props} className={classNames(styles.h1, props.className)}>
        {children}
    </h1>
);

export const H2: FunctionComponent<HTMLProps<HTMLHeadingElement>> = ({ children, ...props }) => (
    <h2 {...props} className={classNames(styles.h2, props.className)}>
        {children}
    </h2>
);
