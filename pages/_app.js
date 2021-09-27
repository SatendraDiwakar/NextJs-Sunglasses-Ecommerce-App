import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
// context
import ModalProvider from '../Components/ModalCtx'
import NotifyProvider from '../utils/NotifyCtx'
import StoreProvider from '../utils/Store'
// component
import Layout from '../Components/layout'


function MyApp({ Component, pageProps }) {

  const router = useRouter();

  useEffect(()=>{
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  },[])

  useEffect(() => {
    if (router.pathname === '/cart')
      document.getElementsByTagName('html')[0].style = 'background: rgb(236, 228, 228)'
    else
      document.getElementsByTagName('html')[0].style = 'background: rgba(241, 241, 241, 0.35)'
  }, [router.pathname])

  return <>
    <NotifyProvider>
      <StoreProvider>
        <ModalProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ModalProvider>
      </StoreProvider>
    </NotifyProvider>
  </>
}

export default MyApp
