import React from 'react';
import dynamic from 'next/dynamic'
import Meta from 'src/components/Meta';
import Footer from 'src/components/Footer';
import { Container } from '@material-ui/core';
// import '@styles/components/layout.scss';

const Header = dynamic(
  () => import('./Header'),
  { ssr: false }
)

type LayoutProps = {
  children: React.ReactNode;
  meta?: any;
};

const Layout = (props: LayoutProps) => {
  const {
    children,
    meta,
  } = props;

  return (
    <>
      <Meta {...meta} />
      {/* <Header /> */}
      <Container>
        {children}
      </Container>
      {/* <Footer /> */}
    </>
  )
};

export default Layout;
