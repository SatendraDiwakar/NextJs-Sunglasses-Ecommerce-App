import nc from 'next-connect'
import db from '../../../../utils/db'
import OrderModel from '../../../../models/OrderModel'
import { isAuth } from '../../../../utils/auth';

const handler = nc();
handler.use(isAuth);

handler.get(async (req, res) => {
    await db.connect();
    const order = await OrderModel.findById(req.query.id);
    await db.disconnect();
    res.send(order);
})

export default handler;