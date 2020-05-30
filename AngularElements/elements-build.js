const concat = require('concat');

(async function build() {
  const files = [
    './dist/AngularElements/runtime-es5.js',
    './dist/AngularElements/runtime-es2015.js',
    './dist/AngularElements/polyfills-es5.js',
    './dist/AngularElements/polyfills-es2015.js',
    './dist/AngularElements/main-es5.js',
    './dist/AngularElements/main-es2015.js'
  ];
  await concat(files, './dist/AngularElements/bundle.js');
})();
