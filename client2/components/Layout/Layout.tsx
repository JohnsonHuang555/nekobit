import React from 'react';
import dynamic from 'next/dynamic'
import Meta from '../Meta/Meta';
import '@styles/layout.scss';

const Header = dynamic(
  () => import('../Header/Header'),
  { ssr: false }
)

type LayoutProps = {
  children: JSX.Element;
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
      <Header />
      {children}
    </>
  )
};

export default Layout;
