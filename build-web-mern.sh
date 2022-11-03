read -p "Please provide a project title: " title
echo Generating build for project $title...
mkdir $title
cd ./$title
npm init -y
npm init -y -w ./packages/client
npm init -y -w ./packages/server
npm i typescript --workspaces --save-dev
npm i react react-dom webpack webpack-cli html-webpack-plugin ts-loader -w ./packages/client --save-dev
cp -r ../templates/client/. ./packages/client
cp ../templates/server/tsconfig.json ./packages/server