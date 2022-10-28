import { FunctionComponent, ReactNode } from 'react';
import styles from './panelLink.module.scss';
import { classNames } from '../../../utils';
import Link from 'next/link';

interface Props {
    href: string;
    children: ReactNode;
    className?: string;
}

export const PanelLink: FunctionComponent<Props> = (props) => {
    return (
        <Link href={props.href} className={classNames(styles.link, props.className)}>
            {props.children}
        </Link>
    );
};
