const folder = './';
const fs = require('fs');

fs.readdir(folder, (err, files) => {
    files.forEach((file) => {
        if (file.indexOf('bulkRenamer') !== -1) {
            return;
        }

        if (file !== 'bulkRenamer.js') {
            const oldFileName = file;
            const i = file.indexOf('.');
            const beforeFullStop = file.substr(0, i);
            const newFileName = `${beforeFullStop}_template.lua`;
            // console.log(oldFileName);
            // console.log(newFileName);
            fs.renameSync(oldFileName, newFileName, (error) => {
                if (error) throw error;
            // console.log('renamed complete');
            });
            const filename = newFileName;
            // console.log(filename);
            const fileContents = fs.readFileSync(filename, 'utf8', (error) => {
                if (error) throw error;
            });
            const lineByLine = fileContents.split(/\r?\n/);
            let final = lineByLine.join('|');
            const regex = new RegExp('local ItemsToBuy = [|]{.*}', 'gm');
            final = final.replace(regex, '{{- items-to-buy -}}\n');
            const pipeRegex = new RegExp('[|]', 'gm');
            final = final.replace(pipeRegex, '\r\n');
            fs.writeFile(filename, final, (error) => {
                if (error) throw error;
            });
        }
    });
});
