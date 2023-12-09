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
                <p className={styles.introText}>
                    Denne siden tilbyr generering og validering av diverse norske testdata til bruk i testing for
                    programvareutviklere og -testere. Velg hvilke testdata du er interessert i.
                </p>
                <div className={styles.buttonWrapper}>
                    <PanelLink href={'/fnr'} className={styles.panelLink}>
                        <div>Fødselsnumre</div>
                    </PanelLink>
                    <PanelLink href={'/fiktivt-fnr'} className={styles.panelLink}>
                        <div>Fiktive fødselsnumre</div>
                    </PanelLink>
                </div>
                <div className={styles.buttonWrapper}>
                    <PanelLink href={'/orgnr'} className={styles.panelLink}>
                        <div>Organisasjonsnumre</div>
                    </PanelLink>
                    <PanelLink href={'/kontonr'} className={styles.panelLink}>
                        <div>Kontonumre</div>
                    </PanelLink>
                </div>
                <div className={styles.buttonWrapper}>
                    <PanelLink href={'/kid-nr'} className={styles.panelLink}>
                        <div>KID-numre</div>
                    </PanelLink>
                </div>
            </PageWrapper>
        </>
    );
};
