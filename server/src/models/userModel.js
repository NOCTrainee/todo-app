import knex from 'knex';
import { db } from '../../db/db.js';

const addUser = async (userData, res) => {
    try {
        const user = await db('users').insert(userData).returning('id', 'name');
        return user;
    } catch (err) {
        console.error("User not added : ", err);
    }
}

const chkMail = async (email) => {
    try {
        const user = await db('users').where('email', email);
        return true;
    } catch (err) {
        console.error("Failed to execute select to indentify unique mail : ", err);
    }
}

const getUsers = async () => {
    try {
        const allUsers = await db('users').select();
    } catch (err) {
        console.error("Can't fetch Users : ", err);
    }
}

export { addUser, getUsers, chkMail }; 