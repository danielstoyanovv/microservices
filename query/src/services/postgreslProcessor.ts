"use strict"

import {DatabaseProcessor} from "./databaseProcessor";
const { Pool } = require('pg');
require('dotenv').config();
import {DatabaseConnectionError} from "../errors/database-connection-error";

const DB_NAME = process.env.NODE_ENV === 'test' ? process.env.PG_DB +  "_test" : process.env.PG_DB

export class PostgresProcessor extends DatabaseProcessor {
    /**
     * createDatabase
     * @return {void}
     */
    async createDatabase() {
        const client = await this.getConnectionDriver()
        client
            .query(`CREATE DATABASE ` + DB_NAME)
            .catch((err: any) => {throw new DatabaseConnectionError(err)})
    }

    /**
     * get Connection Driver
     * @return {object}
     */
    async getConnectionDriver() {
        return new Pool({
            user: process.env.PG_USER || "postgres",
            host: process.env.PG_HOST || "127.0.0.1",
            database: "postgres",
            password: process.env.PG_PASSWORD || "PASSWORD",
            port: process.env.PG_PORT || 5432,
            ssl:
                process.env.NODE_ENV !== 'production'
                    ? false
                    : { rejectUnauthorized: false },
        });
    }

}