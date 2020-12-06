import { default as React, FunctionComponent } from 'react';

export const OrgnrValidationExplanation: FunctionComponent = () => (
    <>
        <h3>Hvordan fungerer valideringen?</h3>
        <p>
            Validering av organisasjonsnumre er lignende, men enklere enn validering av fødselsnumre. Det niende (og
            siste) sifferet er et kontrollsiffer som må være mellom 0 og 9.
        </p>
        <p>
            Kontrollsifferet regnes ut på følgende måte. Først tar vi en <i>vektet sum</i> av de åtte første tallene i
            organisasjonsnummeret, med vekttallene 3, 2, 7, 6, 5, 4, 3 og 2. Det betyr at vi ganger det første tallet i
            organisasjonsnummeret med 3, det andre med 2, og så videre, og summerer opp alt til slutt. Deretter regner
            vi ut denne summen <i>modulo 11</i> – altså resten av summen når vi deler den på 11. Til slutt regner vi ut
            11 minus denne resten. Dette tallet er kontrollsifferet, med to unntak:
        </p>
        <ul>
            <li>Hvis tallet er 11, blir kontrollsifferet 0.</li>
            <li>Hvis tallet er 10, er organisasjonsnummeret ugyldig.</li>
        </ul>
        <h3>Et eksempel</h3>
        <p>
            La oss si at vi vil sjekke om organisasjonsnummeret 701730496 er gyldig. Kontrollsifferet i dette nummeret
            er 5, så la oss regne ut om dette stemmer.
            <br />
            Den vektede summen for de første åtte tallene, er
        </p>
        <p style={{ marginLeft: '2rem' }}>
            7·3 + 0·2 + 1·7 + 7·6 + 3·5 + 0·4 + 4·3 + 9·2 ={' '}
            <u>
                <strong>115</strong>
            </u>
            .
        </p>
        <p>
            115 modulo 11 er lik 5. Dette kan enten regnes ut ved å bruke modulo-operatoren (betegnet '%' i mange
            programmeringsspråk), eller ved å regne ut at
        </p>
        <p style={{ marginLeft: '2rem' }}>
            115/11 = 10 +{' '}
            <u>
                <strong>5</strong>
            </u>
            /11.
        </p>
        <p>Til slutt kan vi regne ut kontrollsifferet:</p>
        <p style={{ marginLeft: '2rem' }}>
            kontrollsiffer = 11 - 5 ={' '}
            <u>
                <strong>6</strong>
            </u>
            .
        </p>
        <p>
            Det er det sifferet som står i det opprinnelige organisasjonsnummeret, så vi kan konkludere med at nummeret
            er gyldig!
        </p>
    </>
);
