import Account from './models/AccountModel.js';

const accounts = [
    {
        username: 'admin',
        password: '123456',
        email: 'admin@gmail.com',
        phone: '0987654321',
        fullname: 'Admin User',
        role: 'admin'
    },
    {
        username: 'doctor',
        password: '123456',
        email: 'doctor@gmail.com',
        phone: '0987654322',
        fullname: 'Doctor User',
        role: 'doctor'
    },
    {
        username: 'staff',
        password: '123456',
        email: 'staff@gmail.com',
        phone: '0987654323',
        fullname: 'Staff User',
        role: 'staff'
    },
    {
        username: 'owner',
        password: '123456',
        email: 'owner@gmail.com',
        phone: '0987654321',
        fullname: 'Owner User',
        role: 'owner'
    },

]


export const addAccount = async () => {
    try {
        for (const accountData of accounts) {
            const account = new Account(accountData);
            await account.save();
            console.log('Account added successfully:', account);
        }
    } catch (error) {
        console.error('Error adding account:', error);
        throw error;
    }
};