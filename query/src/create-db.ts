"use strict";

import {PostgresProcessor} from "./services/postgreslProcessor";

const postgresProcessor = new PostgresProcessor()

// Create the new postgres database
postgresProcessor.createDatabase().then(r => {
    console.log(r)
})
