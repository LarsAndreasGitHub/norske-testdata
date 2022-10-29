import { default as React, FunctionComponent } from 'react';
import linkStyle from '../../common/link/link.module.scss';

export const FiktivtFnrIntroText: FunctionComponent = () => (
    <>
        <p>
            Fiktive eller syntetiske fødselsnumre er ikke ekte fødselsnumre. En vanlig måte å lage fiktive fødselsnumre
            på er å{' '}
            <a
                href="https://www.skatteetaten.no/person/folkeregister/fodsel-og-navnevalg/barn-fodt-i-norge/fodselsnummer/"
                className={linkStyle.link}
            >
                følge oppbyggingen til vanlige fødselsnumre
            </a>
            , men å legge til et tall i delen av fødselsnummeret som representerer fødselsdatoen, slik at den ikke
            lenger er en gyldig dato. Slike fødselsnummere vil bestå validering som bare sjekker kontrollsifre, men ikke
            de som kontrollerer dato. Pass på at du velger riktig oppbygging til bruk i din virksomhet.
        </p>
    </>
);
