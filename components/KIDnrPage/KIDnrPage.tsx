import * as React from 'react';
import { FunctionComponent } from 'react';
import { GenerateOneKIDnr } from './GenerateOneKIDnr/GenerateOneKIDnr';
import Head from 'next/head';
import { PageWrapper } from '../common/PageWrapper/PageWrapper';
import { H2 } from '../common/typography/typography';
import { AnchorLink } from '../common/AnchorLink/AnchorLink';
import { GenerateMultipleKIDnrs } from './GenerateMultipleKIDnrs/GenerateMultipleKIDnrs';
import { HomeNavigation } from '../common/HomeNavigation/HomeNavigation';

export const KIDnrPage: FunctionComponent = () => (
    <>
        <Head>
            <title>Generer KID-numre til testdata</title>
            <meta name="description" content="Generer gyldige KID-numre til testdata." />
        </Head>
        <PageWrapper title="Generer KID-numre">
            <HomeNavigation />
            <H2>
                <AnchorLink anchorTag={'kidnr-generator'}>KID-nummer-generator</AnchorLink>
            </H2>
            <GenerateOneKIDnr />
            <GenerateMultipleKIDnrs />
        </PageWrapper>
    </>
);
