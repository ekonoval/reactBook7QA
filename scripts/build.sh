#!/usr/bin/env bash
# js transform
echo "^^ statted at "; date;

babel --presets react,es2015 js/source/ -d js/build
echo "---->>> babel done"; date;

# js package
browserify js/build/app.js -o bundle.js
echo "---->>> app.js done"; date;

browserify js/build/discover.js -o discover-bundle.js

echo "---->>> discover.js done"; date;

# css package
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css
# done
echo "------------------ done ------------------";

