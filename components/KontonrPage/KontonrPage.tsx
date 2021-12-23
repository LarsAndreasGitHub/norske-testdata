import * as React from 'react';
import { FunctionComponent } from 'react';
import { GenerateOneKontonr } from './GenerateOneKontonr/GenerateOneKontonr';
import linkStyle from '../common/link/link.module.scss';
import Head from 'next/head';
import { PageWrapper } from '../common/PageWrapper/PageWrapper';
import Link from 'next/link';
import { H2 } from '../common/typography/typography';
import { AnchorLink } from '../common/AnchorLink/AnchorLink';
import { GenerateMultipleKontonrs } from './GenerateMultipleKontonrs/GenerateMultipleKontonrs';

export const KontonrPage: FunctionComponent = () => (
    <>
        <Head>
            <title>Generer kontonumre til testdata</title>
            <meta name="description" content="Generer gyldige kontonumre til testdata." />
        </Head>
        <PageWrapper title="Generer kontonumre">
            <H2>
                <AnchorLink anchorTag={'kontonr-generator'}>Kontonummer-generator</AnchorLink>
            </H2>
            <GenerateOneKontonr />
            <GenerateMultipleKontonrs />
        </PageWrapper>
    </>
);
