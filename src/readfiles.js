
const fs = require('fs');
const testFolder = '/users/venkatasrinadhuni/desktop/PostmanJsonOutput'
const readFiles = () => {  
let filesA = [];  
fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      filesA.push(file);
    });
  });
  return filesA
}

export default readFiles;