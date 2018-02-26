import * as DotEnv from "dotenv";
import createWebhooks from "./webhooks";
import startServer from "./server";

DotEnv.config({
    path: `${process.cwd()}/.env`,
});

const handler = createWebhooks();
const server = startServer(handler);