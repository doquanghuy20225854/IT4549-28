import Account from '../models/AccountModel.js';
import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (username, userId) => {
    return jwt.sign({username, userId}, process.env.JWT_SECRET, {expiresIn: maxAge});
}

export const login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
             return res.status(400).json({message: 'Tên tài khoản và mật khẩu không được để trống'});
        }
        
        const account = await Account.findOne({username});
        if (!account) {
            return res.status(404).json({message: "Tài khoản không tồn tại"});
        }
        
        const isMatch = await compare(password, account.password);
        if (!isMatch) {
            return res.status(400).json({message: "Mật khẩu không chính xác"});
        }

        res.cookie("jwt", createToken(username, account._id), {
            httpOnly: true,
            maxAge,
            secure: true,
            sameSite: 'none',
        });

        return res.json({
            message: 'Đăng nhập thành công',
            account: {
                username: account.username,
                email: account.email,
                _id: account._id,
                role: account.role
            }
        })

    } catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}