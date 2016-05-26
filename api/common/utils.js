const utils = {};

utils.isObjectId = (id) => {
  return (typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id));
}

module.exports = utils;
