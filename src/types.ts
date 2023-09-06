type PathObj = {
    type: "ABSOLUTE" | "RELATIVE";
    path: string;
};

export type NextDeployConfig = {
    TargetRepoPath: PathObj;
    BuildFolderPath?: PathObj;
    askBeforeCommit?: boolean;
    askToChangeEnvVariables?: boolean;
};
