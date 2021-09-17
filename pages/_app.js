import '../styles/globals.css'
// component
import ShopProvider from '../Components/context'
import Layout from '../Components/layout'


function MyApp({ Component, pageProps }) {
  return <>
    <ShopProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ShopProvider>
  </>
}

export default MyApp
