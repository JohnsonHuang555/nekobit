import React from 'react';
import dynamic from 'next/dynamic'
import Meta from 'src/components/Meta';
import Footer from 'src/components/Footer';
// import '@styles/components/layout.scss';

const Header = dynamic(
  () => import('./Header'),
  { ssr: false }
)

type LayoutProps = {
  id?: string;
  children: React.ReactNode;
  meta?: any;
};

const Layout = (props: LayoutProps) => {
  const {
    id,
    children,
    meta,
  } = props;

  return (
    <>
      <Meta {...meta} />
      {/* <Header /> */}
      <div id={id} className="container">
        {children}
      </div>
      {/* <Footer /> */}
    </>
  )
};

export default Layout;
