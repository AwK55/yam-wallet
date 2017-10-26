const logger =require('../../utils/logService')('app');
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.error('Error detected', err);
    ctx.status = 500;
    ctx.body = `Error [${err.message}] :(`;
  }
};
