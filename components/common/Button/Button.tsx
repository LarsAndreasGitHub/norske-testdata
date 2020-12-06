import React, { FunctionComponent, HTMLProps } from 'react';
import styles from './button.module.scss';
import { classNames } from '../../utils';

type Props = HTMLProps<HTMLButtonElement>;

export const Button: FunctionComponent<Props> = ({ children, ...buttonProps }) => (
    <button {...buttonProps} type="submit" className={classNames(styles.button, buttonProps.className)}>
        {children}
    </button>
);
