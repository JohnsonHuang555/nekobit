import React from 'react';
import Head from 'next/head';

const Meta = ({
  title = 'Game Platform',
  description = 'Let\'s play a game.',
  keywords = 'Game platform',
  ogtitle = 'Game Platform',
  ogdescription = 'Let\'s play a game.',
  ogtype = 'website',
  ogimage = '',
  ogsitename = 'Game platform',
  ogurl = '',
  swiper = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css',
}) => (
  <Head>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta property="og:title" content={ogtitle} />
    <meta property="og:description" content={ogdescription} />
    <meta property="og:type" content={ogtype} />
    <meta property="og:image" content={ogimage} />
    <meta property="og:site_name" content={ogsitename} />
    <meta property="og:url" content={ogurl} />
    <link rel="stylesheet" href={swiper} />
  </Head>
);

export default Meta;
