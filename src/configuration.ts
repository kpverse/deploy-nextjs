// import { join, resolve } from "path";
// import { isDir } from "./file-utilities/fileType";
// import { NextDeployConfig } from "./types";

// export let configuration: {
//     BuildFolderPath: string;
//     TargetRepoPath: string;
//     askBeforeCommit: boolean;
//     askToChangeEnvVariables: boolean;
// };

// export function getConfiguration() {
//     return configuration !== undefined ? configuration : undefined;
// }

// export const CURRENT_PATH = resolve("./");

// export function configure(config: NextDeployConfig) {
//     let { BuildFolderPath, TargetRepo, askBeforeCommit, askToChangeEnvVariables } =
//         config;

//     if (BuildFolderPath.type === "RELATIVE")
//         BuildFolderPath.path = resolve(CURRENT_PATH, BuildFolderPath.path);

//     if (!configuration)
//         configuration = {
//             BuildFolderPath: "",
//             TargetRepoPath: "",
//             askBeforeCommit:
//                 askBeforeCommit === undefined ? true : askBeforeCommit,
//             askToChangeEnvVariables:
//                 askToChangeEnvVariables === undefined
//                     ? true
//                     : askToChangeEnvVariables,
//         };

//     configuration.BuildFolderPath = BuildFolderPath.path;

//     // If build folder path is not a folder, exit the process.
//     let buildFolderPathStatus = isDir(configuration.BuildFolderPath);
//     if (buildFolderPathStatus === undefined)
//         throw Error(
//             `Build folder path, "${configuration.BuildFolderPath}", does not exist.`
//         );
//     else if (!buildFolderPathStatus)
//         throw Error(
//             `Build folder path, "${configuration.BuildFolderPath}", is not a folder.`
//         );

//     if (TargetRepo.type === "RELATIVE")
//         TargetRepo.path = resolve(CURRENT_PATH, TargetRepo.path);

//     configuration.TargetRepoPath = TargetRepo.path;

//     // If target folder path is not a folder, exit the process.
//     if (!isDir(configuration.TargetRepoPath)) {
//         throw Error(
//             `Target repository path, "${configuration.TargetRepoPath}" is not a folder .`
//         );
//     }

//     // If target folder is not a repository, exit the process.
//     if (!isDir(join(configuration.TargetRepoPath, ".git"))) {
//         throw Error(
//             `Target repository path, "${configuration.TargetRepoPath}" is not a repository.`
//         );
//     }

//     // If build folder path and target repository path are same, exit the process.
//     if (configuration.BuildFolderPath === configuration.TargetRepoPath) {
//         throw Error(
//             "Build folder path and target repository path can not be same."
//         );
//     }
// }
