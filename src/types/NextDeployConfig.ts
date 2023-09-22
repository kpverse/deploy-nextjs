import { PathObj } from "./PathObj.type";

export type NextDeployConfig = {
    deploymentRepoPath: PathObj;
    buildFolderPath?: PathObj;
    askBeforeCommit?: boolean;
    askToChangeEnvVariables?: boolean;
};
