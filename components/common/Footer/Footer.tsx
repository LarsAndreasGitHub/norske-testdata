import * as React from 'react';
import { FunctionComponent } from 'react';
import styles from './footer.module.scss';
import linkStyle from '../link/link.module.scss';
import Link from 'next/link';
import { classNames } from '../../utils';

export const Footer: FunctionComponent = () => (
    <div className={styles.footer}>
        <div className={styles.footerContent}>
            <Link href="/cookies">
                <a className={classNames(linkStyle.link, styles.link)}>Cookies</a>
            </Link>
        </div>
    </div>
);
