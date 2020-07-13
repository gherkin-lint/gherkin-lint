const fs = require('fs');
const path = require('path');

const mkdirp = require('mkdirp');
const glob = require('glob');
const jsdoc2md = require('jsdoc-to-markdown');

const srcFolder = `${__dirname}/../src`;

glob.glob(`${srcFolder}/**/*.js`, {}, (er, files) => {
  if (er) {
    console.error('Error while gathering src files');
    throw er;
  }
  files.forEach(f => {
    const relativePath = path.relative(srcFolder, f);
    const docFile = `${__dirname}/../docs/${relativePath.replace('.js', '.md')}`;
    const containDir = path.dirname(docFile);
    mkdirp(containDir, ).then(made => {
      jsdoc2md.render({ files: f }).then(data => {
        fs.writeFile(docFile, data, err => {
          if (err) {
            console.error(`Error while writting ${docFile}.\n- Message${err.message}\n- Stack\n${err.stack}`);
          }
        });
      });
    });
  });
});
