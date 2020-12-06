import { default as React, FunctionComponent } from 'react';
import Head from 'next/dist/next-server/lib/head';
import linkStyle from '../common/link/link.module.scss';
import { PageWrapper } from '../common/PageWrapper/PageWrapper';
import { FnrIntroText } from './FnrIntroText';
import Link from 'next/link';
import { GenerateOneFnr } from './GenerateOneFnr/GenerateOneFnr';
import { SeparatorLine } from '../common/SeparatorLine/SeparatorLine';
import { GenerateMultipleFnrs } from './GenerateMultipleFnrs/GenerateMultipleFnrs';

export const FnrPage: FunctionComponent = () => (
    <>
        <Head>
            <title>Generer fødselsnumre til testdata</title>
            <meta name="description" content="Generer gyldige fødselsnumre du kan bruke som testdata." />
        </Head>
        <PageWrapper title="Generer gyldige fødselsnumre">
            <nav>
                <Link href="/orgnr">
                    <a className={linkStyle.link}>
                        Generer organisasjonsnumre{' '}
                        <span role="img" aria-label="pil">
                            →
                        </span>
                    </a>
                </Link>
            </nav>
            <FnrIntroText />
            <GenerateOneFnr />
            <SeparatorLine />
            <GenerateMultipleFnrs />
        </PageWrapper>
    </>
);
