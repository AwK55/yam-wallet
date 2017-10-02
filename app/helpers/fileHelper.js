const fs = require('fs');
const {promisify} = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
module.exports = {
    
    async readJson(path) {
        return await JSON.parse(await readFile(path));        
    },
    
    async writeJson(path, data) {
        return await writeFile(path, await JSON.stringify(data));
    }
}