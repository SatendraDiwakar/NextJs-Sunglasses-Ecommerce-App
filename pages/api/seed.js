import nc from 'next-connect'
import db from '../../utils/db';
import Product from '../../models/Product';
import HeroPic from '../../models/Heropics';
import data from '../../utils/data';

const handler = nc();

handler.get(async (req,res)=>{
    await db.connect();
    await Product.deleteMany();
    await Product.insertMany([
        ...data.products.home.topSeller,
        ...data.products.home.sale,
        ...data.products.home.collection,
    ]);
    await HeroPic.deleteMany();
    await HeroPic.create(data.products.home.character);
    await db.disconnect();
    res.send({message: 'seeded successfully'});
})

export default handler;