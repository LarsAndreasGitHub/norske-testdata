import * as React from 'react';
import { FunctionComponent } from 'react';
import Head from 'next/head';
import { PageWrapper } from '../common/PageWrapper/PageWrapper';
import { PanelLink } from '../common/link/PanelLink/PanelLink';
import styles from './homePage.module.scss';

export const HomePage: FunctionComponent = () => {
    return (
        <>
            <Head>
                <title>Generer og valider norske testdata</title>
                <meta
                    name="description"
                    content="Generer og valider norske testdata. Fødselsnumre, organisasjonsnumre, kontonumre."
                />
            </Head>
            <PageWrapper title="Norske testdata">
                <p>
                    Denne siden tilbyr generering og validering av diverse norske testdata til bruk i testing for
                    programvareutviklere. Velg hvilke testdata du er interessert i.
                </p>
                <div className={styles.buttonWrapper}>
                    <PanelLink href={'/fnr'}>
                        <div>Fødselsnumre</div>
                    </PanelLink>
                    <PanelLink href={'/orgnr'}>
                        <div>Organisasjonsnumre</div>
                    </PanelLink>
                    <PanelLink href={'/kontonr'}>
                        <div>Kontonumre</div>
                    </PanelLink>
                </div>
            </PageWrapper>
        </>
    );
};
