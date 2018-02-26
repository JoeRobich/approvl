interface PushEvent {
    object_kind: string;
    before: string;
    after: string;
    ref: string;
    checkout_sha: string;
    user_id: number;
    user_name: string;
    user_username: string;
    user_email: string;
    user_avatar: string;
    project_id: number;
    project: Project;
    repository: Repository;
    commits: Commit[];
    total_commits_count: number;
}

interface TagPushEvent {
    object_kind: string;
    before: string;
    after: string;
    ref: string;
    checkout_sha: string;
    user_id: number;
    user_name: string;
    user_avatar: string;
    project_id: number;
    project: Project;
    repository: Repository;
    commits: Commit[];
    total_commits_count: number;
}

interface IssueEvent {
    object_kind: string;
    user: User;
    project: Project;
    repository: Repository;
    object_attributes: IssueAttributes;
    assignees: User[];
    assignee: User;
    labels: Label[];
    changes: Changes;
}

interface IssueAttributes {
    id: number;
    title: string;
    assignee_ids: number[];
    assignee_id: number;
    author_id: number;
    project_id: number;
    created_at: string;
    updated_at: string;
    position: number;
    branch_name: string;
    description: string;
    milestone_id: number;
    state: string;
    iid: number;
    url: string;
    action: string;
}

interface NoteEvent {
    object_kind: string;
    user: User;
    project_id: number;
    project: Project;
    repository: Repository;
    object_attributes: NoteAttributes;
    commit?: Commit;
    merge_request?: MergeRequest;
    issue?: Issue;
    snippet?: Snippet;
}

interface NoteAttributes {
    id: number;
    note: string;
    noteable_type: string;
    author_id: number;
    created_at: string;
    updated_at: string;
    project_id: number;
    attachment: any;
    line_code: string;
    commit_id: string;
    noteable_id: number;
    system: boolean;
    st_diff: StDiff;
    type: string;
    url: string;
}

interface MergeRequestEvent {
    object_kind: string;
    user: User;
    project: Project;
    repository: Repository;
    object_attributes: MergeRequestAttributes;
    labels: Label[];
    changes: Changes;
}

interface MergeRequestAttributes {
    id: number;
    target_branch: string;
    source_branch: string;
    source_project_id: number;
    author_id: number;
    assignee_id: number;
    title: string;
    created_at: string;
    updated_at: string;
    milestone_id: number;
    state: string;
    merge_status: string;
    target_project_id: number;
    iid: number;
    description: string;
    source: Project;
    target: Project;
    last_commit: LastCommit;
    work_in_progress: boolean;
    url: string;
    action: string;
    assignee: User;
}

interface WikiPageEvent {
    object_kind: string;
    user: User;
    project: Project;
    wiki: Wiki;
    object_attributes: WikiPageAttributes;
}

interface WikiPageAttributes {
    title: string;
    content: string;
    format: string;
    message: string;
    slug: string;
    url: string;
    action: string;
}

interface PipelineEvent {
    object_kind: string;
    object_attributes: PipelineAttributes;
    user: User;
    project: Project;
    commit: Commit;
    builds: Build[];
}

interface PipelineAttributes {
    id: number;
    ref: string;
    tag: boolean;
    sha: string;
    before_sha: string;
    status: string;
    stages: string[];
    created_at: string;
    finished_at: string;
    duration: number;
}

interface BuildEvent {
    object_kind: string;
    ref: string;
    tag: boolean;
    before_sha: string;
    sha: string;
    build_id: number;
    build_name: string;
    build_stage: string;
    build_status: string;
    build_started_at: string;
    build_finished_at: string;
    build_duration: any;
    build_allow_failure: boolean;
    project_id: number;
    project_name: string;
    user: User;
    commit: Commit;
    repository: Repository;
}

interface StDiff {
    diff: string;
    new_path: string;
    old_path: string;
    a_mode: string;
    b_mode: string;
    new_file: boolean;
    renamed_file: boolean;
    deleted_file: boolean;
}

interface Issue {
    id: number;
    title: string;
    assignee_ids: number[];
    assignee_id: number;
    author_id: number;
    project_id: number;
    created_at: string;
    updated_at: string;
    position: number;
    branch_name: string;
    description: string;
    milestone_id: number;
    state: string;
    iid: number;
}

interface Snippet {
    id: number;
    title: string;
    content: string;
    author_id: number;
    project_id: number;
    created_at: string;
    updated_at: string;
    file_name: string;
    expires_at: string;
    type: string;
    visibility_level: number;
}

interface Commit {
    id: string;
    message: string;
    timestamp: string;
    url: string;
    author: Author;
}

interface Build {
    id: number;
    stage: string;
    name: string;
    status: string;
    created_at: string;
    started_at?: string;
    finished_at?: string;
    when: string;
    manual: boolean;
    user: User;
    runner: any;
    artifacts_file: ArtifactsFile;
}

interface ArtifactsFile {
    filename: string;
    size: number;
}

interface Label {
    id: number;
    title: string;
    color: string;
    project_id: number;
    created_at: string;
    updated_at: string;
    template: boolean;
    description: string;
    type: string;
    group_id: number;
}

interface Changes {
    updated_by_id: number[];
    updated_at: string[];
    labels: Labels;
}

interface Labels {
    previous: Label[];
    current: Label[];
}

interface MergeRequest {
    id: number;
    target_branch: string;
    source_branch: string;
    source_project_id: number;
    author_id: number;
    assignee_id: number;
    title: string;
    created_at: string;
    updated_at: string;
    milestone_id: number;
    state: string;
    merge_status: string;
    target_project_id: number;
    iid: number;
    description: string;
    position: number;
    source: Project;
    target: Project;
    last_commit: LastCommit;
    work_in_progress: boolean;
    assignee: User;
}

interface User {
    name: string;
    username: string;
    avatar_url: string;
}

interface LastCommit {
    id: string;
    message: string;
    timestamp: string;
    url: string;
    author: Author;
}

interface Author {
    name: string;
    email: string;
}

interface Project {
    name: string;
    description: string;
    web_url: string;
    avatar_url: string;
    git_ssh_url: string;
    git_http_url: string;
    namespace: string;
    visibility_level: number;
    path_with_namespace: string;
    default_branch: string;
    homepage: string;
    url: string;
    ssh_url: string;
    http_url: string;
    id?: number;
}

interface Repository {
    name: string;
    url: string;
    description: string;
    homepage: string;
}

interface Wiki {
    web_url: string;
    git_ssh_url: string;
    git_http_url: string;
    path_with_namespace: string;
    default_branch: string;
}

interface EventData<T> {
    event: string;
    payload: T;
    protocol: string;
    host: string;
    url: string;
    path: string;
}

interface GitLabHooks {
    on(type: "push", callback: (event: EventData<PushEvent>) => void): void;
    on(type: "tag_push", callback: (event: EventData<TagPushEvent>) => void): void;
    on(type: "note", callback: (event: EventData<NoteEvent>) => void): void;
    on(type: "merge_request", callback: (event: EventData<MergeRequestEvent>) => void): void;
    on(type: "wiki_page", callback: (event: EventData<WikiPageEvent>) => void): void;
    on(type: "pipeline", callback: (event: EventData<PipelineEvent>) => void): void;
    on(type: "build", callback: (event: EventData<BuildEvent>) => void): void;
    on(type: "error", callback: (err: Error) => void): void;
}

interface Option {
    path: string;
    secret: string;
}