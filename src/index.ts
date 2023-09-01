export { configure } from "./configuration";
export { deployNextApp } from "./deploy";
export { DeployNextAppConfig } from "./types";

import { VERSION } from "./metadata";

console.log(`
deploy-next-app v${VERSION} from KPVERSE (https://kpverse.in)
Copyright (c) 2023 - Kartavya Patel.
`);
