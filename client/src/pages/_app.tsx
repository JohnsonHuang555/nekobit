import React from 'react';
import App from 'next/app';
import Router from 'next/router';

export default class GamePlayApp extends App {
  componentDidMount() {
    Router.events.on('routeChangeStart', this.handleRouteChange)
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Component {...pageProps} />
    );
  }

  private handleRouteChange(): void {
    console.log(123456)
  }
}