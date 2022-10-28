import { default as React, FunctionComponent } from 'react';
import linkStyle from '../../common/link/link.module.scss';

export const FiktivtFnrIntroText: FunctionComponent = () => (
    <>
        <p>
            Her kan du lage organisasjonsnumre til bruk som testdata. Numrene genereres tilfeldig, og følger reglene for
            oppbygging av organisasjonsnumre{' '}
            <a
                className={linkStyle.link}
                href="https://www.brreg.no/om-oss/oppgavene-vare/alle-registrene-vare/om-enhetsregisteret/organisasjonsnummeret/"
            >
                beskrevet hos Brønnøysundregistrene
            </a>
            .
        </p>
        <p>
            Hvis spesifisert, gjør vi kall mot Brønnøysundregistrene sitt{' '}
            <a href="https://data.brreg.no/enhetsregisteret/api/docs/index.html" className={linkStyle.link}>
                API
            </a>{' '}
            for å garantere at organisasjonsnummeret ikke er i bruk hos noen registrerte{' '}
            <a
                href="https://data.brreg.no/enhetsregisteret/api/docs/index.html#enheter-oppslag"
                className={linkStyle.link}
            >
                enheter
            </a>{' '}
            eller{' '}
            <a
                href="https://data.brreg.no/enhetsregisteret/api/docs/index.html#underenheter-oppslag"
                className={linkStyle.link}
            >
                underenheter
            </a>
            .
        </p>
    </>
);
