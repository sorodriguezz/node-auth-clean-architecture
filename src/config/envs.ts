import {get} from "env-var";
import 'dotenv/config';

export const envs = {
    PORT: get("PORT").required().asPortNumber(),
    MONGO_URL: get("MONGO_URL").required().asString(),
    MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),
};
