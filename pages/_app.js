import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
// context
import ModalProvider from '../Components/ModalCtx'
import StoreProvider from '../utils/Store'
// component
import Layout from '../Components/layout'


function MyApp({ Component, pageProps }) {

  const router = useRouter();

  useEffect(()=>{
    if (router.pathname === '/cart')
      document.getElementsByTagName('html')[0].style = 'background: rgb(236, 228, 228)'
    else
      document.getElementsByTagName('html')[0].style = 'background: rgba(241, 241, 241, 0.35)'
  },[router.pathname])

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
