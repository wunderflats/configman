const configman = require("../lib/index");
const assert = require("node:assert");
const { describe, it } = require("node:test");

describe("config", () => {
  it("`ensureAllSet` returns configman", () => {
    // setup
    process.env.PORT = "1337";

    const config = configman.ensureAllSet(["PORT"]);

    // test
    assert.deepStrictEqual(config, configman);

    // tear down
    delete process.env.PORT;
  });

  it("throws if a property is not backed by an env var", () => {
    // setup
    delete process.env.ICEKING;

    // test
    assert.throws(
      () => configman.get("ICEKING"),
      /environment variable iceking is not set!/i,
    );
  });

  it("throws if a `ensureAllSet` is called and a property is not backed by an env var", () => {
    // setup
    delete process.env.ICEKING;

    // test
    assert.throws(
      () => configman.ensureAllSet(["ICEKING"]),
      /environment variable iceking is not set!/i,
    );
  });

  it("returns the env var corresponding to a property", () => {
    // setup
    process.env.FINN = "jake";

    // test
    assert.strictEqual(configman.get("FINN"), "jake");

    // tear down
    delete process.env.FINN;
  });

  it("does not throw if `ensureAllSet` is called and all properties are backed by an env var", () => {
    // set up
    process.env.FINN = "jake";

    // test
    assert.doesNotThrow(() => configman.ensureAllSet(["FINN"]));

    // tear down
    delete process.env.FINN;
  });
});
