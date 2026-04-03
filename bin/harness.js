#!/usr/bin/env node

import { main } from "../dist/src/cli.js";

main().then((exitCode) => {
  process.exitCode = exitCode;
});
