import nc from 'next-connect'
import db from '../../utils/db';
import HeroPicModel from '../../models/HeropicsModel'
import ProductModel from '../../models/ProductModel'
import data from '../../utils/data';

const handler = nc();

handler.get(async (req,res)=>{
    await db.connect();
    await ProductModel.deleteMany();
    await ProductModel.insertMany([
        ...data.products.home.topSeller,
        ...data.products.home.sale,
        ...data.products.home.collection,
    ]);
    await HeroPicModel.deleteMany();
    await HeroPicModel.create(data.products.home.character);
    await db.disconnect();
    res.send({message: 'seeded successfully'});
})

export default handler;