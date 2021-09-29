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

handler.post(async (req, res) => {
    await db.connect();
    const newOrder = new OrderModel({
        ...req.body,
        user: req.user._id,
    });
    const order = await newOrder.save();
    res.status(201).send(order);
});

export default handler;