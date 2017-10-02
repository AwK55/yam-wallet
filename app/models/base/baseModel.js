module.exports = function (modelId) {
  const id = modelId;
  return {
    get id() { return id; }
  }
}
