import * as React from 'react';
import { FunctionComponent } from 'react';
import { GenerateOneOrgnr } from './GenerateOneOrgnr/GenerateOneOrgnr';
import linkStyle from '../common/link/link.module.scss';
import { OrgnrIntroText } from './OrgnrIntroText/OrgnrIntroText';
import { GenerateMultipleOrgnrs } from './GenerateMultipleOrgnrs/GenerateMultipleOrgnrs';
import Head from 'next/head';
import { PageWrapper } from '../common/PageWrapper/PageWrapper';
import Link from 'next/link';
import { ValidateOrgnr } from './ValidateOrgnr/ValidateOrgnr';
import { OrgnrValidationIntroText } from './OrgnrValidationIntroText';
import { OrgnrValidationExplanation } from './OrgnrValidationExplanation';
import { H2 } from '../common/typography/typography';
import { AnchorLink } from '../common/AnchorLink/AnchorLink';
import styles from './orgnrPage.module.scss';

export const OrgnrPage: FunctionComponent = () => (
    <>
        <Head>
            <title>Generer organisasjonsnumre til testdata</title>
            <meta
                name="description"
                content="Valider organisasjonsnumre. Generer gyldige, ubrukte organisasjonsnumre til testdata."
            />
        </Head>
        <PageWrapper title="Generer og valider organisasjonsnumre">
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
                <AnchorLink anchorTag={'orgnr-generator'}>Organisasjonsnummer-generator</AnchorLink>
            </H2>
            <GenerateOneOrgnr />
            <OrgnrIntroText />
            <GenerateMultipleOrgnrs />
            <H2 className={styles.valideringTitle}>
                <AnchorLink anchorTag={'orgnr-validering'}>Validering av organisasjonsnumre</AnchorLink>
            </H2>
            <OrgnrValidationIntroText />
            <ValidateOrgnr />
            <OrgnrValidationExplanation />
        </PageWrapper>
    </>
);
