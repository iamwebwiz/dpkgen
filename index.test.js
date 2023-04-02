const { deterministicPartitionKey } = require("./index");
const { generateHash } = require("./utils");

describe("deterministricPartitionKey - refactored", () => {
  it("should return the trivial partition key if the event is falsy", () => {
    expect(deterministicPartitionKey()).toBe("0");
    expect(deterministicPartitionKey(undefined)).toBe("0");
    expect(deterministicPartitionKey(null)).toBe("0");
  });

  it("should return the partition key specified on the event if the key exists", () => {
    expect(
      deterministicPartitionKey({ partitionKey: "testPartitionKey" })
    ).toBe("testPartitionKey");
  });

  it("should return the sha3-512 hash of the event if no partition key is specified on the event", () => {
    const event = { name: "invalid event" };
    const hash = generateHash(JSON.stringify(event));

    expect(deterministicPartitionKey(event)).toBe(hash);
  });

  it("should return the sha3-512 hash of the partition key if it is longer than the maximum partition key length - 256", () => {
    const longPartitionKey = "e".repeat("260");
    const hash = generateHash(longPartitionKey);

    expect(deterministicPartitionKey({ partitionKey: longPartitionKey })).toBe(
      hash
    );
  });
});
