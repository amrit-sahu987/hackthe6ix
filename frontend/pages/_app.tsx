import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A beautifully styled Next.js app" />
        <title>All App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
