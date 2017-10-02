const fileHelper = require('../../helpers/fileHelper');
const path = require('path');

module.exports = function (dataSource)  {
  this.modelsPath = path.join(__dirname, '../../db', dataSource + '.json');

  return {
    async create(record) {
      try {
        let data = await fileHelper.readJson(modelsPath);
        data.push(record);
        this.save();
        return true;
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    async loadCollection() {
      try {
        return await fileHelper.readJson(modelsPath);
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    async remove(n) {
      try {

        collection.splice(n, 1);
        await fileHelper.writeJson(modelsPath, collection);
        return true;

      } catch (err) {
        console.log(err);
        return err;
      }
    },

    async update(id) {

    },

    async save() {
      try {
        await fileHelper.writeJson(modelsPath, collection);
        return true;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  }

}
