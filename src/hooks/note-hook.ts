import gitlabApi from "../gitlab";
import * as _ from "lodash";

const STATUS_CAN_BE_MERGED = "can_be_merged";

async function handleNoteEvent(event: EventData<NoteEvent>) {
    console.log(
        "Received a %s note event for %s",
        event.payload.object_attributes.noteable_type,
        event.payload.repository.name
    );

    const isCommentDirectlyOnMergeRequest = event.payload.object_attributes.noteable_type === "MergeRequest" && !event.payload.object_attributes.type;
    const isAlreadyApproved = isCommentDirectlyOnMergeRequest && event.payload.merge_request.merge_status === STATUS_CAN_BE_MERGED;
    if (isCommentDirectlyOnMergeRequest && !isAlreadyApproved) {
        const approvalMessages = getApprovalMessages();
        const message = event.payload.object_attributes.note.toLowerCase().trim();

        const isNewApprovalMessage = approvalMessages.indexOf(message) > -1;
        if (isNewApprovalMessage) {
            const mergeRequestAuthor = event.payload.merge_request.author_id;
            const projectId = event.payload.project_id;
            const sha = event.payload.merge_request.last_commit.id;

            gitlabApi.setCommitStatus(projectId, sha, "running", process.env.PENDING_APPROVAL_MESSAGE);

            const comments = await gitlabApi.getMergeRequestComments(projectId, event.payload.merge_request.iid);
            const numberOfApprovals = _.uniqBy(comments.filter(note => {
                if (note.author.id === mergeRequestAuthor)
                    return false;

                const message = note.body.toLowerCase().trim();
                return approvalMessages.indexOf(message) > -1;
            }), note => note.author.id).length;

            // pass or fail the pipeline
            const approvalsNeeded = parseInt(process.env.APPROVALS_NEEDED);
            if (numberOfApprovals >= approvalsNeeded) {
                gitlabApi.setCommitStatus(projectId, sha, "success", process.env.APPROVED_MESAGE);
            } else {
                gitlabApi.setCommitStatus(projectId, sha, "failed", process.env.NOT_APPROVED_MESAGE);
            }
        }
    }
}

let _approvalMessages: string[];
function getApprovalMessages() {
    if (!_approvalMessages) {
        _approvalMessages = process.env.APPROVAL_MESSAGES
            .split(",")
            .map(msg => msg.toLowerCase().trim());
    }

    return _approvalMessages;
}

export default function register(hooks: GitLabHooks) {
    hooks.on("note", handleNoteEvent);
}