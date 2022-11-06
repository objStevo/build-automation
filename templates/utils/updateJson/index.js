'use strict';
const templateJson = require('./package.json');
const currentJson = require('../../packages/client/package.json')
const fs = require('fs');

const updatedJson = {...currentJson, ...templateJson};
const data = JSON.stringify(updatedJson);

fs.writeFile('./packages/client/package.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});

