const fs = require('fs');
const path = require('path');

export function readFiles(dir) {
    const files = [];

    fs.readdirSync(dir).forEach(filename => {
        const name = path.parse(filename).name;
        const ext = path.parse(filename).ext;
        const filepath = path.resolve(dir, filename);
        const stat = fs.statSync(filepath);
        const isFile = stat.isFile();

        if (isFile) {
            const content = fs.readFileSync(filepath, 'utf8');
            files.push({filepath, name, ext, stat, content});
        }
    });
    return files;
}