import { FunctionComponent } from 'react';
import styles from './panelLink.module.scss';
import { classNames } from '../../../utils';
import Link from 'next/link';

interface Props {
    href: string;
    className?: string;
}

export const PanelLink: FunctionComponent<Props> = (props) => {
    return (
        <Link href={props.href}>
            <a className={classNames(styles.link, props.className)}>{props.children}</a>
        </Link>
    );
};
