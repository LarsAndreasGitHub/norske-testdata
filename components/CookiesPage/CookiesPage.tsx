import * as React from 'react';
import { FunctionComponent } from 'react';
import Head from 'next/head';
import { PageWrapper } from '../common/PageWrapper/PageWrapper';
import { HomeNavigation } from '../common/HomeNavigation/HomeNavigation';

export const CookiesPage: FunctionComponent = () => (
    <>
        <Head>
            <title>Norske testdata – cookies</title>
        </Head>
        <PageWrapper title="Norske testdata – cookies">
            <HomeNavigation text="Til forsiden"/>
            <p>Dette nettstedet benytter seg av cookies for å forbedre din brukeropplevelse:</p>
            <ul>
                <li>Cookies for innhenting av brukerstatistikk (Google Analytics)</li>
                <li>Cookies for personaliserte reklamer (Google AdSense)</li>
                <li>Cookies for brukertilbakemeldinger (Hotjar)</li>
            </ul>
        </PageWrapper>
    </>
);
