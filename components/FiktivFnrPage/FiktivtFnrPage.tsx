import * as React from 'react';
import { FunctionComponent } from 'react';
import Head from 'next/head';
import { PageWrapper } from '../common/PageWrapper/PageWrapper';
import { H2 } from '../common/typography/typography';
import { AnchorLink } from '../common/AnchorLink/AnchorLink';
import { HomeNavigation } from '../common/HomeNavigation/HomeNavigation';
import { GenerateOneFiktivtFnr } from './GenerateOneFiktivtFnr/GenerateOneFiktivtFnr';
import { FiktivtFnrIntroText } from './FiktivtFnrText/FiktivtFnrIntroText';
import { GenerateMultipleFiktiveFnr } from './GenerateMultipleFiktiveFnr/GenerateMultipleFiktiveFnr';

export const FiktivtFnrPage: FunctionComponent = () => (
    <>
        <Head>
            <title>Generer fiktive fødselsnumre til testdata</title>
            <meta name="description" content="Generer fiktive fødselsnumre til testdata." />
        </Head>
        <PageWrapper title="Generer fiktive fødselsnumre">
            <HomeNavigation />
            <H2>
                <AnchorLink anchorTag={'fiktiv-fnr-generator'}>Generer fiktive fødselsnumre</AnchorLink>
            </H2>
            <GenerateOneFiktivtFnr />
            <FiktivtFnrIntroText />
            <GenerateMultipleFiktiveFnr />
        </PageWrapper>
    </>
);
