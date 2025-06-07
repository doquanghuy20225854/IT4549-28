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

        return res.status(200).json({
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

export const getUserInfo = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({message: "Unauthorized"});
        }
        
        const account = await Account.findById(userId);
        if (!account) {
            return res.status(404).json({message: "Tài khoản không tồn tại"});
        }

        return res.status(200).json({
            username: account.username,
            email: account.email,
            _id: account._id,
            role: account.role
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const logout = async (req, res) => {
    try {
        // Luôn xóa cookie, bất kể có tồn tại hay không
        res.cookie('jwt', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 0,
            expires: new Date(0),
            path: '/'
        });

        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: "Đăng xuất thành công"
        });
    } catch (error) {
        console.log('Logout error:', error);
        // Ngay cả khi có lỗi, vẫn cố gắng xóa cookie
        try {
            res.clearCookie('jwt', {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/'
            });
        } catch (e) {
            console.log('Error clearing cookie:', e);
        }
        
        return res.status(200).json({
            success: true,
            message: "Đăng xuất thành công"
        });
    }
}