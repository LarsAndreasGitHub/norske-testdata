import { FunctionComponent } from 'react';
import * as React from 'react';

export const FnrIntroText: FunctionComponent = () => (
    <>
        <p>
            Velkommen til denne fødselsnummer-generatoren! Her kan du lage gyldige fødselsnumre til bruk som testdata.
            Det er mulig de genererte fødselsnumrene er i bruk av ekte personer, så{' '}
            <strong>ikke legg fødselsnumrene inn i åpne kodebaser</strong> av hensyn til personvern.
        </p>
        <p>
            For å unngå at de genererte fødselsnumrene blir indeksert av søkemotorer i størst mulig grad, viser vi ikke
            fødselsnumrene åpent på denne siden. I stedet kopierer vi fødselsnumrene til utklippstavlen din.
        </p>
    </>
);
