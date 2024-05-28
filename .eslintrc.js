module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:import/recommended", "prettier"],
  rules: {
    "no-process-env": [2],
    "object-curly-spacing": [2, "always"],
    "import/no-extraneous-dependencies": 1,
  },
};
