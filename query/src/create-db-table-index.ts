"use strict";

import database from "./config/database";
import {DatabaseConnectionError} from "./errors/database-connection-error";

// Postgres db table index Setup
database
    .query('CREATE INDEX posts_search_idx ON posts USING GIN (to_tsvector(\'english\', status))')
    .catch((err: any) => {throw new DatabaseConnectionError(err)})