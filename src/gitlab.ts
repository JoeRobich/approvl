import * as createApi from "node-gitlab-api";

export class GitLabApi {
    private static _api: API;
    private static get api() {
        if (!this._api) {
            this._api = createApi({
                url: process.env.GITLAB_URL,
                token: process.env.GITLAB_TOKEN
            });
        }
        return this._api;
    }

    public setCommitStatus(projectId: number, sha: string, status: CommitStatus, message: string) {
        return GitLabApi.api.projects.statuses(projectId, sha, status, { name: process.env.SERVICE_NAME, description: message });
    }

    public getMergeRequestComments(projectId: number, mergeRequestId: number) {
        return GitLabApi.api.projects.mergeRequests.notes.all(projectId, mergeRequestId);
    }
}

const gitlabApi = new GitLabApi();
export default gitlabApi;