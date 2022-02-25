import { default as React, FunctionComponent } from 'react';
import Link from 'next/link';
import linkStyle from '../link/link.module.scss';

interface Props {
    text?: string;
}

export const HomeNavigation: FunctionComponent<Props> = ({ text }) => (
    <nav>
        <Link href="/">
            <a className={linkStyle.link}>
                <span role="img" aria-label="pil">
                    ←
                </span>{' '}
                {text || 'Andre testdata'}
            </a>
        </Link>
    </nav>
);
