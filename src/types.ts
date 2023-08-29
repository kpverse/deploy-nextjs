type PathObj = {
    type: "ABSOLUTE" | "RELATIVE";
    path: string;
};

export type DeployNextAppConfig = {
    BuildFolder: PathObj;
    TargetRepo: PathObj;
};
