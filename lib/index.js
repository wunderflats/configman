const debug = require("debug")("config:init");

const configman = {
  ensureAllSet(environmentVariables) {
    environmentVariables.forEach((environmentVariable) => {
      debug(
        `${environmentVariable}=${String(process.env[environmentVariable])}`,
      );
      if (!process.env[environmentVariable]) {
        throw new Error(
          `Environment variable ${environmentVariable} is not set!`,
        );
      }
    });

    return configman;
  },

  get(environmentVariable) {
    if (process.env[environmentVariable]) {
      return process.env[environmentVariable];
    } else {
      throw new Error(
        `Environment variable ${environmentVariable} is not set!`,
      );
    }
  },
};

module.exports = configman;
