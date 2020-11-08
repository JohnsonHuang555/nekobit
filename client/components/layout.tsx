import React from 'react';
import Head from 'next/head';
import styles from 'styles/Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App1111</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.children}
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default Layout;
