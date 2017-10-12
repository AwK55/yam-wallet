const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const logger = require('../../utils/logService')('fileHelper');
module.exports = {

  async readJson(path) {
    return await JSON.parse(await readFile(path));
  },

  async writeJson(path, data) {
    try {
      await writeFile(path, await JSON.stringify(data));
    } catch (err) {
      logger.error(err);
      throw new Error(err);
    }
  }
}
