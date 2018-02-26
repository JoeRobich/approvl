declare module "node-gitlab-api" {
    var createApi: (options: ApiOptions) => API;
    export = createApi;
}