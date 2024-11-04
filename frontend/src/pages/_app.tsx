import type { AppProps } from 'next/app'
import 'styles/globals.css'
import Layout from 'components/layout/Layout'
import ProtectedRoute from 'components/ProtectedRoute'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ProtectedRoute>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    // </ProtectedRoute>
  )
}

export default MyApp
