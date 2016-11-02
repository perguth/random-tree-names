#!/bin/bash

npm run build

git clone https://github.com/pguth/random-tree-names.git deploy
cd deploy
git checkout gh-pages
cd ..

cp bundle.js deploy
cp index.html deploy
cp -r vendor deploy
cp -r css deploy

cd deploy
touch .nojekyll
git add .
git commit -am 'update'
git push origin gh-pages
cd ..

rm -rf deploy
rm bundle.js
