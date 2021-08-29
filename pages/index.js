import Image from 'next/image'
// component
import Hero from '../Components/main/Hero'
import TopSeller from '../Components/main/TopSeller'
import Sale from '../Components/main/Sale'

import TopBrands from '../Components/main/TopBrands'
import Footer from '../Components/main/Footer'

export default function Home() {
  return <>
    <Hero />
    <TopSeller />
    <Sale />
    <TopBrands />
    <Footer />
  </>
}
