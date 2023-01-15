#!/bin/bash
# Take user input
read -p "Please provide a project title: " title
echo Generating build for project $title...

# Create project Folder
mkdir $title
cd ./$title

## Configure npm
npm init -y
npm init -y -w ./packages/client
npm init -y -w ./packages/server

# Install global dependencies
npm i typescript dotenv --workspaces --save-dev

#Install client dependencies
npm i @types/next @types/react @types/react-redux @types/react-router-dom @types/react-dom -w ./packages/client --save-dev
npm i next react react-dom @reduxjs/toolkit react-redux react-router-dom request request-promise @mui/icons-material @mui/material @emotion/react @emotion/styled -w ./packages/client --save

#Install server dependencies
npm i nodemon morgan ts-node @types/nodemon @types/node @types/express @types/morgan @types/cookie-parser @types/cors @types/mongoose -w ./packages/server --save-dev
npm i express mongoose cookie-parser cors -w ./packages/server --save

# touch .env ./packages/server
cp -r ../templates/client/. ./packages/client
cp -r ../templates/utils/. ./prepack-scripts
cp -r ../templates/server/. ./packages/server 

# Run pre package scripts
node ./prepack-scripts/updateJson

# Remove pre package scripts
rm -r ./prepack-scripts