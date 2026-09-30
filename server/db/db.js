import Knex from "knex";
import configs from "../knexfile.js";

export const db = Knex(configs[process.env.NODE_ENV || 'development']);