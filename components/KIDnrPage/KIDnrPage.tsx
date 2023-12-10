import * as React from 'react';
import { FunctionComponent } from 'react';
import { GenerateOneKIDnr } from './GenerateOneKIDnr/GenerateOneKIDnr';
import Head from 'next/head';
import { PageWrapper } from '../common/PageWrapper/PageWrapper';
import { H2 } from '../common/typography/typography';
import { AnchorLink } from '../common/AnchorLink/AnchorLink';
import { GenerateMultipleKIDnrs } from './GenerateMultipleKIDnrs/GenerateMultipleKIDnrs';
import { HomeNavigation } from '../common/HomeNavigation/HomeNavigation';
import linkStyles from '../common/link/link.module.scss';

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
            <p>
                De genererte numrene tilfredsstiller enten MOD10 eller MOD11 som beskrevet i{' '}
                <a
                    className={linkStyles.link}
                    href="https://www.nets.eu/no-nb/PublishingImages/Lists/Accordion%20%20OCR%20giro/AllItems/OCR%20giro%20Systemspesifikasjon.pdf"
                >
                    OCR-spesifikasjonen til Nets
                </a>
                .
            </p>
            <GenerateMultipleKIDnrs />
        </PageWrapper>
    </>
);
