import '../styles/globals.css'
// component
import Layout from '../Components/layout'


function MyApp({ Component, pageProps }) {
  return <>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
}

export default MyApp
