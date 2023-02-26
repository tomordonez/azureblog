import '../styles/globals.css';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=G-Z06H38L0L1`}
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag() {
                        dataLayer.push(arguments);
                        gtag('js', new Date());
                        gtag('config', 'G-Z06H38L0L1');
                    }`
                }}
            />
            <Component {...pageProps} />
        </>
    );
}