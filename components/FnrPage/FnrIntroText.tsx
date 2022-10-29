import * as React from 'react';
import { FunctionComponent } from 'react';
import Link from 'next/link';
import linkStyles from '../common/link/link.module.scss';

export const FnrIntroText: FunctionComponent = () => (
    <>
        <p>
            Velkommen til denne fødselsnummer-generatoren! Her kan du lage gyldige fødselsnumre til bruk som testdata.
            Det er mulig de genererte fødselsnumrene er i bruk av ekte personer, så{' '}
            <strong>ikke legg fødselsnumrene inn i åpne kodebaser</strong> av hensyn til personvern. Hvis du har
            mulighet anbefales det heller å bruke{' '}
            <Link href={'/fiktivt-fnr'} className={linkStyles.link}>
                generatoren for fiktive fødselsnumre.
            </Link>
        </p>
        <p>
            For å unngå at de genererte fødselsnumrene blir indeksert av søkemotorer i størst mulig grad, viser vi ikke
            fødselsnumrene åpent på denne siden. I stedet kopierer vi fødselsnumrene til utklippstavlen din.
        </p>
    </>
);
