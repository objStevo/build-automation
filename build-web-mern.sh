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
npm i typescript --workspaces --save-dev

#Install client dependencies
npm i webpack webpack-cli webpack-dev-server html-webpack-plugin ts-loader -w ./packages/client --save-dev
npm i react react-dom @reduxjs/toolkit react-redux react-router-dom request request-promise @mui/icons-material @mui/material @emotion/react @emotion/styled dotenv -w ./packages/client --save
npm i @types/react @types/react-redux @types/react-router-dom @types/react-dom -w ./packages/client --save-dev

# touch .env ./packages/server
cp -r ../templates/client/. ./packages/client
cp -r ../templates/utils/. ./prepack-scripts
# cp ../templates/server/tsconfig.json ./packages/server 

# Run pre package scripts
node ./prepack-scripts/updateJson

# Remove pre package scripts
rm -r ./prepack-scripts