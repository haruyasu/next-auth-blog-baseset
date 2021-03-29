import '../../styles/globals.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement } from 'react'

import Layout from '../components/layout/layout'

export default function MyApp({
  Component,
  pageProps
}: AppProps): ReactElement {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
