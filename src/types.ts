type PathObj = {
    type: "ABSOLUTE" | "RELATIVE";
    path: string;
};

export type NextDeployConfig = {
    BuildFolder: PathObj;
    TargetRepo: PathObj;
    askBeforeCommit?: boolean;
    askToChangeEnvVariables?: boolean;
};
