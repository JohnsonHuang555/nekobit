import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import styles from 'styles/components/layout.module.scss';

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
      <Header />
      <main className={styles.main}>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
