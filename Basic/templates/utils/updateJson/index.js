"use strict";
import clientTemplatePackage from "./client/package.json" assert { type: "json" };
import clientCurrentPackage from "../../packages/client/package.json" assert { type: "json" };
import serverTemplatePackage from "./server/package.json" assert { type: "json" };
import serverCurrentPackage from "../../packages/server/package.json" assert { type: "json" };
import fs from "fs";
import path from "path";
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const clientPackagePath = path.join(__dirname, '..', '..', 'packages', 'client', 'package.json');
const serverPackagePath = path.join(__dirname, '..', '..', 'packages', 'server', 'package.json');

const updatePackage = (templatePackage, currentPackage, currentPackagePath) => {
  const newPackage = { ...currentPackage, ...templatePackage };
  const data = JSON.stringify(newPackage);
  console.log("inside updatePackage");
  fs.writeFile(currentPackagePath, data, (err) => {
    if (err) {
      console.log('Cannot write file');
      throw err;
    }
    console.log("Data written to file");
  });
};

updatePackage(clientTemplatePackage, clientCurrentPackage, clientPackagePath);
updatePackage(serverTemplatePackage,serverCurrentPackage,serverPackagePath);
