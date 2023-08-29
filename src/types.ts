type PathObject = {
    type: "ABSOLUTE" | "RELATIVE";
    path: string;
};

export type DeployNextAppConfig = {
    NextBuildPath: PathObject | string;
    TargetRepoPath: PathObject | string;
};
