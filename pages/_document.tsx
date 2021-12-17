import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html lang="nb">
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="icon" href="/favicon.svg" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-4RF77WRLYJ" />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag() {
                                    dataLayer.push(arguments);
                                }
                                gtag('js', new Date());
                                gtag('config', 'G-4RF77WRLYJ');
                            `,
                        }}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(h,o,t,j,a,r){
                                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                                    h._hjSettings={hjid:2749544,hjsv:6};
                                    a=o.getElementsByTagName('head')[0];
                                    r=o.createElement('script');r.async=1;
                                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                                    a.appendChild(r);
                                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                            `,
                        }}
                    />
                    <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4866287046383266"
                        crossOrigin="anonymous"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
