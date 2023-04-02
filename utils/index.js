const crypto = require("crypto");

const MAX_PARTITION_KEY_LENGTH = 256;

exports.generateHash = (key) => {
  return crypto.createHash("sha3-512").update(key).digest("hex");
};

const generateEventHash = (event) => this.generateHash(JSON.stringify(event));

exports.generatePartitionKey = (event) => {
  if (!event || !event.partitionKey) {
    return generateEventHash(event);
  }

  return event.partitionKey;
};

exports.truncatePartitionKey = (key) => {
  if (key.length > MAX_PARTITION_KEY_LENGTH) {
    return this.generateHash(key);
  }

  return key;
};
