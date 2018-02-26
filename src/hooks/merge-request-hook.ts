import gitLabApi from "../gitlab";

function handleMergeRequestHook(event: EventData<MergeRequestEvent>) {
    console.log(
        "Received a merge_request event for %s branch %s to %s",
        event.payload.repository.name,
        event.payload.object_attributes.source_branch,
        event.payload.object_attributes.target_branch,
    );

    if (event.payload.object_attributes.action === "open") {
        const projectId = event.payload.object_attributes.source_project_id;
        const sha = event.payload.object_attributes.last_commit.id;

        // new MR so fail pipeline to prevent merging
        gitLabApi.setCommitStatus(projectId, sha, "failed", process.env.NOT_APPROVED_MESSAGE);
    }
}

export default function register(hooks: GitLabHooks) {
    hooks.on("merge_request", handleMergeRequestHook);
}