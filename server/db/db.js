import Knex from "knex";
import configs from "../knexfile.js";

console.log(configs[process.env.NODE_ENV || 'development']);

export const db = Knex(configs[process.env.NODE_ENV || 'development']);