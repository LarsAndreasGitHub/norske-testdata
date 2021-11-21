import { default as React, FunctionComponent } from 'react';
import styles from './radio.module.scss';

type Props = {
    label: string;
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: any) => void;
};

export const Radio: FunctionComponent<Props> = ({ label, id, name, checked, onChange }) => {
    return (
        <div className={styles.wrapper}>
            <input
                className={styles.radio}
                type="radio"
                id={id}
                name={name}
                value="kopier"
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};
