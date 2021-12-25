import { default as React, FunctionComponent } from 'react';
import Link from 'next/link';
import linkStyle from '../link/link.module.scss';

export const HomeNavigation: FunctionComponent = () => (
    <nav>
        <Link href="/">
            <a className={linkStyle.link}>
                <span role="img" aria-label="pil">
                    ←
                </span>{' '}
                Annen testdata
            </a>
        </Link>
    </nav>
);
