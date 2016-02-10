echo Enter a name for this package:
read package_name

npm i replace
./node_modules/.bin/replace PACKAGE_NAME $package_name . -r --exclude "node_modules/**/*,test/**/*"
npm uni replace

git remote rm origin
rm init.sh
