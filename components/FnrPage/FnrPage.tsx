import { default as React, FunctionComponent } from 'react';
import Head from 'next/dist/next-server/lib/head';
import linkStyle from '../common/link/link.module.scss';
import { PageWrapper } from '../common/PageWrapper/PageWrapper';
import { FnrIntroText } from './FnrIntroText';
import Link from 'next/link';
import { GenerateOneFnr } from './GenerateOneFnr/GenerateOneFnr';
import { SeparatorLine } from '../common/SeparatorLine/SeparatorLine';
import { GenerateMultipleFnrs } from './GenerateMultipleFnrs/GenerateMultipleFnrs';
import { ValidateFnr } from './ValidateFnr/ValidateFnr';
import { H2 } from '../common/typography/typography';
import { AnchorLink } from '../common/AnchorLink/AnchorLink';
import styles from './fnrPage.module.scss';

export const FnrPage: FunctionComponent = () => (
    <>
        <Head>
            <title>Generer fødselsnumre til testdata</title>
            <meta name="description" content="Valider fødselsnumre. Generer gyldige fødselsnumre til testdata." />
        </Head>
        <PageWrapper title="Generer og valider fødselsnumre">
            <nav>
                <Link href="/">
                    <a className={linkStyle.link}>
                        Annen testdata{' '}
                        <span role="img" aria-label="pil">
                            →
                        </span>
                    </a>
                </Link>
            </nav>
            <H2>
                <AnchorLink anchorTag={'fnr-generator'}>Fødselsnummer-generator</AnchorLink>
            </H2>
            <FnrIntroText />
            <GenerateOneFnr />
            <GenerateMultipleFnrs />
            <SeparatorLine />
            <H2 className={styles.valideringTitle}>
                <AnchorLink anchorTag={'fnr-validering'}>Validering av fødselsnumre</AnchorLink>
            </H2>
            <ValidateFnr />
        </PageWrapper>
    </>
);
