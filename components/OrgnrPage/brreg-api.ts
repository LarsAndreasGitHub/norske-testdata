export const brregEnhetUrl = (orgnr) => 'https://data.brreg.no/enhetsregisteret/api/enheter/' + orgnr;
export const brregUnderenhetUrl = (orgnr) => 'https://data.brreg.no/enhetsregisteret/api/underenheter/' + orgnr;

export enum RestStatus {
    Loading = 'Loading',
    NotFound = 'NotFound',
    Error = 'Error',
    OK = 'OK',
}

export type RestResource<T> =
    | { status: RestStatus.Loading }
    | { status: RestStatus.Error }
    | { status: RestStatus.NotFound }
    | { status: RestStatus.OK; data: T };

export type BrregResponse = { name?: string };

export const orgnrBelongsToEnhet = async (orgnr: string): Promise<RestResource<BrregResponse>> => {
    const response = await fetch(brregEnhetUrl(orgnr));
    if (response.status === 200) {
        const responseJson = await response.json();
        return {
            status: RestStatus.OK,
            data: {
                name: responseJson.navn ? responseJson.navn : undefined,
            },
        };
    }
    if (response.status === 404) return { status: RestStatus.NotFound };
    return { status: RestStatus.Error };
};

export const orgnrBelongsToUnderenhet = async (orgnr: string): Promise<RestResource<BrregResponse>> => {
    const response = await fetch(brregUnderenhetUrl(orgnr));
    if (response.status === 200) {
        const responseJson = await response.json();
        return {
            status: RestStatus.OK,
            data: {
                name: responseJson.navn ? responseJson.navn : undefined,
            },
        };
    }
    if (response.status === 404) return { status: RestStatus.NotFound };
    return { status: RestStatus.Error };
};

export const orgnrExistsInBrreg = async (orgnr: string): Promise<boolean | 'error'> => {
    const enhetResponse = await orgnrBelongsToEnhet(orgnr);
    if (enhetResponse.status === RestStatus.OK) return true;
    if (enhetResponse.status === RestStatus.Error) return 'error';

    const underenhetResponse = await orgnrBelongsToUnderenhet(orgnr);
    if (underenhetResponse.status === RestStatus.OK) return true;
    if (underenhetResponse.status === RestStatus.Error) return 'error';

    if (enhetResponse.status === RestStatus.NotFound && underenhetResponse.status === RestStatus.NotFound) {
        return false;
    }
    return 'error';
};
