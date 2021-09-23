import nc from 'next-connect'
import db from '../../../utils/db';
import ProductModel from '../../../models/ProductModel';

const handler = nc();

handler.get(async (req,res)=>{
    await db.connect();
    const products = await ProductModel.find({});
    await db.disconnect();
    res.send(products);
})

export default handler;