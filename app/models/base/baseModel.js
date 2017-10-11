module.exports = function (modelId) {
  let id = modelId;
  return {
    get id() { return id; },
    set id(newId) {
      if (!id) id = newId;
    }
  }
}
