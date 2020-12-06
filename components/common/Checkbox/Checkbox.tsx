import { FunctionComponent, InputHTMLAttributes, default as React } from 'react';
import styles from './checkbox.module.scss';

export const Checkbox: FunctionComponent<InputHTMLAttributes<HTMLInputElement>> = props => {
    const className = styles.checkbox + (props.className ? ' ' + props.className : '');
    return <input {...props} type="checkbox" className={className} />;
};
