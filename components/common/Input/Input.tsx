import * as React from 'react';
import { FunctionComponent, InputHTMLAttributes } from 'react';
import styles from './input.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input: FunctionComponent<Props> = props => {
    const className = styles.input + (props.className ? ' ' + props.className : '');
    return <input {...props} className={className} />;
};
