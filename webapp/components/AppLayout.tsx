import React, { useEffect } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import styles from 'styles/components/layout.module.scss';
import { User } from 'domain/models/User';
import { setUserInfo } from 'slices/appSlice';
import { useDispatch } from 'react-redux';
import { Container } from 'next/app';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('userInfo');
    if (user) {
      const uiObj: User = JSON.parse(user);
      dispatch(setUserInfo(uiObj));
    }
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>nekobit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <main className={styles.main}>{props.children}</main>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
