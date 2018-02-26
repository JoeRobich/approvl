declare module "node-gitlab-webhook" {
    import * as Http from "http";
    type Handler = (req: Http.IncomingMessage, res: Http.ServerResponse, errorCallback: (err: Error) => void) => void;

    const createHandler: (options: Option | Option[]) => Handler & GitLabHooks;
    export = createHandler;
}