Don't install eslint and plugins locally when there is global version. It ruins everything!

npm i react@15.0.2 --save-dev
npm i react-dom@15.0.2 --save-dev

npm install --save-dev babel-preset-react
npm install --save-dev babel-preset-es2015


npm i -g eslint eslint-plugin-react eslint-plugin-babel
install all 3 together or if done separately appears strange dependency error

npm list -g --depth=0
npm list --depth=0


------------------------------

package.json - parser HAS TO BE KEPT HERE!!!
  "eslintConfig": {
    "parser": "babel-eslint"
  },


eslint js/source/app.js


---------------- tests
npm view <package> versions
npm i --save-dev babel-jest babel-core
npm i --save-dev react-addons-test-utils@15.0.2