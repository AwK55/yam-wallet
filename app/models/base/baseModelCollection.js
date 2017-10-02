const dbadapter = require('./baseDataAdapter');

async function baseCollection(modelName) {
  const db = dbadapter.call(this, modelName);
  this.collection = await db.loadCollection();

  this.generateId = function() {   
    return collection.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  }

  this.findElementById =  (id) => {
      return collection.find((item) => item.id==id);
  }

  this.getindexById = (id) => {
      return collection.findIndex((item)=> item.id==id);
  }

  return Object.assign(this, {
    async get(id) {},
    async remove(id) {},
    async getAll() {},
    db
  });
}
module.exports = baseCollection;
