const dbadapter = require('./baseDataAdapter');

function baseCollection(modelName) {

  const generateId = function () {
    return this.collection.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  };
  const findAllById = function (id) {
    return this.collection.find((item) => item.id == id);
  };
  const getindexById = function (id) { return this.collection.findIndex((item) => item.id == id); };

  const getFiltered = async function (filterFunc) {
    return this.collection.filter(filterFunc);
  }

  const getAll = function () { return this.collection; }

  return {
    collection: null,
    generateId,
    findAllById,
    getindexById,
    getFiltered,
    getAll,
    async add() {},
    async remove() {},
    async getRecord() {}
  }
}

module.exports = (modelName) => {
  const base = baseCollection(modelName);
  return Object.assign(base, dbadapter.call(base, modelName));
};
