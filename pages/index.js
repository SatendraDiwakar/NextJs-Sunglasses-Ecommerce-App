import { useContext, useEffect } from 'react'
// context
import { ModalCtx } from '../Components/ModalCtx'
// components
import Hero from '../Components/main/Hero'
import TopSeller from '../Components/main/TopSeller'
import Sale from '../Components/main/Sale'
import OurCollection from '../Components/main/OurCollection'
import TopBrands from '../Components/main/TopBrands'
import Footer from '../Components/main/Footer'
import Portal from '../Components/HOC/Portal'
import ProductModal from '../Components/ui/ProductModal'
// backend
import db from '../utils/db'
import HeroPicModel from '../models/HeropicsModel'
import ProductModel from '../models/ProductModel'

export default function Home(props) {

  // identifiers
  const characters = props.characters[0];
  const { products } = props;
  const topSellerProd = products.filter(itm => itm.sectionName === 'topSeller');
  const saleProd = products.filter(itm => itm.sectionName === 'sale');
  const collectionProd = products.filter(itm => itm.sectionName === 'ourCollection');
  // context
  const { isOpen } = useContext(ModalCtx);

  return <>
    <Portal open={isOpen} >
      <ProductModal />
    </Portal>
    <Hero
      heroBack={characters.heroBack}
      heroChar={characters.heroCar}
    />
    <TopSeller
      topSellerChar={characters.topSellerHero}
      topSellerProd={topSellerProd}
    />
    <Sale saleProd={saleProd} />
    <OurCollection
      collectionChars={{
        g1car: characters.collectionHero1,
        g2car1: characters.collectionHero2,
        g2car2: characters.collectionHero3,
      }}
      collectionProd={collectionProd}
    />
    <TopBrands />
    <Footer />
  </>
}

export async function getStaticProps() {
  await db.connect();
  const characters = await HeroPicModel.find({}).lean();
  const products = await ProductModel.find({}).lean();
  await db.disconnect();
  return {
    props: {
      characters: characters.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 1, // In seconds
  }
}