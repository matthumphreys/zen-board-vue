# Copy dist files to Express/API project
rm -r ../wikiboard-api/public/static/
cp -R dist/static ../wikiboard-api/public
cp dist/index.html ../wikiboard-api/public
