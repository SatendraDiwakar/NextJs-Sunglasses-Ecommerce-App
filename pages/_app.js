import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
// context
import ModalProvider from '../Components/ModalCtx'
import NotifyProvider from '../utils/NotifyCtx'
import StoreProvider from '../utils/Store'
import LoaderProvider from '../Components/ui/LoaderCtx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
// component
import Layout from '../Components/Layout'


function MyApp({ Component, pageProps }) {

  const router = useRouter();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])

  useEffect(() => {
    if (router.pathname === '/cart')
      document.getElementsByTagName('html')[0].style = 'background: rgb(236, 228, 228)'
    else
      document.getElementsByTagName('html')[0].style = 'background: rgba(241, 241, 241, 0.35)'
  }, [router.pathname])

  return <>
    <LoaderProvider>
      <NotifyProvider>
        <StoreProvider>
          <ModalProvider>
            <Layout>
              <PayPalScriptProvider deferLoading={true}>
                <Component {...pageProps} />
              </PayPalScriptProvider>
            </Layout>
          </ModalProvider>
        </StoreProvider>
      </NotifyProvider>
    </LoaderProvider>
  </>
}

export default MyApp
