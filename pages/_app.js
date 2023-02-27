import '../styles/globals.css';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Script id="gtm-head" strategy="beforeInteractive">
            {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            `}
            </Script>
            <Script id="gtm-body" strategy="afterInteractive">
            <noscript
                dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                }}
            />
            </Script>
            <Component {...pageProps} />
        </>
    );
}