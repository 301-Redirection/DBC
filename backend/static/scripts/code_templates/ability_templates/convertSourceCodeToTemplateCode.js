const testFolder = './';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    if (file.indexOf('bulkRenamer') != -1) {
        return;
    }

    if (file !== 'bulkRenamer.js') {
        let oldFileName = file;
        let i = file.indexOf('.');
        let beforeFullStop = file.substr(0, i);
        let newFileName = beforeFullStop + '_template.lua';
        console.log(oldFileName);
        console.log(newFileName);
        fs.renameSync(oldFileName, newFileName, (err) => {
            if (err) throw err;
            // console.log('renamed complete');
        });
        const filename = newFileName;
        console.log(filename);
        let fileContents = fs.readFileSync(filename, 'utf8', (err) => {
            if (err) throw err
        });
        let lineByLine = fileContents.split(/\r?\n/);
        let final = lineByLine.join('|');
        let regex = new RegExp('local AbilityToLevelUp.*local TalentTree.*check skill build vs current level','gm');
        final = final.replace(regex, '{{- abilities-to-level -}}\n');
        let pipeRegex = new RegExp('[|]','gm');
        final = final.replace(pipeRegex, '\r\n');
        fs.writeFile(filename, final, function(err) {
            if(err) throw err;
        });

    }
  });
})
