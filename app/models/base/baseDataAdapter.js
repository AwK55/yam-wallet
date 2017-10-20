const fileHelper = require('../../helpers/fileHelper');
const path = require('path');
const logger = require('../../../utils/logService')('data-adapter');

module.exports = function (model) {

  const sourcePath = path.join(__dirname, '../../data', model + '.json');
  const self = this;

  return {
    db: ((scope) => {
      return {
        async create(record) {
          try {
            let data = await fileHelper.readJson(sourcePath);
            data.push(record);
            self.collection = data;
            await this.save();
            return true;

          } catch (err) {
            logger.error(err);
            return false;
          }
        },

        async loadCollection() {
          try {
            await fileHelper.readJson(sourcePath).then((res) => {
              self.collection = res;
            });
            return true;

          } catch (err) {
            logger.error(err);
            return false;
          }
        },

        async remove(n) {
          try {
            self.collection.splice(n, 1);
            await fileHelper.writeJson(sourcePath, self.collection);
            return true;

          } catch (err) {
            logger.error(err);
            return false;
          }
        },
        async update() {
          return await this.save();
        },
        async save() {
          try {
            await fileHelper.writeJson(sourcePath, self.collection);
            return true;

          } catch (err) {
            logger.error(err);
            return false;
          }
        },
      }
    })(self)
  }
}
