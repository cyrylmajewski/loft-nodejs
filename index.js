const path = require('path');
const fs = require('fs');

// eslint-disable-next-line no-undef
const directory = process.argv[2];
const resultDir = process.argv[3];

if(!directory) {
  console.error('Enter name of your directory');
  return;
}

const checkExisting = (pathString) => {
  fs.exists(pathString, (exists) => {
    if(!exists) {
      fs.mkdir(pathString, (err) => {
        if(err) {
          throw err;
        }
      });
    }
  });
};

checkExisting(resultDir);

const checkFolder = (directory) => {

  fs.readdir(directory, (err, files) => {
    if(err) {
      throw new err;
    } else {
      files.forEach(file => {
        const localPath = path.join(directory, file);
        fs.stat(localPath, (err, state) => {
          if(err) {
            throw err;
          } else {
            if(state.isDirectory()) {
              checkFolder(localPath);
            } else {
              const ext = path.extname(file);
              const name = path.basename(localPath, ext);
              const letter = name.substring(0, 1);
        
              const oldPath = path.join(directory, file);
              let newPath = path.join(resultDir, letter);
              
              fs.exists(newPath, (exists) => {
                if(!exists) {
                  fs.mkdir(newPath, (err) => {
                    if(err) {
                      throw err;
                    }
                  });
                } 

                const filePath = path.join(newPath, file);

                fs.rename(oldPath, filePath, function(err) {
                  if(err) {
                    throw err;
                  }
                });
              });
              
            }
          }
        });
      
      });
    }
  });
};


checkFolder(directory);
