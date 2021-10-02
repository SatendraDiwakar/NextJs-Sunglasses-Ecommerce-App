import nc from 'next-connect'
import db from '../../../../utils/db'
import OrderModel from '../../../../models/OrderModel'
import { isAuth } from '../../../../utils/auth';


const onError = async (err, req, res, next) => {
    await db.disconnect();
    res.status(500).send({ message: err.toString() });
};

const handler = nc({
    onError
});
handler.use(isAuth);

handler.put(async (req, res) => {
    console.log(req.body);
    await db.connect();
    const order = await OrderModel.findById(req.query.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            email_address: req.body.payer.email_address,
        };
        const paidOrder = await order.save();
        await db.disconnect();
        res.send({ message: 'order paid', order: paidOrder });
    } else {
        await db.disconnect();
        res.status(404).send({ message: 'order not found' });
    }
})

export default handler;