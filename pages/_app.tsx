import type { AppProps } from 'next/app';
import Navbar from '../components/navbar';
import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>GitExplorer</title>
        <link rel="shortcut icon" href="/images/favicon.png" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
