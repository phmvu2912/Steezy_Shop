import jwt from 'jsonwebtoken';
import { authValidation } from '../validation/AuthValidation.js';
import Auth from '../models/Auth.js';
import { errors } from '@vinejs/vine';
import bcrypt from 'bcrypt';

const register = async (req, res) => {
    try {
        const output = await authValidation.validate(req.body)

        const {email, password} = output;

        const userExist = await Auth.findOne({ email });

        if(userExist) {
            return res.status(400).json({
                message: 'Email đã tồn tại!'
            })
        };

        // Mã hóa mật khẩu
        const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
        const passwordHashed = bcrypt.hashSync(password, salt);

        const user = await Auth.create({
            ...output,
            password: passwordHashed
        })

        // Tạo token
        const token = jwt.sign({ user: user }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1d' })

        return res.status(201).json({
            data: {
                username: user.username,
                email: user.email,
                token: token
            },
            message: 'Register Successfully!!'
        })

    } catch (error) {

        // if (error instanceof errors.E_VALIDATION_ERROR) {
        //     return res.status(400).json({
        //         message: error.message
        //     })
        // }

        console.log(error)

        return res.status(500).json({ message: error.message })
    }
}

const login = (req, res, next) => {
    try {

    } catch (error) {

    }
}


export { register, login }