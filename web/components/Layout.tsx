import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Header from 'components/Header';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout = (props: LayoutProps) => {
  const { children, title = 'nekobit' } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container maxWidth={false}>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
