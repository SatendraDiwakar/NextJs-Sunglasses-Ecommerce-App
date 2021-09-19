import '../styles/globals.css'
// context
import ModalProvider from '../Components/ModalCtx'
import StoreProvider from '../utils/Store'
// component
import Layout from '../Components/layout'


function MyApp({ Component, pageProps }) {
  return <>
    <StoreProvider>
      <ModalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalProvider>
    </StoreProvider>
  </>
}

export default MyApp
