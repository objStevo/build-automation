"use strict";
import clientTemplatePackage from './client/package.json' assert {type: 'json'};
import clientCurrentPackage from '../../packages/client/package.json' assert {type: 'json'};
import serverTemplatePackage from './server/package.json' assert {type: 'json'};
import serverCurrentPackage from '../../packages/server/package.json' assert {type: 'json'};
import fs from 'fs';

const  clientPackagePath = "../../packages/client/package.json";
const  serverPackagePath = "../../packages/server/package.json";

const updatePackage = (templatePackage, currentPackage, currentPackagePath) => {
  const newPackage = { ...currentPackage, ...templatePackage };
  const data = JSON.stringify(newPackage);

  fs.writeFile(currentPackagePath, data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
};

updatePackage(clientTemplatePackage,clientCurrentPackage,clientPackagePath);
updatePackage(serverTemplatePackage,serverCurrentPackage,serverPackagePath);