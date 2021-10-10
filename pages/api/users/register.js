import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import db from '../../../utils/db';
import UserModel from '../../../models/UserModel';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    const newUser = new UserModel({
        name: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    await db.disconnect();

    const token = signToken(user);

    res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    })

})

export default handler;