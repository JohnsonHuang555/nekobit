import React from 'react';
import App from 'next/app';
import AppContext from 'src/utils/AppContext';

export default class GamePlayApp extends App {
  state = {
    test: 'test'
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppContext.Provider value={{ test: this.state.test }}>
        <Component {...pageProps} />
      </AppContext.Provider>
    );
  }
}
