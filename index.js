const path = require('path');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

const directory = process.argv[2];
const resultDir = process.argv[3];
const deleteFlag = process.argv.find(arg => arg === '-d') === '-d' ? true : false;

if(!directory) {
  console.error('Enter name of your directory');
  return;
}

if(!resultDir) {
  console.error('Enter name of your result directory');
  return;
}

if(!fs.existsSync(resultDir)) {
  fs.mkdirSync(resultDir);
}

const checkFolder = async (directory, resultDir, deleteFlag) => {

  try {
    const files = await readdir(directory);

    files.forEach(async file => {
      const localPath = path.join(directory, file);
      const state = fs.statSync(localPath);

      if(state.isDirectory()) {
        checkFolder(localPath, resultDir, deleteFlag);
      } else {
        const ext = path.extname(file);
        const name = path.basename(localPath, ext);
        const letter = name.substring(0, 1);
  
        const oldPath = path.join(directory, file);
        let newPath = path.join(resultDir, letter);
        console.log(newPath);

        if(!fs.existsSync(newPath)) {
          fs.mkdirSync(newPath);
        }

        const filePath = path.join(newPath, file);

        fs.rename(oldPath, filePath, function(err) {
          if(err) {
            throw err;
          }
        });
        
      }
    });
    
    
  } catch(e) {
    throw new Error (e);
  }
};


checkFolder(directory, resultDir, deleteFlag);
