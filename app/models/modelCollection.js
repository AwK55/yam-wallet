function baseCollection(model) {

  const collection = model;

  const getRecord = async function (id) {
    return await this.collection.findOne({ id: id });
  }

  const clear = async function clear() {
    return await this.collection.find({}).remove();
  }

  const count = async function count() {
    return await this.collection.count();
  }
  const getFiltered = async function (filter, options) {
    return await this.collection.find(filter);
  }

  const remove = async function remove(id) {
    const card = await this.collection.findOne({ id: id })
    return card.remove();

  }

  const update = async function (card) {
    return await this.collection.findByIdAndUpdate(card._id, card);
  }
  const getAll = function () { return this.collection.find({}); }

  const add = async function (model) {
    return model.validate()
      .then(res => model.save());
  }

  const getFilteredStream = function (filter) {
    return this.collection.find(filter).lean().cursor();
  }

  return {
    collection: collection,
    getFiltered,
    getFilteredStream,
    getAll,
    getRecord,
    add,
    update,
    remove,
    count,
    clear
  }
}

module.exports = (model) => {
  return baseCollection(model);
};
