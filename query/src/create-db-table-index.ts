"use strict";

import {LoggerService} from "./services/LoggerService";
const logger = new LoggerService().createLogger()
import database from "./config/database";

// Postgres db table index Setup
database
    .query('CREATE INDEX posts_search_idx ON posts USING GIN (to_tsvector(\'english\', status))')
    .catch((err: any) => logger.error(err))