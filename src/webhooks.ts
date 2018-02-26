import * as createHandler from "node-gitlab-webhook";
import registerNoteHook from "./hooks/note-hook";
import registerMergeRequestHook from "./hooks/merge-request-hook";

export default function createWebhooks() {
    const handler = createHandler({ path: process.env.WEBHOOK_ENDPOINT, secret: process.env.WEBHOOK_SECRET });

    registerNoteHook(handler);
    registerMergeRequestHook(handler);

    handler.on("error", (err) => console.error("Error:", err.message));

    return handler;
}