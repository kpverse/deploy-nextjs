type PathObj = {
    type: "ABSOLUTE" | "RELATIVE";
    path: string;
};

export type NextDeployConfig = {
    DeploymentRepoPath: PathObj;
    BuildFolderPath?: PathObj;
    askBeforeCommit?: boolean;
    askToChangeEnvVariables?: boolean;
};
