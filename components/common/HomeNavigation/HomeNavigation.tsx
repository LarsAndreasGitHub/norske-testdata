import { default as React, FunctionComponent } from 'react';
import Link from 'next/link';
import linkStyle from '../link/link.module.scss';

export const HomeNavigation: FunctionComponent<{ text?: string }> = ({ text }) => (
    <nav>
        <Link href="/" className={linkStyle.link}>
            <span role="img" aria-label="pil">
                ←
            </span>{' '}
            {text ?? 'Andre testdata'}
        </Link>
    </nav>
);
