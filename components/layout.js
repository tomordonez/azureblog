import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Tom Ordonez';
export const siteTitle = 'Learning Azure - Tom Ordonez';

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/images/favicon.ico" />
                <meta
                    name="description"
                    content="Learning Azure and Data Analytics"
                />
                <meta name="og:title" content={siteTitle} />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <Image
                            priority
                            src="/images/azureblog.jpg"
                            className={utilStyles.borderCircle}
                            height={144}
                            width={144}
                            alt="Learning Azure with Tom Ordonez"
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <Image
                                priority
                                src="/images/azureblog.jpg"
                                className={utilStyles.borderCircle}
                                height={108}
                                width={108}
                                alt="Learning Azure with Tom Ordonez"
                            />
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/" className={utilStyles.colorInherit}>
                                {name}
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">-- Back to home</Link>
                </div>
            )}
        </div>
    );
}