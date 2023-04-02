const crypto = require("crypto");

exports.generateHash = (key) => {
  return crypto.createHash("sha3-512").update(key).digest("hex");
};
