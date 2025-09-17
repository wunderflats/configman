"use strict";

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

  get(environmentVariable, defaultValue) {
    if (process.env[environmentVariable]) {
      return process.env[environmentVariable];
    } else {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(
        `Environment variable ${environmentVariable} is not set!`,
      );
    }
  },

  getOrDefault(environmentVariable, defaultValue) {
    return process.env[environmentVariable] ?? defaultValue;
  }
};

module.exports = configman;
