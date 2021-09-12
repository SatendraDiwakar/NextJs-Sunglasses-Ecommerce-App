import Image from 'next/image'
// component
import Hero from '../Components/main/Hero'
import TopSeller from '../Components/main/TopSeller'
import Sale from '../Components/main/Sale'
import OurCollection from '../Components/main/OurCollection'
import TopBrands from '../Components/main/TopBrands'
import Footer from '../Components/main/Footer'
// backend
import db from '../utils/db'
import Heropics from '../models/Heropics'
import Product from '../models/Product'


export default function Home(props) {
  const characters = props.characters[0];
  const { products } = props;
  const topSellerProd = products.filter(itm => itm.sectionName === 'topSeller');
  const saleProd = products.filter(itm => itm.sectionName === 'sale');
  const collectionProd = products.filter(itm => itm.sectionName === 'ourCollection');

  return <>
    <Hero
      heroBack={characters.heroBack}
      heroChar={characters.heroCar}
    />
    <TopSeller
      topSellerChar={characters.topSellerHero}
      topsellerProd={topSellerProd}
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

export async function getServerSideProps() {
  db.connect();
  const characters = await Heropics.find({}).lean();
  const products = await Product.find({}).lean();
  db.disconnect();
  return {
    props: {
      characters: characters.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  }
}