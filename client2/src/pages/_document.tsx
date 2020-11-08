import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class GamePlayDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <style>{`
            #__next {
              height: 100%;
              display: flex;
              flex-direction: column;
            }
          `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default GamePlayDocument;
