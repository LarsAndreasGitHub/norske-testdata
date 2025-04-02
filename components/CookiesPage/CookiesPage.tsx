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
            <HomeNavigation text="Testdata" />
            <p>Dette nettstedet benytter seg ikke av cookies for øyeblikket.</p>
        </PageWrapper>
    </>
);
