import nc from 'next-connect'
import db from '../../../utils/db';
import OrderModel from '../../../models/OrderModel';
import { isAuth } from '../../../utils/auth';

const onError = async (err, req, res, next) => {
    await db.disconnect();
    res.status(500).send({ message: err.toString() });
};

const handler = nc({
    onError
});

handler.use(isAuth);

handler.get(async (req, res) => {
    await db.connect();
    const orders = await OrderModel.find({
        user: req.user._id,
    });
    res.send(orders);
});

export default handler;