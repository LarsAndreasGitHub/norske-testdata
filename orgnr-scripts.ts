const weigths = [3, 2, 7, 6, 5, 4, 3, 2];
const validationRegExp = new RegExp('[0-9]{9}');

// https://www.brreg.no/om-oss/oppgavene-vare/alle-registrene-vare/om-enhetsregisteret/organisasjonsnummeret/

const getControlDigit = (first8DigitsInOrgnr: number[]): number | 'invalid' => {
    const weigthedSumMod11 =
        first8DigitsInOrgnr
            .slice(0, 8)
            .map((siffer, index) => siffer * weigths[index])
            .reduce((a, b) => a + b) % 11;

    const controlDigit = 11 - weigthedSumMod11;

    return controlDigit === 10 ? 'invalid' : controlDigit;
};

const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
};

const get8RandomDigits = (): number[] => {
    const digits: number[] = [];
    for (let i = 0; i < 8; i++) {
        digits.push(getRandomInt(10));
    }
    return digits;
};

export const validateOrgnr = (orgnr: string): boolean => {
    if (!validationRegExp.test(orgnr)) {
        return false;
    }

    const orgnrAsDigits = orgnr.split('').map(digitStr => parseInt(digitStr));
    const controlDigit = getControlDigit(orgnrAsDigits);
    return controlDigit === orgnrAsDigits[8];
};

export const generateOrgnr = () => {
    let randomDigits: number[] = [];
    let controlDigit: number | 'invalid' = 'invalid';

    while (controlDigit === 'invalid') {
        randomDigits = get8RandomDigits();
        controlDigit = getControlDigit(randomDigits);
    }

    return [...randomDigits, controlDigit].reduce((a, b) => `${a}${b}`, '');
};
