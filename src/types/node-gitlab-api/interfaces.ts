interface ApiOptions {
    url: string;
    token?: string;
    oauthToken?: string;
}

interface API {
    readonly url: string;
    readonly headers: { [name: string]: string };
    readonly projects: Projects;
}

type CommitStatus = "pending" | "running" | "failed" | "success" | "canceled";

interface StatusOptions {
    name: string;
    description: string;
}

interface Projects {
    readonly mergeRequests: ProjectMergeRequests;
    statuses(projectId: number, sha: string, state: CommitStatus, options: StatusOptions): Promise<any>;
}

interface ProjectMergeRequests {
    readonly notes: ResourceNotes;
}

interface ResourceNotes {
    all(projectId: number, mergeRequestId: number, options?: any): Promise<Note[]>;
}

interface Note {
    id: number;
    body: string;
    attachment: any;
    author: Author;
    created_at: string;
    updated_at: string;
    system: boolean;
    noteable_id: number;
    noteable_type: string;
    noteable_iid: number;
}

interface Author {
    id: number;
    username: string;
    email: string;
    name: string;
    state: string;
    created_at: string;
}