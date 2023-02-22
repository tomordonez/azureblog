import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          I am a data analyst using Python, SQL, and Power BI. Contact me on <a href="https://www.linkedin.com/in/tomordonez/">Linkedin</a>.
        </p>
        <p>
          This is a blog about Azure and Data Analytics.
        </p>
      </section>
    </Layout>
  );
}