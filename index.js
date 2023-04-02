const { generatePartitionKey, truncatePartitionKey } = require("./utils");

const TRIVIAL_PARTITION_KEY = "0";

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  let key = generatePartitionKey(event);

  if (typeof key !== "string") {
    key = JSON.stringify(key);
  }

  return truncatePartitionKey(key);
};
