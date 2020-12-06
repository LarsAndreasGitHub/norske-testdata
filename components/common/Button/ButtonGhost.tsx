import React, { forwardRef, ForwardRefExoticComponent, FunctionComponent, HTMLProps, MutableRefObject } from 'react';
import styles from './button.module.scss';
import { classNames } from '../../utils';

type Props = HTMLProps<HTMLButtonElement> & {
    green?: boolean;
};

export const ButtonGhost: ForwardRefExoticComponent<Props> = forwardRef((props, ref) => {
    const { green, children, ...buttonProps } = props;
    return (
        <button
            {...buttonProps}
            type="submit"
            ref={ref}
            className={classNames(styles.buttonGhost, props.green && styles.green, props.className)}
        >
            {children}
        </button>
    );
});
