const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const componentGenerator = require('./component/index.js');

module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  plop.addHelper('directory', comp => {
    try {
      fs.accessSync(
        path.join(__dirname, `../app/containers/${comp}`),
        fs.F_OK,
      );
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '../app/',
      config.path,
      plop.getHelper('properCase')(answers.name),
      '**.js',
    )}`;
    child_process.exec(`npm run prettify -- "${folderPath}"`);
    return folderPath;
  });
};
