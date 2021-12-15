import * as React from 'react';
import { FunctionComponent } from 'react';
import Head from 'next/head';
import { PageWrapper } from '../common/PageWrapper/PageWrapper';
import Link from 'next/link';
import linkStyle from '../common/link/link.module.scss';
import { classNames } from '../utils';
import styles from './cookiesPage.module.scss';

export const CookiesPage: FunctionComponent = () => (
    <>
        <Head>
            <title>Norske testdata – cookies</title>
        </Head>
        <PageWrapper title="Norske testdata – cookies">
            <nav className={styles.navigation}>
                <div>
                    <Link href="/fnr">
                        <a className={linkStyle.link}>
                            Generer fødselsnumre{' '}
                            <span role="img" aria-label="pil">
                                →
                            </span>
                        </a>
                    </Link>
                </div>
                <div>
                    <Link href="/orgnr">
                        <a className={linkStyle.link}>
                            Generer organisasjonsnumre{' '}
                            <span role="img" aria-label="pil">
                                →
                            </span>
                        </a>
                    </Link>
                </div>
            </nav>
            <p>Dette nettstedet benytter seg av cookies for å forbedre din brukeropplevelse:</p>
            <ul>
                <li>Cookies for innhenting av brukerstatistikk (Google Analytics)</li>
                <li>Cookies for brukertilbakemeldinger (Hotjar)</li>
            </ul>
        </PageWrapper>
    </>
);
