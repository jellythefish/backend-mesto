const logger = (req, res, next) => {
  console.log(new Date(), req.method);
  next();
};

module.exports = logger;