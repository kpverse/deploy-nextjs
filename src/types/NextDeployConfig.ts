import { PathObj } from "./PathObj.type";

export type NextDeployConfig = {
    deploymentRepoPath: PathObj;
    buildFolderPath?: PathObj;
    runBuildProcess?: boolean;
    askBeforeCommit?: boolean;
    askToChangeEnvVariables?: boolean;
};
