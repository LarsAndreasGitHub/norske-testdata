import React from 'react';
import Head from 'next/head';

const RedirectToOrgnrPage = () => (
    <Head>
        <meta httpEquiv="Refresh" content="0; url='/orgnr'" />
        <title>Generer organisasjonsnumre til testdata</title>
    </Head>
);

export default RedirectToOrgnrPage;
