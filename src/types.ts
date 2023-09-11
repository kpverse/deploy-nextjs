type PathObj = {
    type: "ABSOLUTE" | "RELATIVE";
    path: string;
};

export type NextDeployConfig = {
    deploymentRepoPath: PathObj;
    buildFolderPath?: PathObj;
    askBeforeCommit?: boolean;
    askToChangeEnvVariables?: boolean;
};
