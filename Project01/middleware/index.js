const fs = require("fs");

const logReqRes = (filename) => {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}: User IP ${req.ip} made a ${req.method} request to ${req.url}`,
      (err) => {
        if (err) console.error(err);
        next();
      }
    );
  };
};

module.exports = {logReqRes};
