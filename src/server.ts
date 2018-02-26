import * as Http from "http";

export default function startServer(handler: any) {
    return Http.createServer((req, res) => {
        handler(req, res, (err: Error) => {
            res.statusCode = 404;
            res.end("no such location");
        });
    }).listen(process.env.PORT);
}